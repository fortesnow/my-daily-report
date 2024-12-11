'use client'

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
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
  comments: string
}

const ScaleQuestion = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <RadioGroup value={value} onValueChange={onChange} className="flex justify-between">
      {[1, 2, 3, 4, 5].map((val) => (
        <div key={val} className="flex flex-col items-center">
          <RadioGroupItem 
            value={val.toString()} 
            id={`${label}-${val}`} 
            className="peer sr-only" 
          />
          <Label
            htmlFor={`${label}-${val}`}
            className="flex flex-col items-center justify-center w-12 h-12 text-xs font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-50"
          >
            {val}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
)

const TextQuestion = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Textarea 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[100px] resize-none"
    />
  </div>
)

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    workload: '3',
    stress: '3',
    motivation: '3',
    tasks: '',
    achievements: '',
    problems: '',
    improvements: '',
    learning: '',
    tomorrow: '',
    comments: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(),
          submitTime: new Date(),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to submit report')
      }
      // Reset form
      setFormData({
        name: '',
        workload: '3',
        stress: '3',
        motivation: '3',
        tasks: '',
        achievements: '',
        problems: '',
        improvements: '',
        learning: '',
        tomorrow: '',
        comments: ''
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">日報入力フォーム</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>名前</Label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <ScaleQuestion 
            label="作業量" 
            value={formData.workload}
            onChange={(value) => setFormData({...formData, workload: value})}
          />
          <ScaleQuestion 
            label="ストレス" 
            value={formData.stress}
            onChange={(value) => setFormData({...formData, stress: value})}
          />
          <ScaleQuestion 
            label="モチベーション" 
            value={formData.motivation}
            onChange={(value) => setFormData({...formData, motivation: value})}
          />

          <TextQuestion 
            label="タスク" 
            value={formData.tasks}
            onChange={(value) => setFormData({...formData, tasks: value})}
          />
          <TextQuestion 
            label="達成したこと" 
            value={formData.achievements}
            onChange={(value) => setFormData({...formData, achievements: value})}
          />
          <TextQuestion 
            label="問題点" 
            value={formData.problems}
            onChange={(value) => setFormData({...formData, problems: value})}
          />
          <TextQuestion 
            label="改善点" 
            value={formData.improvements}
            onChange={(value) => setFormData({...formData, improvements: value})}
          />
          <TextQuestion 
            label="学んだこと" 
            value={formData.learning}
            onChange={(value) => setFormData({...formData, learning: value})}
          />
          <TextQuestion 
            label="明日の予定" 
            value={formData.tomorrow}
            onChange={(value) => setFormData({...formData, tomorrow: value})}
          />
          <TextQuestion 
            label="コメント" 
            value={formData.comments}
            onChange={(value) => setFormData({...formData, comments: value})}
          />

          <Button type="submit" className="w-full">
            送信
          </Button>
        </form>
      </div>
    </div>
  )
}
