import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

interface PrioritySelectProps {
  name: string;
  value: string;
  onValuChange: () => void;
  ariaInvalid: boolean;
}

function PrioritySelect({
  name,
  value,
  onValuChange,
  ariaInvalid,
}: PrioritySelectProps) {
  const items = [
    { label: "High", color: "text-red-500", value: "High" },
    { label: "Medium", color: "text-yellow-500", value: "Medium" },
    { label: "Low", color: "text-green-500", value: "Low" },
  ];

  const color = value && items.filter((item) => item.value === value)[0].color;

  return (
    <Select name={name} value={value} onValueChange={onValuChange}>
      <SelectTrigger id="form-priority" aria-invalid={ariaInvalid}>
        <div className="flex items-center gap-1.5">
          {value ? (
            <div className={`${color} hover:${color}`}>
              <ChartNoAxesColumnIncreasing />
            </div>
          ) : (
            <ChartNoAxesColumnIncreasing />
          )}
          <SelectValue placeholder="Priority" />
        </div>
      </SelectTrigger>

      <SelectContent className="w-full">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-1.5">
                <div className={`${item.color} focus:${item.color}!`}>
                  <ChartNoAxesColumnIncreasing />
                </div>
                {item.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default PrioritySelect;
