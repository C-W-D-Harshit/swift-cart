"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditAttributeModal } from "./EditAttributeModal";
import { Prisma } from "@prisma/client";

type AttributeWithValues = Prisma.AttributeGetPayload<{
  include: {
    values: true;
  };
}>;

export default function AttributesTable({
  attributes,
}: {
  attributes: AttributeWithValues[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attributes.map((attribute) => (
          <TableRow key={attribute.id}>
            <TableCell>{attribute.name}</TableCell>
            <TableCell>{attribute.description}</TableCell>
            <TableCell className="text-right">
              <EditAttributeModal
                attribute={{
                  ...attribute,
                  description: attribute.description || "",
                }}
              >
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
              </EditAttributeModal>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
