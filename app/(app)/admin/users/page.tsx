'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Search, Shield, GraduationCap, BookOpen, ChevronDown } from 'lucide-react'

type UserRow = {
  id: string
  full_name: string | null
  email: string
  role: string | null
  school: string | null
  subscription_status: string
  created_at: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, school, subscription_status, created_at')
      .order('created_at', { ascending: false })
    setUsers(data ?? [])
    setLoading(false)
  }

  async function changeRole(userId: string, newRole: string) {
    setUpdating(userId)
    const supabase = createClient()
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: newRole } : u))
    setUpdating(null)
  }

  const filtered = users.filter((u) =>
    (u.full_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.school ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const roleIcon = (role: string | null) => {
    if (role === 'admin') return <Shield className="w-3.5 h-3.5 text-red-500" />
    if (role === 'teacher') return <GraduationCap className="w-3.5 h-3.5 text-violet-500" />
    return <BookOpen className="w-3.5 h-3.5 text-blue-500" />
  }

  const roleColor = (role: string | null) => {
    if (role === 'admin') return 'bg-red-100 text-red-700'
    if (role === 'teacher') return 'bg-violet-100 text-violet-700'
    return 'bg-blue-100 text-blue-700'
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Admin</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} total accounts</p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or school..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric"
        />
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">School</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">Loading users...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">No users found</td>
                </tr>
              ) : filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-electric">
                          {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.full_name ?? 'Unnamed'}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">{u.school ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="relative inline-block">
                      <select
                        value={u.role ?? 'student'}
                        onChange={(e) => changeRole(u.id, e.target.value)}
                        disabled={updating === u.id}
                        className={`appearance-none text-xs font-semibold pl-2 pr-6 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-electric/30 ${roleColor(u.role)} ${updating === u.id ? 'opacity-50' : ''}`}
                      >
                        <option value="student">student</option>
                        <option value="teacher">teacher</option>
                        <option value="admin">admin</option>
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      u.subscription_status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {u.subscription_status === 'active' ? 'paid' : u.subscription_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
