'use client'

import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Users, Send, Copy, Check, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import type { StudyGroup, GroupMessage } from '@/types'

interface PageProps { params: Promise<{ groupId: string }> }

interface Member {
  user_id: string
  profiles: { full_name: string | null; email: string | null } | null
}

export default function GroupChatPage({ params }: PageProps) {
  const { groupId } = use(params)
  const [group, setGroup] = useState<StudyGroup | null>(null)
  const [messages, setMessages] = useState<GroupMessage[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { load() }, [groupId])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setCurrentUserId(user.id)

    // Check membership
    const { data: membership } = await supabase
      .from('study_group_members')
      .select('group_id')
      .eq('group_id', groupId)
      .eq('user_id', user.id)
      .single()
    if (!membership) { router.push('/groups'); return }

    const [{ data: groupData }, { data: msgs }, { data: membersData }] = await Promise.all([
      supabase.from('study_groups').select('*').eq('id', groupId).single(),
      supabase.from('group_messages').select('*').eq('group_id', groupId).order('created_at', { ascending: true }).limit(100),
      supabase.from('study_group_members').select('user_id, profiles(full_name, email)').eq('group_id', groupId),
    ])

    if (!groupData) { router.push('/groups'); return }
    setGroup(groupData as StudyGroup)
    setMessages((msgs ?? []) as GroupMessage[])
    setMembers((membersData ?? []) as unknown as Member[])
    setLoading(false)

    // Subscribe to new messages
    const channel = supabase
      .channel(`group-${groupId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${groupId}` },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates (optimistic update already added it)
            if (prev.some((m) => m.id === (payload.new as GroupMessage).id)) return prev
            return [...prev, payload.new as GroupMessage]
          })
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const content = text.trim()
    if (!content || sending || !currentUserId) return
    setSending(true)
    setText('')

    const { data: profile } = await supabase.from('profiles').select('full_name, email').eq('id', currentUserId).single()
    const senderName = profile?.full_name ?? profile?.email?.split('@')[0] ?? 'Member'

    // Optimistic insert
    const optimistic: GroupMessage = {
      id: crypto.randomUUID(),
      group_id: groupId,
      user_id: currentUserId,
      content,
      sender_name: senderName,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimistic])

    await supabase.from('group_messages').insert({ group_id: groupId, user_id: currentUserId, content, sender_name: senderName })
    setSending(false)
  }

  function copyCode() {
    if (!group) return
    navigator.clipboard.writeText(group.invite_code)
    setCopied(true)
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
      if (last && last[0].user_id === msg.user_id && new Date(msg.created_at).getTime() - new Date(last[last.length - 1].created_at).getTime() < 60000) {
        last.push(msg)
      } else {
        groups.push([msg])
      }
    }
    return groups
  }

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
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] animate-fade-up">
      {/* Header */}
      <div className="glass rounded-2xl p-4 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/groups" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-electric" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 text-sm truncate">{group.name}</h1>
            <p className="text-xs text-gray-400">{members.length} member{members.length !== 1 ? 's' : ''}{group.subject ? ` · ${group.subject}` : ''}</p>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl text-xs text-gray-500 hover:text-electric transition-colors shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            {group.invite_code}
          </button>
        </div>
      </div>

      {/* Messages */}
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
          grouped.map((group, gi) => {
            const isMe = group[0].user_id === currentUserId
            return (
              <div key={gi} className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-600 text-xs font-bold shrink-0 mt-auto">
                    {(group[0].sender_name?.[0] ?? '?').toUpperCase()}
                  </div>
                )}
                <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <span className="text-[11px] font-semibold text-gray-500 px-1">{group[0].sender_name}</span>
                  )}
                  {group.map((msg, mi) => (
                    <div
                      key={msg.id}
                      className={`px-3.5 py-2 text-sm leading-relaxed ${
                        isMe
                          ? 'bg-electric text-white rounded-2xl rounded-tr-sm'
                          : 'glass text-gray-800 rounded-2xl rounded-tl-sm'
                      } ${group.length > 1 && mi < group.length - 1 ? (isMe ? 'rounded-br-md' : 'rounded-bl-md') : ''}`}
                    >
                      {msg.content}
                    </div>
                  ))}
                  <span className="text-[10px] text-gray-400 px-1">
                    {formatTime(group[group.length - 1].created_at)}
                  </span>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
    </div>
  )
}
