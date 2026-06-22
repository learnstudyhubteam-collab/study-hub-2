import Link from 'next/link'

export default function UpgradeBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold">Upgrade to Study Hub Pro</p>
        <p className="text-sm text-brand-100 mt-0.5">
          Get access to our most capable AI model for $15/month.
        </p>
      </div>
      <Link
        href="/billing"
        className="shrink-0 bg-white text-brand-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-50 transition-colors"
      >
        See plans →
      </Link>
    </div>
  )
}
