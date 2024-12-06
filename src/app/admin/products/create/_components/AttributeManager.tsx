"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface Attribute {
  id: string;
  name: string;
  value: string;
}

interface AttributeManagerProps {
  attributes: Attribute[];
  onChange: (attributes: Attribute[]) => void;
}

export function AttributeManager({
  attributes,
  onChange,
}: AttributeManagerProps) {
  const [newAttribute, setNewAttribute] = useState({ name: "", value: "" });

  const addAttribute = () => {
    if (newAttribute.name && newAttribute.value) {
      onChange([...attributes, { ...newAttribute, id: Date.now().toString() }]);
      setNewAttribute({ name: "", value: "" });
    }
  };

  const removeAttribute = (id: any) => {
    onChange(attributes.filter((attr: { id: any }) => attr.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="attrName">Attribute Name</Label>
          <Input
            id="attrName"
            value={newAttribute.name}
            onChange={(e) =>
              setNewAttribute({ ...newAttribute, name: e.target.value })
            }
            placeholder="e.g., Color"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="attrValue">Attribute Value</Label>
          <Input
            id="attrValue"
            value={newAttribute.value}
            onChange={(e) =>
              setNewAttribute({ ...newAttribute, value: e.target.value })
            }
            placeholder="e.g., Red"
          />
        </div>
        <Button type="button" onClick={addAttribute} className="mt-auto">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {attributes.map(
        (attr: {
          id: Key | null | undefined;
          name:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
          value:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<AwaitedReactNode>
            | null
            | undefined;
        }) => (
          <div key={attr.id} className="flex items-center gap-2">
            <span className="flex-1">
              {attr.name}: {attr.value}
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeAttribute(attr.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      )}
    </div>
  );
}
