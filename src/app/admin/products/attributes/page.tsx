import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CreateAttributeDialog from "./_components/CreateAttributeDialog";
import { EditAttributeModal } from "./_components/EditAttributeModal";

interface Attribute {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  displayOrder: number;
}

const mockAttributes: Attribute[] = [
  {
    id: "1",
    name: "Color",
    description: "Product color",
    isRequired: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Size",
    description: "Product size",
    isRequired: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Material",
    description: "Product material",
    isRequired: true,
    displayOrder: 3,
  },
  {
    id: "4",
    name: "Weight",
    description: "Product weight",
    isRequired: true,
    displayOrder: 4,
  },
];

async function getAttributes(): Promise<Attribute[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockAttributes;
}

function AttributesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Attributes</h1>
        <p className="text-muted-foreground">Manage product attributes</p>
      </div>
      <CreateAttributeDialog />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-10 bg-muted rounded mb-4"></div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded"></div>
        ))}
      </div>
    </div>
  );
}

async function AttributesTable() {
  const attributes = await getAttributes();

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
              <EditAttributeModal attribute={attribute}>
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

export default function AttributesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AttributesHeader />
      <Suspense fallback={<TableSkeleton />}>
        <AttributesTable />
      </Suspense>
    </div>
  );
}
