"use client";

import * as React from "react";

import { cn } from "@modules/shared/lib/utils";
import { useMediaQuery } from "@modules/shared/hooks/useMediaQuery.hooks";
import { Button } from "@modules/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@modules/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@modules/ui/drawer";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { EmpleoFilterAdvanced } from "./EmpleoFilterAdvanced";
import { useDialogStore } from "@modules/Empleos/store/DialogStore";

export function EmpleoDrawerDialog() {
  const { open, setOpen } = useDialogStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer shadow-none hover:border-black"
          >
            <IconAdjustmentsHorizontal /> Filtros
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-[525px]">
          <DialogHeader className="border-b border-zinc-300 px-4 py-6">
            <DialogTitle className="text-center">Filtros</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <EmpleoFilterAdvanced />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer shadow-none hover:border-black"
        >
          <IconAdjustmentsHorizontal /> Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b border-zinc-300 px-4 py-6">
          <DrawerTitle className="text-center">Filtros</DrawerTitle>
        </DrawerHeader>
        <div className="p-5">
          <EmpleoFilterAdvanced />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
