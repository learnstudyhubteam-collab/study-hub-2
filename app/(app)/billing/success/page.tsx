import Link from 'next/link'

export default function BillingSuccessPage() {
  return (
    <div className="max-w-sm mx-auto text-center py-16">
      <p className="text-5xl mb-4">🎉</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re on Pro!</h1>
      <p className="text-gray-500 mb-8">
        Your subscription is active. You now have access to our most advanced AI model.
      </p>
      <Link
        href="/dashboard"
        className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
      >
        Go to dashboard →
      </Link>
    </div>
  )
}
