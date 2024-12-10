// 型定義を追加
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

// コンポーネントに型を追加
function ScaleQuestion({ 
  label, 
  value, 
  onChange, 
  icon, 
  lowLabel, 
  midLabel, 
  highLabel 
}: ScaleQuestionProps) {
  // ... 既存のコード ...
}

function TextAreaField({ 
  id, 
  label, 
  placeholder, 
  icon 
}: TextAreaFieldProps) {
  // ... 既存のコード ...
}
// ファイルの最後にデフォルトエクスポートがあるか確認
export default function DailyReportForm() {
  // ...既存のコード...
}
