import { Card, CardContent, CardHeader } from "@modules/ui/card";
import Image from "next/image";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryMedia } from "@/modules/shared/graphql/general.query";
import { MediaProps } from "@/modules/shared/types/generalQuery.types";
import { LoginForm } from "./components/LoginForm";

export const LoginPage = async () => {
  const logo: MediaProps = await WpQuery({
    query: queryMedia({ title: "logo-ctspr-color" }),
  });

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-xl">
        <Card className="border-zinc-200 shadow-none">
          <CardHeader className="text-center">
            <Image
              src={logo.mediaItems.nodes[0].link}
              alt="logo"
              width={200}
              height={200}
              className="mx-auto h-auto w-[200px]"
              loading="lazy"
              decoding="async"
              quality={80}
            />
            <div className="flex flex-col gap-y-2">
              <h2 className="font-lato text-3xl font-black capitalize">
                Welcome Back!
              </h2>
              <h3 className="font-lato text-base font-normal text-balance text-zinc-500">
                Enter your credentials to access your account
              </h3>
            </div>
          </CardHeader>
          <CardContent className="flex items-center gap-x-5">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
