"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  FaCalendar, 
  FaSmile, 
  FaBatteryHalf, 
  FaBolt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaLightbulb, 
  FaComments,
  FaCalendarDay
} from 'react-icons/fa'

const ScaleQuestion = ({ label, value, onChange, icon, lowLabel, midLabel, highLabel }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  lowLabel: string;
  midLabel: string;
  highLabel: string;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
      <Label className="text-lg font-semibold text-gray-700 flex items-center mb-4">
        {icon}
        <span className="ml-2">{label}</span>
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex justify-between">
        {[1, 2, 3, 4, 5].map((val) => (
          <div key={val}>
            <RadioGroupItem value={val.toString()} id={`${label}-${val}`} className="peer sr-only" />
            <Label
              htmlFor={`${label}-${val}`}
              className="flex flex-col items-center justify-center w-12 h-12 text-xs font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-50"
            >
              {val}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="text-sm text-gray-500 mt-2 flex justify-between">
        <span>{lowLabel}</span>
        <span>{midLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  )
}

const TextAreaField = ({ id, label, placeholder, icon }: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="relative">
      <Label htmlFor={id} className="text-lg font-semibold text-gray-700 flex items-center mb-2">
        {icon}
        <span className="ml-2">{label}</span>
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={3}
        className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  )
}

export default function DailyReportForm() {
  const [workload, setWorkload] = useState("3")
  const [stress, setStress] = useState("3")
  const [motivation, setMotivation] = useState("3")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitTime, setSubmitTime] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    setSubmitTime(new Date().toLocaleString())
    
    const form = event.currentTarget as HTMLFormElement
    
    const formData = {
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      workload,
      stress,
      motivation,
      tasks: (form.elements.namedItem('tasks') as HTMLTextAreaElement).value,
      achievements: (form.elements.namedItem('achievements') as HTMLTextAreaElement).value,
      problems: (form.elements.namedItem('problems') as HTMLTextAreaElement).value,
      improvements: (form.elements.namedItem('improvements') as HTMLTextAreaElement).value,
      learning: (form.elements.namedItem('learning') as HTMLTextAreaElement).value,
      tomorrow: (form.elements.namedItem('tomorrow') as HTMLTextAreaElement).value,
      comments: (form.elements.namedItem('comments') as HTMLTextAreaElement).value,
      submitTime: new Date().toISOString()
    }

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('日報が提出されました')
      } else {
        throw new Error('Failed to submit report')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('提出に失敗しました')
      setIsSubmitted(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="date" className="text-lg font-semibold text-gray-700 flex items-center">
                <FaCalendar className="w-5 h-5 text-gray-500 mr-2" />
                日付
              </Label>
              <Input
                type="date"
                id="date"
                required
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="name" className="text-lg font-semibold text-gray-700 flex items-center">
                <FaSmile className="w-5 h-5 text-gray-500 mr-2" />
                名前
              </Label>
              <Input
                type="text"
                id="name"
                required
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid gap-6">
            <ScaleQuestion
              label="業務量"
              value={workload}
              onChange={setWorkload}
              icon={<FaBatteryHalf className="w-5 h-5 text-blue-500" />}
              lowLabel="少ない"
              midLabel="普通"
              highLabel="多い"
            />

            <ScaleQuestion
              label="ストレス"
              value={stress}
              onChange={setStress}
              icon={<FaBolt className="w-5 h-5 text-yellow-500" />}
              lowLabel="低い"
              midLabel="普通"
              highLabel="高い"
            />

            <ScaleQuestion
              label="モチベーション"
              value={motivation}
              onChange={setMotivation}
              icon={<FaSmile className="w-5 h-5 text-green-500" />}
              lowLabel="低い"
              midLabel="普通"
              highLabel="高い"
            />
          </div>

          <TextAreaField
            id="tasks"
            label="本日の主な業務内容"
            placeholder="1. プロジェクトAのミーティング&#10;2. 報告書の作成&#10;3. 新規顧客との商談"
            icon={<FaCheckCircle className="w-5 h-5 text-blue-500" />}
          />

          <TextAreaField
            id="achievements"
            label="本日の成果"
            placeholder="プロジェクトAの進捗を20%から35%まで上げることができた"
            icon={<FaCheckCircle className="w-5 h-5 text-green-500" />}
          />

          <TextAreaField
            id="problems"
            label="問題点"
            placeholder="1. タスクBの納期が厳しい&#10;2. 新しいツールの使い方に慣れていない"
            icon={<FaTimesCircle className="w-5 h-5 text-red-500" />}
          />

          <TextAreaField
            id="improvements"
            label="改善点・対策"
            placeholder="1. タスクBの優先順位を上げ、チームで協力して取り組む&#10;2. 新しいツールのオンライン講座を受講する"
            icon={<FaLightbulb className="w-5 h-5 text-yellow-500" />}
          />

          <TextAreaField
            id="learning"
            label="本日の学び"
            placeholder="新しい顧客対応テクニックを学んだ"
            icon={<FaLightbulb className="w-5 h-5 text-purple-500" />}
          />

          <TextAreaField
            id="tomorrow"
            label="明日の予定"
            placeholder="1. プロジェクトBのキックオフミーティング&#10;2. 報告書の提出&#10;3. オンライン研修の受講"
            icon={<FaCalendarDay className="w-5 h-5 text-indigo-500" />}
          />

          <TextAreaField
            id="comments"
            label="その他コメント"
            placeholder="特になし"
            icon={<FaComments className="w-5 h-5 text-gray-500" />}
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            disabled={isSubmitted}
          >
            {isSubmitted ? '提出済み' : '提出'}
          </Button>
        </form>
      </div>
    </div>
  )
}
