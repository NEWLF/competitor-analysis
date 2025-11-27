import { SelectItem } from "../../SelectItem";

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
