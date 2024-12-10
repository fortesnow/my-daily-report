"use client"

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports')
        if (!response.ok) {
          throw new Error('Failed to fetch reports')
        }
        const data = await response.json()
        setReports(data)
      } catch (err) {
        setError('日報の取得に失敗しました')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">日報一覧</h1>
        <div className="grid gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {report.name}さんの日報
                  </h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(report.date), 'yyyy年MM月dd日', { locale: ja })}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  提出時刻: {format(new Date(report.submitTime), 'HH:mm', { locale: ja })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-sm">
                  <span className="font-medium">業務量: </span>
                  {report.workload}
                </div>
                <div className="text-sm">
                  <span className="font-medium">ストレス: </span>
                  {report.stress}
                </div>
                <div className="text-sm">
                  <span className="font-medium">モチベーション: </span>
                  {report.motivation}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">本日の主な業務内容</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.tasks}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">本日の成果</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.achievements}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">問題点</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.problems}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">改善点・対策</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.improvements}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">本日の学び</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.learning}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">明日の予定</h3>
                  <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.tomorrow}</p>
                </div>
                {report.comments && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">その他コメント</h3>
                    <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{report.comments}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
