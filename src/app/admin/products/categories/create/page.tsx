"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, UploadIcon } from "lucide-react";
import { createCategorySchema } from "@/schema/categorySchema";
import api from "@/lib/api";
import { ApiResponse } from "../../../../../lib/api";
import { toast } from "sonner";
import { fileToDataUri } from "@/lib/utils";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      image: undefined,
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        form.setValue("image", file);
        form.setValue("imageDataURI", await fileToDataUri(file));
        setPreviewImage(URL.createObjectURL(file));
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  async function onSubmit(values: z.infer<typeof createCategorySchema>) {
    setIsSubmitting(true);
    console.log(values);

    try {
      const { data }: { data: ApiResponse } = await api.post(
        "/categories/create",
        values
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/admin/products/categories");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsSubmitting(false);
  }

  console.log(form.getValues());

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Create New Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of your category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your category"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      onClick={() => handleClick()}
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-muted-foreground/50"
                    >
                      <input
                        {...getInputProps()}
                        // {...field}
                        ref={fileInputRef}
                      />
                      {isDragActive ? (
                        <div className="text-primary">
                          <UploadIcon className="mx-auto h-12 w-12 mb-2" />
                          <p>Drop the image here ...</p>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">
                          <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                          <p>
                            Drag &apos;n&apos; drop an image here, or click to
                            select one
                          </p>
                        </div>
                      )}
                      {previewImage && (
                        <div className="mt-4">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={200}
                            height={200}
                            objectFit="cover"
                            className="mx-auto rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an image for your category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      This category will be visible on the site.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
