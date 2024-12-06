"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AttributeManager } from "./AttributeManager";
import { ImageUpload } from "./ImageUpload";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  images: z.array(z.string()).min(1, "At least one product image is required"),
  basePrice: z.number().min(0.01, "Price must be greater than 0"),
  discountPercentage: z.number().min(0).max(100).optional(),
  discountType: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  variationType: z.string().optional(),
  skuVariation: z.string().optional(),
  attributes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
    })
  ),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultValues: Partial<ProductFormValues> = {
  images: [],
  basePrice: 118.89,
  discountPercentage: 25,
  quantity: 0,
  tags: ["iot"],
  category: "electronics",
  attributes: [],
};

export function CreateProductForm() {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  function onSubmit(data: ProductFormValues) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-4">
                  General Information
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Xiaomi Watch 2 Pro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Xiaomi Watch 2 Pro supports 19 professional fitness modes such as for basketball, tennis, swimming, and HIIT, and also for nearly 100 additional fitness modes. Accurately monitor and analyze important data, such as heart rate, average pace, and calories burned, for more efficient exercise. Waterproof 5 ATM* Suitable for swimming."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Attributes</h2>
                <FormField
                  control={methods.control}
                  name="attributes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Product Attributes
                      </FormLabel>
                      <FormControl>
                        <AttributeManager
                          attributes={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Pricing</h2>
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Base Price
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              step="0.01"
                              className="pl-6"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={methods.control}
                      name="discountPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-muted-foreground">
                            Discount Percentage (%)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-muted-foreground">
                            Discount Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a discount type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">
                                Percentage
                              </SelectItem>
                              <SelectItem value="fixed">
                                Fixed Amount
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Inventory</h2>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={methods.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          SKU
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="113902" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Barcode
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="0524289012" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Type product quantity"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Variation</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={methods.control}
                    name="variationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Variation Type
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="skuVariation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          SKU Variation
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-4">Product Media</h2>
                <FormField
                  control={methods.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={(url) =>
                            field.onChange(
                              field.value.filter((val) => val !== url)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Category</h2>
                <FormField
                  control={methods.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Product Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="books">
                            Books & Stationeries
                          </SelectItem>
                          <SelectItem value="toys">Toys</SelectItem>
                          <SelectItem value="art">Art Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-8">
                  <FormLabel className="text-sm text-muted-foreground">
                    Product Tags
                  </FormLabel>
                  <FormField
                    control={methods.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              const currentTags = new Set(field.value);
                              if (currentTags.has(value)) {
                                currentTags.delete(value);
                              } else {
                                currentTags.add(value);
                              }
                              field.onChange(Array.from(currentTags));
                            }}
                            className="space-y-2"
                          >
                            {["clothing", "toys", "iot", "books", "art"].map(
                              (tag) => (
                                <FormItem
                                  key={tag}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={tag} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {tag === "iot"
                                      ? "Internet Of Things"
                                      : tag.charAt(0).toUpperCase() +
                                        tag.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg">
              Create Product
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
