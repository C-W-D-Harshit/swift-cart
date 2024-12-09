"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { attributesSchema } from "@/schema/attributesSchema";
import api, { ApiResponse } from "@/lib/api";
import { toast } from "sonner";
import { AttributeValues } from "./AttributeValue";

export default function CreateAttributeForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof attributesSchema>>({
    resolver: zodResolver(attributesSchema),
    defaultValues: {
      name: "",
      description: "",
      isRequired: false,
      displayOrder: 0,
      values: [],
    },
  });

  async function onSubmit(values: z.infer<typeof attributesSchema>) {
    setIsLoading(true);
    const toastId = toast.loading("Creating attribute...");
    try {
      const { data }: { data: ApiResponse } = await api.post(
        "/attributes",
        values
      );
      if (data.success) {
        toast.success("Attribute created successfully", { id: toastId });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create attribute", { id: toastId });
    }
    setIsLoading(false);
    // Refresh the current route
    router.refresh();
    // Close the modal (you might need to implement this logic in the parent component)
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Color, Size" {...field} />
                </FormControl>
                <FormDescription>The name of the attribute.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select display order" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[0, 10, 20, 30, 40, 50].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}{" "}
                        {value === 0
                          ? "(Highest Priority)"
                          : value === 50
                          ? "(Lowest Priority)"
                          : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Lower numbers will be displayed first.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the attribute..."
                  {...field}
                  className="resize-none"
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                A brief description of the attribute (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Required Attribute</FormLabel>
                <FormDescription>
                  Make this a required attribute for all products
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
        <FormField
          control={form.control}
          name="values"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attribute Values</FormLabel>
              <FormControl>
                <AttributeValues
                  values={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Add possible values for this attribute.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Create Attribute
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
