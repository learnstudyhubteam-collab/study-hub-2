'use client'

import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft, Users, Send, Copy, Check, MessageSquare,
  Link2, FileText, Plus, Trash2, ExternalLink, X, CalendarClock,
} from 'lucide-react'
import Link from 'next/link'
import type { StudyGroup, GroupMessage } from '@/types'
import { toast } from '@/lib/toast'

interface PageProps { params: Promise<{ groupId: string }> }

interface Member {
  user_id: string
  profiles: { full_name: string | null; email: string | null } | null
}

interface GroupResource {
  id: string
  group_id: string
  user_id: string
  title: string
  url: string | null
  description: string | null
  resource_type: 'link' | 'note'
  poster_name: string
  created_at: string
}

type Tab = 'chat' | 'resources' | 'members'

interface DetectedEvent {
  messageId: string
  senderName: string
  originalText: string
  hint: string
}

function detectMeetupInMessages(msgs: GroupMessage[]): DetectedEvent | null {
  const meetupRe = /\b(meet(?:up)?|study session|get together|zoom|group study|practice|review session|hangout|gathering|video call|call)\b/i
  const dayRe = /\b(mon(?:day)?|tue(?:sday)?|wed(?:nesday)?|thu(?:rsday)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?|tomorrow|tonight|today)\b/i
  const timeRe = /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i
  const dateRe = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}\b/i

  for (const msg of [...msgs].reverse().slice(0, 40)) {
    const t = msg.content
    if (!meetupRe.test(t)) continue
    if (!dayRe.test(t) && !timeRe.test(t) && !dateRe.test(t)) continue
    const parts = [t.match(dayRe)?.[0], t.match(dateRe)?.[0], t.match(timeRe)?.[0]].filter(Boolean)
    return {
      messageId: msg.id,
      senderName: msg.sender_name,
      originalText: t.length > 80 ? t.slice(0, 80) + '…' : t,
      hint: parts.join(' ').trim(),
    }
  }
  return null
}

