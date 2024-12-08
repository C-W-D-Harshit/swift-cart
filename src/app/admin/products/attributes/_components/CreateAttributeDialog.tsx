import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import CreateAttributeForm from "./CreateAttributeForm";

export default function CreateAttributeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Attribute
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Attribute
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new attribute to enhance your product catalog. Fill in the
            details below.
          </DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[300px]">
              Loading...
            </div>
          }
        >
          <CreateAttributeForm />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
