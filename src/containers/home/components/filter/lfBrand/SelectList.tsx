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
  const hasAllOption = items.some(item => item.id === "ALL");


  return (
    <div>
      {items.map((item, index) => (
        <SelectItem
          key={index}
          value={value === "ALL" ? item.id === "ALL" : Array.isArray(value) && value.includes(item.id)}
          checkbox={checkbox}
          center={center}
        >
          {item.label}
        </SelectItem>
      ))}
    </div>
  );
}
