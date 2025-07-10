import Link from "next/link";
import { Social } from "@components/shared/Social";
import { IconMailFilled } from "@tabler/icons-react";
import Image from "next/image";
import { NAV_CONFIG } from "@/config/nav.config";

export const Header = () => {
  return (
    <header className="flex w-full flex-col">
      <div className="bg-primaryColor flex w-full justify-end gap-x-8 px-10 py-3">
        <Social className="size-8" />
        <Link href="/" className="flex items-center gap-x-2 text-white">
          <IconMailFilled size={18} />
          <span className="font-bold">sales@ctspr.com</span>
        </Link>
      </div>

      <div className="container mx-auto">
        <div className="flex w-full items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-x-2 text-white">
            <Image
              src="https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/cts-brand.webp"
              alt="logo"
              width={250}
              height={250}
              className="h-auto w-[150px] xl:h-auto xl:w-[250px]"
            />
          </Link>

          <nav className="flex gap-x-8">
            {NAV_CONFIG.map((item) => (
              <Link key={item.name} href={item.href} className="text-black">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
