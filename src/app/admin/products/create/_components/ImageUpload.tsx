"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          onChange([...(value || []), reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 4,
    onDrop,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product image"
              src={url}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          {...getRootProps()}
          className="relative aspect-square w-full rounded-lg border-2 border-dashed border-muted hover:border-muted-foreground transition-colors"
        >
          <input {...getInputProps()} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          {value.length === 0 && (
            <span className="mt-2 text-sm text-muted-foreground">
              Add More Image
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
