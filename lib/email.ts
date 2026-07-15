import { Resend } from 'resend'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'Tutor AI <noreply@tutorailearn.com>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

function baseTemplate(title: string, preheader: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<style>
  body{margin:0;padding:0;background:#F8FBFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
  .wrap{max-width:560px;margin:40px auto;padding:0 16px;}
  .card{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 24px rgba(0,102,255,0.08);}
  .logo{display:flex;align-items:center;gap:10px;margin-bottom:32px;}
  .logo-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#0066FF,#3B82F6);display:flex;align-items:center;justify-content:center;}
  .logo-text{font-size:18px;font-weight:800;color:#0066FF;}
  h1{font-size:22px;font-weight:800;color:#111827;margin:0 0 8px;}
  p{font-size:15px;color:#6B7280;line-height:1.6;margin:0 0 16px;}
  .item{background:#F8FBFF;border-radius:14px;padding:16px 20px;margin:12px 0;border-left:4px solid #0066FF;}
  .item-title{font-size:14px;font-weight:700;color:#111827;margin:0 0 4px;}
  .item-meta{font-size:13px;color:#6B7280;margin:0;}
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
  .badge-red{background:#FEE2E2;color:#DC2626;}
  .badge-amber{background:#FEF3C7;color:#D97706;}
  .btn{display:block;width:100%;box-sizing:border-box;background:linear-gradient(135deg,#0066FF,#3B82F6);color:#fff;text-decoration:none;text-align:center;padding:14px 24px;border-radius:14px;font-size:15px;font-weight:700;margin:28px 0 0;}
  .footer{text-align:center;font-size:12px;color:#9CA3AF;margin-top:24px;line-height:1.7;}
  .divider{height:1px;background:#F3F4F6;margin:24px 0;}
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="logo">
      <div class="logo-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <span class="logo-text">Tutor AI</span>
    </div>
    ${body}
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://tutorailearn.com'}/dashboard" class="btn">Open Tutor AI →</a>
  </div>
  <div class="footer">
    You&rsquo;re receiving this because you have upcoming deadlines.<br/>
    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://tutorailearn.com'}/settings" style="color:#0066FF;">Manage notification settings</a>
  </div>
</div>
</body>
</html>`
}

export async function sendDailyDigest({
  to,
  name,
  exams,
  assignments,
}: {
  to: string
  name: string
  exams: { title: string; subject: string | null; exam_date: string }[]
  assignments: { title: string; subject: string | null; due_date: string; priority: string }[]
}) {
  const firstName = name?.split(' ')[0] || 'there'
  const hasItems = exams.length > 0 || assignments.length > 0
  if (!hasItems) return

  const examHtml = exams.map((e) => {
    const date = new Date(e.exam_date)
    const daysLeft = Math.ceil((date.getTime() - Date.now()) / 86400000)
    const urgency = daysLeft <= 1 ? 'badge-red' : 'badge-amber'
    const label = daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days`
    return `<div class="item">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span class="item-title">${e.title}</span>
        <span class="badge ${urgency}">${label}</span>
      </div>
      <p class="item-meta">${e.subject ?? 'Exam'} &middot; ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
    </div>`
  }).join('')

  const assignmentHtml = assignments.map((a) => {
    const date = new Date(a.due_date)
    const daysLeft = Math.ceil((date.getTime() - Date.now()) / 86400000)
    const urgency = daysLeft <= 1 ? 'badge-red' : 'badge-amber'
    const label = daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days`
    return `<div class="item">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span class="item-title">${a.title}</span>
        <span class="badge ${urgency}">${label}</span>
      </div>
      <p class="item-meta">${a.subject ?? 'Assignment'} &middot; Due ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
    </div>`
  }).join('')

  const sections = [
    exams.length > 0 ? `<h2 style="font-size:13px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.5px;margin:0 0 8px;">Upcoming Exams</h2>${examHtml}` : '',
    assignments.length > 0 ? `${exams.length > 0 ? '<div class="divider"></div>' : ''}<h2 style="font-size:13px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.5px;margin:0 0 8px;">Due Soon</h2>${assignmentHtml}` : '',
  ].join('')

  const total = exams.length + assignments.length
  const body = `
    <h1>Hey ${firstName}, you have ${total} deadline${total !== 1 ? 's' : ''} coming up</h1>
    <p>Here&rsquo;s your daily Tutor AI digest so nothing slips through the cracks.</p>
    <div class="divider"></div>
    ${sections}
  `

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `📚 ${total} upcoming deadline${total !== 1 ? 's' : ''} — Tutor AI`,
    html: baseTemplate('Tutor AI Daily Digest', `You have ${total} upcoming deadline${total !== 1 ? 's' : ''}`, body),
  })
}

export async function sendStreakSaver({
  to,
  name,
  streak,
  freezes,
}: {
  to: string
  name: string
  streak: number
  freezes: number
}) {
  const firstName = name?.split(' ')[0] || 'there'

  const body = `
    <h1>🔥 Your ${streak}-day streak ends at midnight, ${firstName}!</h1>
    <p>You&rsquo;ve studied <strong>${streak} day${streak !== 1 ? 's' : ''} in a row</strong> — that&rsquo;s real momentum. One quick lesson keeps the chain alive.</p>
    <div class="item" style="border-left-color:#F97316;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span class="item-title">Complete any lesson before midnight</span>
        <span class="badge badge-amber">~3 min</span>
      </div>
      <p class="item-meta">A single Learn Mode lesson, flashcard review, or AI tutor session counts.</p>
    </div>
    ${freezes > 0
      ? `<p style="font-size:13px;">Safety net: you have <strong>${freezes} streak freeze${freezes !== 1 ? 's' : ''}</strong> — it&rsquo;ll be used automatically if you miss today.</p>`
      : `<p style="font-size:13px;">No streak freezes left — this one&rsquo;s on you! (You can buy freezes with rubies in the Ruby Shop.)</p>`}
  `

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `🔥 Your ${streak}-day streak ends at midnight`,
    html: baseTemplate('Streak Saver', `Don't lose your ${streak}-day streak`, body),
  })
}
