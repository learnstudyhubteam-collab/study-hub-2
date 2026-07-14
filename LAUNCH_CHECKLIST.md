# Tutor AI — Launch Checklist

Everything in the codebase and database is done. The items below are the only
things that require dashboard access (they cannot be done from code).

## 1. Stripe (stay in TEST mode until launch day)

Create 4 prices in the Stripe dashboard (**test mode** — toggle in the top-left):

| Product | Price | Interval | → Vercel env var |
|---|---|---|---|
| Tutor AI Scholar | $7.99 | monthly | `STRIPE_PRICE_ID_PLUS` |
| Tutor AI Scholar | $59.00 | yearly | `STRIPE_PRICE_ID_PLUS_ANNUAL` |
| Tutor AI Sage | $19.99 | monthly | `STRIPE_PRICE_ID_PRO` |
| Tutor AI Sage | $149.00 | yearly | `STRIPE_PRICE_ID_PRO_ANNUAL` |

Then set those 4 env vars in Vercel (Settings → Environment Variables) and
redeploy. Test checkout with card `4242 4242 4242 4242`.

**On launch day only:**
1. Activate the account if the dashboard shows an "Activate payments" banner.
2. Recreate the same 4 prices in **live mode**; swap the 4 env vars to the live IDs.
3. Swap `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to live keys.
4. Dashboard → Developers → Webhooks → Add endpoint:
   `https://tutorailearn.com/api/stripe/webhook`
   (events: `checkout.session.completed`, `customer.subscription.*`,
   `invoice.payment_failed`) → copy the signing secret into
   `STRIPE_WEBHOOK_SECRET` in Vercel.
5. Make one real $7.99 purchase yourself and confirm your profile flips to
   Scholar, then refund it.
- The old live "$15 Study Hub Pro" price (`price_1TkT8C...`) is unused — archive it.

## 2. Vercel env vars (verify these exist for Production)

- `CRON_SECRET` — any long random string. **Both cron jobs refuse to run
  without it** (streak-saver emails at 22:00 UTC, daily digest + streak-freeze
  consumption at 08:00 UTC).
- `RESEND_API_KEY` — from resend.com. Emails silently fail without it.
- `RESEND_FROM_EMAIL` — e.g. `Tutor AI <noreply@tutorailearn.com>`. The domain
  **must be verified in Resend** (Resend → Domains → add tutorailearn.com →
  add the DNS records it gives you).
- `NEXT_PUBLIC_APP_URL` = `https://tutorailearn.com` — email links and
  invite redirects use this; the fallback still points at the old vercel.app URL.

## 3. Supabase dashboard (2 minutes)

- Authentication → Passwords → enable **leaked password protection**.
- Project Settings → Auth → SMTP: configure custom SMTP (e.g. Resend SMTP)
  **before using bulk enrollment** — the built-in mailer sends only ~3
  emails/hour, so a 100-student CSV invite will mostly fail without it.

## 4. Nice to have

- Vercel → Settings → Domains: make `tutorailearn.com` the primary domain so
  the `study-hub-2-eight.vercel.app` URL redirects to it.
- Stripe/Vercel account names still say "Study Hub" — rename whenever convenient.
