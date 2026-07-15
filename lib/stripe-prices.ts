import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

// Self-provisioning Stripe catalog.
//
// Rather than requiring price IDs to be created by hand and pasted into env
// vars, the app finds-or-creates its own products/prices by lookup_key on
// first use. Works identically in test and live mode (whichever key is
// configured). Env vars, when set, always win — so a manually curated
// catalog can still override this.

export type PaidPlan = 'plus' | 'pro'
export type BillingInterval = 'month' | 'year'

const CATALOG: Record<PaidPlan, {
  productName: string
  amounts: Record<BillingInterval, number> // cents
}> = {
  plus: { productName: 'Tutor AI Scholar', amounts: { month: 799, year: 5900 } },
  pro: { productName: 'Tutor AI Sage', amounts: { month: 1999, year: 14900 } },
}

const ENV_OVERRIDES: Record<`${PaidPlan}:${BillingInterval}`, string | undefined> = {
  'plus:month': process.env.STRIPE_PRICE_ID_PLUS,
  'plus:year': process.env.STRIPE_PRICE_ID_PLUS_ANNUAL,
  'pro:month': process.env.STRIPE_PRICE_ID_PRO,
  'pro:year': process.env.STRIPE_PRICE_ID_PRO_ANNUAL,
}

function lookupKey(plan: PaidPlan, interval: BillingInterval) {
  return `tutorai_${plan}_${interval}`
}

// Per-lambda memo; cold starts just redo one cheap list call
const priceCache = new Map<string, string>()

async function findOrCreateProduct(plan: PaidPlan): Promise<Stripe.Product> {
  const products = await stripe.products.list({ active: true, limit: 100 })
  const existing = products.data.find((p) => p.metadata?.tutorai_plan === plan)
  if (existing) return existing
  return stripe.products.create({
    name: CATALOG[plan].productName,
    metadata: { tutorai_plan: plan },
  })
}

export async function resolvePriceId(plan: PaidPlan, interval: BillingInterval): Promise<string> {
  const override = ENV_OVERRIDES[`${plan}:${interval}`]
  if (override) return override

  const key = lookupKey(plan, interval)
  const cached = priceCache.get(key)
  if (cached) return cached

  const found = await stripe.prices.list({ lookup_keys: [key], active: true, limit: 1 })
  if (found.data[0]) {
    priceCache.set(key, found.data[0].id)
    return found.data[0].id
  }

  const product = await findOrCreateProduct(plan)
  const price = await stripe.prices.create({
    product: product.id,
    currency: 'usd',
    unit_amount: CATALOG[plan].amounts[interval],
    recurring: { interval },
    lookup_key: key,
    metadata: { tutorai_plan: plan },
  })
  priceCache.set(key, price.id)
  return price.id
}

// Reverse mapping for the webhook: price ID -> plan.
// Env overrides first, then price metadata/lookup_key from Stripe.
export async function planFromPriceId(priceId: string | null | undefined): Promise<PaidPlan> {
  if (!priceId) return 'plus'

  for (const [key, id] of Object.entries(ENV_OVERRIDES)) {
    if (id && id === priceId) return key.split(':')[0] as PaidPlan
  }

  try {
    const price = await stripe.prices.retrieve(priceId)
    const metaPlan = price.metadata?.tutorai_plan
    if (metaPlan === 'plus' || metaPlan === 'pro') return metaPlan
    if (price.lookup_key?.startsWith('tutorai_pro')) return 'pro'
    if (price.lookup_key?.startsWith('tutorai_plus')) return 'plus'
  } catch {
    // fall through to least-privilege default
  }
  return 'plus'
}
