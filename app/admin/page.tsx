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
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchReports()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>Reports</h1>
          {/* レポートのリストを表示 */}
          {filteredReports.map(report => (
            <div key={report.id}>
              <h2>{report.name}</h2>
              <p>{report.date}</p>
              {/* 他のフィールドも表示 */}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
