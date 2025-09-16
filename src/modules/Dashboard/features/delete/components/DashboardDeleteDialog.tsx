"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@modules/ui/alert-dialog";
import { Button } from "@modules/ui/button";
import { IconFileX } from "@tabler/icons-react";

import { createDelayedPromise } from "@modules/shared/utils/index";
import toast from "react-hot-toast";
import { deleteEmployeeAction } from "@modules/Dashboard/features/delete/actions/deleteEmployee.actions";

export const EmployeeDeleteAlert = ({ employeeId }: { employeeId: number }) => {
  const handleDeleteEmployee = async () => {
    const employeeResponse = await deleteEmployeeAction({ employeeId });

    if (!employeeResponse) {
      toast.error("Employee deleted failed");
    } else {
      await createDelayedPromise(2000);
      toast.success("Employee deleted successfully");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="group flex w-full cursor-pointer items-center justify-start gap-2 border border-transparent bg-transparent px-2 py-1.5 font-medium text-black shadow-none hover:border hover:!border-red-600/80 hover:!bg-red-600/20 hover:!text-red-600 hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
          <IconFileX stroke={1.5} className="group-hover:!text-red-600" />
          Borrar Empleo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            employee and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteEmployee}
            className="cursor-pointer bg-red-600 hover:bg-red-700"
          >
            Delete Employee
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
