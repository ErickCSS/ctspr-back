import { Button } from "@components/ui/button";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

export const CallActions = () => {
  return (
    <section className="bg-zinc-100 px-4 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-x-20 gap-y-10 lg:flex-row">
          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-14 !py-10 text-2xl transition-colors duration-300 lg:text-4xl"
            asChild
          >
            <Link href="/empleos" className="flex items-center gap-x-10">
              <span className="font-bold">¿Buscas Empleo? </span>{" "}
              <IconCaretRightFilled size={32} className="size-[32px]" />
            </Link>
          </Button>

          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-14 !py-10 text-2xl transition-colors duration-300 lg:text-4xl"
            asChild
          >
            <Link href="/empleos" className="flex items-center gap-x-10">
              <span className="font-bold">¿Buscas Personal? </span>{" "}
              <IconCaretRightFilled size={32} className="size-[32px]" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
