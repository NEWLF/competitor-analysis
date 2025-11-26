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
  const actualItemCount = hasAllOption ? items.length - 1 : items.length;
  
  const handleToggle = (id: string) => {
    if (id === "ALL") {
      if (value === "ALL") {
        onChange([]);
      } else {
        onChange("ALL");
      }
      return;
    }

    if (value === "ALL") {
      onChange([id]);
    } else {
      const nextValue = Array.isArray(value) && value.includes(id) ? value.filter(i => i !== id) : [...(Array.isArray(value) ? value : []), id];

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
          value={value === "ALL" ? item.id === "ALL" : Array.isArray(value) && value.includes(item.id)}
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
