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
  <div className="space-y-4">
    <Label className="text-base font-medium">{label}</Label>
    <RadioGroup value={value} onValueChange={onChange} className="flex gap-4 justify-center">
      {[1, 2, 3, 4, 5].map((val) => (
        <div key={val} className="flex items-center">
          <RadioGroupItem value={val.toString()} id={`${label}-${val}`} className="peer hidden" />
          <Label
            htmlFor={`${label}-${val}`}
            className="w-14 h-14 flex items-center justify-center text-sm border-2 rounded-full cursor-pointer transition-all peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-50"
          >
            {val}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
)

const TextQuestion = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
  <div className="space-y-3">
    <Label className="text-base font-medium">{label}</Label>
    <Textarea 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[120px] resize-none rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      placeholder={`${label}を入力してください`}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">日報入力フォーム</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label className="text-base font-medium">名前</Label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="名前を入力してください"
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

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
            送信する
          </Button>
        </form>
      </div>
    </div>
  )
}