export default function GroupPage({ params }: PageProps) {
  const { groupId } = use(params)
  const [group, setGroup] = useState<StudyGroup | null>(null)
  const [messages, setMessages] = useState<GroupMessage[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [resources, setResources] = useState<GroupResource[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('chat')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [currentUserName, setCurrentUserName] = useState('')
  const [detectedEvent, setDetectedEvent] = useState<DetectedEvent | null>(null)
  const [dismissedEventId, setDismissedEventId] = useState<string | null>(null)
  const [savingEvent, setSavingEvent] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Resource form state
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [resTitle, setResTitle] = useState('')
  const [resUrl, setResUrl] = useState('')
  const [resDesc, setResDesc] = useState('')
  const [resType, setResType] = useState<'link' | 'note'>('link')
  const [resSaving, setResSaving] = useState(false)

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setCurrentUserId(user.id)

      const { data: membership } = await supabase
        .from('study_group_members')
        .select('group_id')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single()
      if (!membership) { router.push('/groups'); return }

      const { data: profile } = await supabase
        .from('profiles').select('full_name, email').eq('id', user.id).single()
      setCurrentUserName(profile?.full_name ?? profile?.email?.split('@')[0] ?? 'Member')

      const [{ data: groupData }, { data: msgs }, { data: membersData }, { data: resourcesData }] = await Promise.all([
        supabase.from('study_groups').select('*').eq('id', groupId).single(),
        supabase.from('group_messages').select('*').eq('group_id', groupId).order('created_at', { ascending: true }).limit(100),
        supabase.from('study_group_members').select('user_id, profiles(full_name, email)').eq('group_id', groupId),
        supabase.from('group_resources').select('*').eq('group_id', groupId).order('created_at', { ascending: false }),
      ])

      if (!groupData) { router.push('/groups'); return }
      setGroup(groupData as StudyGroup)
      setMessages((msgs ?? []) as GroupMessage[])
      setMembers((membersData ?? []) as unknown as Member[])
      setResources((resourcesData ?? []) as GroupResource[])
      setLoading(false)

      channel = supabase
        .channel(`group-${groupId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${groupId}` },
          (payload) => {
            setMessages((prev) => {
              if (prev.some((m) => m.id === (payload.new as GroupMessage).id)) return prev
              return [...prev, payload.new as GroupMessage]
            })
          }
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'group_resources', filter: `group_id=eq.${groupId}` },
          (payload) => {
            setResources((prev) => {
              if (prev.some((r) => r.id === (payload.new as GroupResource).id)) return prev
              return [payload.new as GroupResource, ...prev]
            })
          }
        )
        .subscribe()
    }

    load()
    return () => { if (channel) supabase.removeChannel(channel) }
  }, [groupId])

  useEffect(() => {
    if (tab === 'chat') bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, tab])

  useEffect(() => {
    if (messages.length === 0) return
    const found = detectMeetupInMessages(messages)
    if (found && found.messageId !== dismissedEventId) {
      setDetectedEvent(found)
    } else {
      setDetectedEvent(null)
    }
  }, [messages, dismissedEventId])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const content = text.trim()
    if (!content || sending || !currentUserId) return
    setSending(true)
    setText('')

    const optimistic: GroupMessage = {
      id: crypto.randomUUID(),
      group_id: groupId,
      user_id: currentUserId,
      content,
      sender_name: currentUserName,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimistic])
    await supabase.from('group_messages').insert({
      group_id: groupId, user_id: currentUserId, content, sender_name: currentUserName,
    })
    setSending(false)
  }

  async function addEventToSchedule() {
    if (!detectedEvent || !currentUserId || !group) return
    setSavingEvent(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSavingEvent(false); return }
    await supabase.from('study_schedules').insert({
      user_id: user.id,
      title: `${group.name} Study Session`,
      content: `Study group meetup detected from chat.\n\n"${detectedEvent.originalText}"\n— ${detectedEvent.senderName}\n\nDetected: ${detectedEvent.hint}`,
      subjects: group.subject ? [group.subject] : ['Study Session'],
      hours_per_day: 1,
    })
    setSavingEvent(false)
    setDismissedEventId(detectedEvent.messageId)
    setDetectedEvent(null)
    toast('Added to Study Schedule!', 'success')
  }

  async function addResource(e: React.FormEvent) {
    e.preventDefault()
    if (!resTitle.trim() || !currentUserId) return
    setResSaving(true)
    const optimistic: GroupResource = {
      id: crypto.randomUUID(),
      group_id: groupId,
      user_id: currentUserId,
      title: resTitle.trim(),
      url: resUrl.trim() || null,
      description: resDesc.trim() || null,
      resource_type: resType,
      poster_name: currentUserName,
      created_at: new Date().toISOString(),
    }
    setResources((prev) => [optimistic, ...prev])
    const { error } = await supabase.from('group_resources').insert({
      group_id: groupId,
      user_id: currentUserId,
      title: resTitle.trim(),
      url: resUrl.trim() || null,
      description: resDesc.trim() || null,
      resource_type: resType,
      poster_name: currentUserName,
    })
    if (error) {
      setResources((prev) => prev.filter((r) => r.id !== optimistic.id))
      toast('Failed to add resource', 'error')
    } else {
      toast('Resource added!', 'success')
    }
    setResTitle(''); setResUrl(''); setResDesc(''); setResType('link')
    setShowResourceForm(false)
    setResSaving(false)
  }

  async function deleteResource(id: string) {
    setResources((prev) => prev.filter((r) => r.id !== id))
    await supabase.from('group_resources').delete().eq('id', id).eq('user_id', currentUserId!)
    toast('Resource removed', 'info')
  }

  function copyCode() {
    if (!group) return
    navigator.clipboard.writeText(group.invite_code)
    setCopied(true)
    toast('Invite code copied!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  function formatTime(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const isToday = d.toDateString() === now.toDateString()
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function groupConsecutive(msgs: GroupMessage[]) {
    const groups: GroupMessage[][] = []
    for (const msg of msgs) {
      const last = groups[groups.length - 1]
      if (last && last[0].user_id === msg.user_id &&
        new Date(msg.created_at).getTime() - new Date(last[last.length - 1].created_at).getTime() < 60000) {
        last.push(msg)
      } else {
        groups.push([msg])
      }
    }
    return groups
  }

  function memberInitials(m: Member) {
    const name = m.profiles?.full_name ?? m.profiles?.email ?? '?'
    return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
  }

  function memberDisplayName(m: Member) {
    return m.profiles?.full_name ?? m.profiles?.email?.split('@')[0] ?? 'Member'
  }

  const AVATAR_COLORS = [
    'bg-violet-500/20 text-violet-600',
    'bg-blue-500/20 text-blue-600',
    'bg-emerald-500/20 text-emerald-600',
    'bg-rose-500/20 text-rose-600',
    'bg-amber-500/20 text-amber-600',
    'bg-cyan-500/20 text-cyan-600',
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-2xl bg-electric-gradient animate-pulse shadow-electric" />
      </div>
    )
  }
  if (!group) return null

  const grouped = groupConsecutive(messages)

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[900px] animate-fade-up">
      {/* Header */}
      <div className="glass rounded-2xl p-4 mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/groups" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5 text-electric" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 text-sm truncate">{group.name}</h1>
            <p className="text-xs text-gray-400">
              {members.length} member{members.length !== 1 ? 's' : ''}
              {group.subject ? ` · ${group.subject}` : ''}
            </p>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl text-xs text-gray-500 hover:text-electric transition-colors shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            {group.invite_code}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {([
            { id: 'chat', label: 'Chat', icon: MessageSquare, count: messages.length },
            { id: 'resources', label: 'Resources', icon: Link2, count: resources.length },
            { id: 'members', label: 'Members', icon: Users, count: members.length },
          ] as const).map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                tab === id
                  ? 'bg-electric text-white shadow-electric'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tab === id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
                }`}>{count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CHAT TAB ── */}
      {tab === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-2">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mb-3">
                  <MessageSquare className="w-7 h-7 text-electric" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">No messages yet</p>
                <p className="text-xs text-gray-400">Be the first to say something!</p>
              </div>
            ) : (
              grouped.map((grp, gi) => {
                const isMe = grp[0].user_id === currentUserId
                return (
                  <div key={gi} className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                    {!isMe && (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-auto ${
                        AVATAR_COLORS[grp[0].user_id.charCodeAt(0) % AVATAR_COLORS.length]
                      }`}>
                        {(grp[0].sender_name?.[0] ?? '?').toUpperCase()}
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && (
                        <span className="text-[11px] font-semibold text-gray-500 px-1">{grp[0].sender_name}</span>
                      )}
                      {grp.map((msg, mi) => (
                        <div
                          key={msg.id}
                          className={`px-3.5 py-2 text-sm leading-relaxed ${
                            isMe
                              ? 'bg-electric text-white rounded-2xl rounded-tr-sm'
                              : 'glass text-gray-800 rounded-2xl rounded-tl-sm'
                          } ${grp.length > 1 && mi < grp.length - 1 ? (isMe ? 'rounded-br-md' : 'rounded-bl-md') : ''}`}
                        >
                          {msg.content}
                        </div>
                      ))}
                      <span className="text-[10px] text-gray-400 px-1">
                        {formatTime(grp[grp.length - 1].created_at)}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Meetup detection banner */}
          {detectedEvent && (
            <div className="shrink-0 mt-2 glass rounded-2xl p-3 border border-sky-200 bg-sky-50/40 flex items-start gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center shrink-0">
                <CalendarClock className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-sky-800 mb-0.5">Study session detected</p>
                <p className="text-xs text-sky-700 truncate">"{detectedEvent.originalText}"</p>
                {detectedEvent.hint && (
                  <p className="text-[11px] text-sky-600 mt-0.5 font-medium">{detectedEvent.hint} · {detectedEvent.senderName}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={addEventToSchedule}
                  disabled={savingEvent}
                  className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {savingEvent ? (
                    <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <CalendarClock className="w-3 h-3" />
                  )}
                  Add to Schedule
                </button>
                <button
                  onClick={() => { setDismissedEventId(detectedEvent.messageId); setDetectedEvent(null) }}
                  className="text-sky-400 hover:text-sky-600 transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={sendMessage} className="shrink-0 mt-3">
            <div className="glass rounded-2xl flex items-center gap-2 p-2 pl-4">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Message the group…"
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={!text.trim() || sending}
                className="w-9 h-9 rounded-xl bg-electric flex items-center justify-center text-white disabled:opacity-40 transition-opacity hover:bg-electric/90 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </>
      )}

      {/* ── RESOURCES TAB ── */}
      {tab === 'resources' && (
        <div className="flex-1 overflow-y-auto space-y-3 pb-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Shared links and notes</p>
            <button
              onClick={() => setShowResourceForm(true)}
              className="flex items-center gap-1.5 btn-electric text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" /> Add resource
            </button>
          </div>

          {/* Add resource form */}
          {showResourceForm && (
            <div className="glass rounded-2xl p-4 border border-electric/15 animate-fade-up">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">Add resource</h3>
                <button onClick={() => setShowResourceForm(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={addResource} className="space-y-2">
                <div className="flex gap-2">
                  {(['link', 'note'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setResType(t)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        resType === t ? 'bg-electric text-white' : 'bg-black/5 text-gray-500 hover:bg-black/8'
                      }`}
                    >
                      {t === 'link' ? <Link2 className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                      {t === 'link' ? 'Link' : 'Note'}
                    </button>
                  ))}
                </div>
                <input
                  required
                  placeholder="Title"
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  className="input-glass w-full px-3 py-2 rounded-xl text-sm"
                />
                {resType === 'link' && (
                  <input
                    placeholder="URL (https://...)"
                    value={resUrl}
                    onChange={(e) => setResUrl(e.target.value)}
                    className="input-glass w-full px-3 py-2 rounded-xl text-sm"
                    type="url"
                  />
                )}
                <textarea
                  placeholder={resType === 'note' ? 'Write your note…' : 'Description (optional)'}
                  value={resDesc}
                  onChange={(e) => setResDesc(e.target.value)}
                  rows={resType === 'note' ? 4 : 2}
                  className="input-glass w-full px-3 py-2 rounded-xl text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={resSaving || !resTitle.trim()}
                  className="btn-electric text-white w-full py-2 rounded-xl font-semibold text-sm disabled:opacity-60"
                >
                  {resSaving ? 'Saving…' : 'Add resource'}
                </button>
              </form>
            </div>
          )}

          {resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center mb-3">
                <Link2 className="w-6 h-6 text-electric" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">No resources yet</p>
              <p className="text-xs text-gray-400">Share links, notes, or study materials with the group.</p>
            </div>
          ) : (
            resources.map((res) => (
              <div key={res.id} className="glass-card p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    res.resource_type === 'link' ? 'bg-blue-500/10' : 'bg-violet-500/10'
                  }`}>
                    {res.resource_type === 'link'
                      ? <Link2 className="w-4 h-4 text-blue-500" />
                      : <FileText className="w-4 h-4 text-violet-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{res.title}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-electric transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {res.user_id === currentUserId && (
                          <button
                            onClick={() => deleteResource(res.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    {res.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-3">{res.description}</p>
                    )}
                    {res.url && (
                      <p className="text-xs text-electric truncate mt-0.5">{res.url}</p>
                    )}
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      {res.poster_name} · {new Date(res.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── MEMBERS TAB ── */}
      {tab === 'members' && (
        <div className="flex-1 overflow-y-auto space-y-2 pb-2">
          <p className="text-xs text-gray-400">{members.length} member{members.length !== 1 ? 's' : ''} in this group</p>
          {members.map((m, i) => {
            const isCreator = group.created_by === m.user_id
            const isMe = m.user_id === currentUserId
            return (
              <div key={m.user_id} className="glass-card p-3.5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  AVATAR_COLORS[i % AVATAR_COLORS.length]
                }`}>
                  {memberInitials(m)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {memberDisplayName(m)}
                    {isMe && <span className="ml-1.5 text-[10px] text-electric font-medium">(you)</span>}
                  </p>
                  {m.profiles?.email && (
                    <p className="text-xs text-gray-400 truncate">{m.profiles.email}</p>
                  )}
                </div>
                {isCreator && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 shrink-0">
                    Owner
                  </span>
                )}
              </div>
            )
          })}

          <div className="pt-2">
            <button
              onClick={copyCode}
              className="w-full glass border border-dashed border-electric/30 rounded-2xl p-4 text-center hover:bg-electric/5 transition-colors group"
            >
              <p className="text-sm font-semibold text-gray-700 group-hover:text-electric transition-colors">
                Invite someone
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Share code <span className="font-mono font-bold text-electric">{group.invite_code}</span>
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
