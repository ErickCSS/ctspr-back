"use client";

import { Link } from "next-view-transitions";
import { Social } from "@/modules/shared/components/Social";
import { IconMailFilled, IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { NAV_CONFIG } from "@/config/nav.config";
import { Button } from "@modules/ui/button";
import { useState } from "react";
import { cn } from "@/modules/shared/lib/utils";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex w-full flex-col overflow-hidden border-b border-zinc-200">
      <div className="bg-primaryColor flex w-full justify-end gap-x-8 px-10 py-3">
        <Button
          asChild
          className="hover:bg-secondaryColor rounded-3xl bg-white px-10 text-black transition-colors duration-300 hover:text-white"
        >
          <Link href="/login-employee">Login</Link>
        </Button>
        <Social className="size-8" />
        <Link
          href="mailto:sales@ctspr.com"
          className="flex items-center gap-x-2 text-white"
        >
          <IconMailFilled size={18} />
          <span className="font-bold">sales@ctspr.com</span>
        </Link>
      </div>

      <div className="container mx-auto">
        <div className="flex w-full flex-row items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-x-2 text-white">
            <Image
              src="https://blog.ctspr.com/wp-content/uploads/2025/09/logo-ctspr-color.webp"
              alt="logo"
              width={330}
              height={330}
              className="h-auto w-[250px] xl:w-[330px]"
            />
          </Link>

          <div className="flex flex-col">
            <Button
              onClick={() => setOpen(!open)}
              name="menu"
              className="bg-primaryColor size-[42px] text-white lg:hidden"
            >
              <IconMenu2 className="size-[24px]" />
            </Button>
            <div
              className={cn(
                "fixed top-0 left-0 z-50 flex h-dvh w-full flex-col items-center justify-center bg-zinc-100 lg:static lg:h-full lg:bg-white",
                open
                  ? "translate-x-0 transition-transform duration-300"
                  : "-translate-x-full transition-transform duration-300 lg:translate-x-0",
              )}
            >
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                size="icon"
                name="close"
                className="absolute top-4 right-4 lg:hidden"
              >
                <IconX />
              </Button>
              <div className="mb-10 block lg:hidden">
                <Image
                  src="https://blog.ctspr.com/wp-content/uploads/2025/07/cts-brand.webp"
                  alt="logo"
                  width={250}
                  height={250}
                  className="h-auto w-[250px] xl:w-[250px]"
                />
              </div>
              <nav className="flex flex-col items-center gap-x-8 gap-y-5 lg:flex-row">
                {NAV_CONFIG.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-2xl text-black lg:text-lg",
                      isActive(item.href)
                        ? "text-secondaryColor font-bold"
                        : "",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
