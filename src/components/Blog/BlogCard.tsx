"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { useTransitionRouter } from "next-view-transitions";

export const BlogCard = () => {
  const router = useTransitionRouter();

  return (
    <Card className="rounded-none border-zinc-100 pt-0">
      <CardHeader className="p-0">
        <Image
          src="https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp"
          alt="owner"
          width={500}
          height={500}
          className="h-[300px] w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          quality={50}
        />
      </CardHeader>

      <CardContent>
        <CardTitle className="text-center text-3xl font-bold text-balance">
          Detén el Contagio COVID-19
        </CardTitle>
        <CardDescription className="mt-6 text-balance text-black">
          Card description
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-5">
        <div className="text-primaryColor">2025-07-23</div>
        <Button
          className="bg-secondaryColor hover:bg-primaryColor cursor-pointer text-white transition-colors duration-300"
          onClick={() => router.push("/blog/1")}
        >
          Leer más
        </Button>
      </CardFooter>
    </Card>
  );
};
