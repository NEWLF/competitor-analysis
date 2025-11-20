import { SelectItem } from "../../SelectItem";

interface Props {
  items: { id: string; label: string }[];
  checkbox?: boolean;
  center?: boolean;
  value?: string[] | "ALL";
  onChange: (value: string[] | "ALL") => void;
}

export function SelectList({
  items,
  checkbox,
  center,
  value,
  onChange,
}: Props) {
  // ALL 항목이 있는지 확인
  const hasAllOption = items.some(item => item.id === "ALL");
  // ALL을 제외한 실제 항목 수
  const actualItemCount = hasAllOption ? items.length - 1 : items.length;
  
  const handleToggle = (id: string) => {
    if (id === "ALL") {
      // ALL 클릭 시 처리
      if (value === "ALL") {
        // ALL이 이미 선택되어 있으면 모두 해제
        onChange([]);
      } else {
        // ALL이 선택되어 있지 않으면 ALL만 선택
        onChange("ALL");
      }
      return;
    }

    // 일반 항목 클릭 시 처리
    if (value === "ALL") {
      // ALL이 선택된 상태에서 일반 항목 클릭 시 해당 항목만 선택
      onChange([id]);
    } else {
      // 일반 선택 상태 관리
      const nextValue = Array.isArray(value) && value.includes(id)
        ? value.filter(i => i !== id) // 이미 선택된 항목이면 제거
        : [...(Array.isArray(value) ? value : []), id]; // 선택되지 않은 항목이면 추가

      // 선택된 항목이 ALL을 제외한 모든 항목과 같으면 ALL로 변경
      // 여기서 actualItemCount와 비교
      if (nextValue.length === actualItemCount) {
        onChange("ALL");
      } else {
        onChange(nextValue);
      }
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <SelectItem
          key={index}
          value={
            value === "ALL" 
              ? item.id === "ALL" 
              : Array.isArray(value) && value.includes(item.id)
          }
          onToggle={() => handleToggle(item.id)}
          checkbox={checkbox}
          center={center}
        >
          {item.label}
        </SelectItem>
      ))}
    </div>
  );
}

interface SingleSelectProps {
  items: { id: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

export function SingleSelectList({
  items,
  value,
  onChange,
}: SingleSelectProps) {
  return (
    <div>
      {items.map((item) => (
        <SelectItem
          radio
          value={value === item.id}
          onToggle={() => onChange(item.id)}
        >
          {item.label}
        </SelectItem>
      ))}
    </div>
  );
}
