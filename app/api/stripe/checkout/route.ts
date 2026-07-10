import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const { plan = 'pro', interval = 'month' } = await req.json().catch(() => ({}))

  if (plan !== 'plus' && plan !== 'pro') {
    return new Response('Invalid plan', { status: 400 })
  }
  if (interval !== 'month' && interval !== 'year') {
    return new Response('Invalid interval', { status: 400 })
  }

  const priceMap: Record<string, string | undefined> = {
    'plus:month': process.env.STRIPE_PRICE_ID_PLUS,
    'pro:month': process.env.STRIPE_PRICE_ID_PRO,
    'plus:year': process.env.STRIPE_PRICE_ID_PLUS_ANNUAL,
    'pro:year': process.env.STRIPE_PRICE_ID_PRO_ANNUAL,
  }
  const priceId = priceMap[`${plan}:${interval}`]
  if (!priceId) {
    return new Response(
      interval === 'year'
        ? 'Annual pricing is not configured yet — set STRIPE_PRICE_ID_PLUS_ANNUAL and STRIPE_PRICE_ID_PRO_ANNUAL.'
        : 'Stripe price IDs not configured',
      { status: 500 }
    )
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
    await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
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
