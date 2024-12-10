"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Smile, Battery, Zap, CheckCircle, XCircle, Lightbulb, CalendarIcon, MessageCircle } from 'lucide-react'

// 型定義を最初に書く
interface ScaleQuestionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  lowLabel: string;
  midLabel: string;
  highLabel: string;
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}

// メインのコンポーネント
export default function DailyReportForm() {
  const [workload, setWorkload] = useState("3")
  const [stress, setStress] = useState("3")
  const [motivation, setMotivation] = useState("3")

  // ScaleQuestionコンポーネントをここで定義
  const ScaleQuestion = ({ 
    label, 
    value, 
    onChange, 
    icon, 
    lowLabel, 
    midLabel, 
    highLabel 
  }: ScaleQuestionProps) => {
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

  // TextAreaFieldコンポーネントをここで定義
  const TextAreaField = ({ 
    id, 
    label, 
    placeholder, 
    icon 
  }: TextAreaFieldProps) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* 既存のJSXコード */}
    </div>
  )
}
