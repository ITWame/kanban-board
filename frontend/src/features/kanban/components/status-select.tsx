import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Check, User } from "lucide-react";
import { useState } from "react";

interface StatusSelectProps {
  defaultValue: string;
  name: string;
  value: string;
  onValuChange: () => void;
  ariaInvalid: boolean;
}

function StatusSelect({
  value,
  onValuChange,
  name,
  ariaInvalid,
}: StatusSelectProps) {
  const status = [
    { label: "To Do", color: "border-orange-500", value: "to do" },
    { label: "In Progress", color: "border-blue-500", value: "in progress" },
    { label: "Review", color: "border-yellow-500", value: "review" },
    { label: "Done", color: "border-green-500", value: "done" },
  ];

  console.log(value);

  return (
    <Select name={name} value={value} onValueChange={onValuChange}>
      <SelectTrigger aria-invalid={ariaInvalid}>
        <div className="flex items-center gap-1.5">
          {value ? (
            <span
              className={`rounded-full border-2 ${status.filter((item) => item.value === value.toLowerCase())[0].color} w-3 h-3`}
            />
          ) : (
            <Check />
          )}
          <SelectValue placeholder="Status" />
        </div>
      </SelectTrigger>

      <SelectContent className="w-full">
        <SelectGroup>
          {status.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded-full border-2 ${item.color} w-3 h-3`}
                />
                {item.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default StatusSelect;
