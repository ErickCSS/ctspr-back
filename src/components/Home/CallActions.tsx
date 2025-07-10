import { Button } from "@components/ui/button";
import { IconCaretRightFilled } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

export const CallActions = () => {
  return (
    <section className="bg-zinc-100 px-4 py-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-20">
          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-14 !py-10 text-4xl transition-colors duration-300"
            asChild
          >
            <Link href="/empleos" className="flex items-center gap-x-10">
              <span className="font-bold">¿Buscas Empleo? </span>{" "}
              <IconCaretRightFilled size={32} className="size-[32px]" />
            </Link>
          </Button>

          <Button
            className="bg-primaryColor hover:bg-secondaryColor min-h-[60px] !px-14 !py-10 text-4xl transition-colors duration-300"
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
