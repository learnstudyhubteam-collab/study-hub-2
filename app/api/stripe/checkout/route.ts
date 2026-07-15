import { createClient, createAdminClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { resolvePriceId } from '@/lib/stripe-prices'

export async function POST(req: Request) {
  const { plan = 'pro', interval = 'month' } = await req.json().catch(() => ({}))

  if (plan !== 'plus' && plan !== 'pro') {
    return new Response('Invalid plan', { status: 400 })
  }
  if (interval !== 'month' && interval !== 'year') {
    return new Response('Invalid interval', { status: 400 })
  }

  // Env override → existing lookup_key price → auto-created price
  let priceId: string
  try {
    priceId = await resolvePriceId(plan, interval)
  } catch (err) {
    console.error('Stripe price resolution failed:', err)
    return new Response('Payments are not available right now — try again shortly.', { status: 500 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single()

  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? ''

  let customerId = profile?.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
    // Service role: stripe_customer_id is a protected column (see profiles trigger)
    const admin = await createAdminClient()
    await admin.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/billing`,
    metadata: { supabase_user_id: user.id, plan, interval },
  })

  return Response.json({ url: session.url })
}
