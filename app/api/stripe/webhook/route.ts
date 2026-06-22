import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  if (webhookSecret && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return new Response('Webhook signature verification failed', { status: 400 })
    }
  } else {
    // STRIPE_WEBHOOK_SECRET not yet configured — parse without verification
    // (safe only in development before the secret is wired up)
    if (process.env.NODE_ENV === 'production') {
      console.error('STRIPE_WEBHOOK_SECRET is not set in production')
      return new Response('Webhook secret not configured', { status: 500 })
    }
    event = JSON.parse(body) as Stripe.Event
  }

  const supabase = await createAdminClient()

  async function updateSubscriptionStatus(
    customerId: string,
    status: string,
    subscriptionId?: string
  ) {
    await supabase
      .from('profiles')
      .update({
        subscription_status: status,
        stripe_subscription_id: subscriptionId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.metadata?.supabase_user_id) {
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: session.customer as string })
          .eq('id', session.metadata.supabase_user_id)
      }
      break
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const status = sub.status === 'active' || sub.status === 'trialing' ? 'active' : sub.status
      await updateSubscriptionStatus(sub.customer as string, status, sub.id)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await updateSubscriptionStatus(sub.customer as string, 'canceled', undefined)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      if (invoice.customer) {
        await updateSubscriptionStatus(invoice.customer as string, 'past_due')
      }
      break
    }
  }

  return new Response('OK', { status: 200 })
}
