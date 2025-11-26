import { SelectItem } from "../../SelectItem";

interface Props {
  items: { id: string; label: string }[];
  checkbox?: boolean;
  center?: boolean;
  value?: string[] | "ALL";
  onChange: (value: string) => void;
}

export function SelectList({
  items,
  checkbox,
  center,
  value,
  onChange,
}: Props) {
  return (
    <div>
      {items.map((item, index) => (
        <SelectItem
          key={index}
          value={value === item.id}
          checkbox={checkbox}
          center={center}
          onToggle={() => onChange(item.id)}
        >
          {item.label}
        </SelectItem>
      ))}
    </div>
  );
}
