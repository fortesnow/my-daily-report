'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Report = {
  id: string
  date: string
  name: string
  workload: string
  stress: string
  motivation: string
  tasks: string
  achievements: string
  problems: string
  improvements: string
  learning: string
  tomorrow: string
  comments: string | null
  submitTime: string
}

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports')
        if (!response.ok) {
          throw new Error('Failed to fetch reports')
        }
        const data = await response.json()
        setReports(data)
        setFilteredReports(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')  // ここを修正
      } finally {
        setLoading(false)  // これを追加
      }
    }
    
    fetchReports()
  }, [])

  // ... 残りのコード
}
