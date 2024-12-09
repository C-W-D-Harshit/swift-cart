"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface AttributeValue {
  id: string;
  value: string;
}

interface AttributeValuesProps {
  values: AttributeValue[];
  onChange: (values: AttributeValue[]) => void;
}

export function AttributeValues({ values, onChange }: AttributeValuesProps) {
  const [newValue, setNewValue] = useState("");

  const addValue = () => {
    if (newValue.trim()) {
      onChange([
        ...values,
        { id: Date.now().toString(), value: newValue.trim() },
      ]);
      setNewValue("");
    }
  };

  const removeValue = (id: string) => {
    onChange(values.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter a new value"
          className="flex-grow"
        />
        <Button onClick={addValue} type="button">
          Add
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {values.map((value) => (
          <div
            key={value.id}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <span className="truncate">{value.value}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeValue(value.id)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
