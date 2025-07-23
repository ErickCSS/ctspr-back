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
import { Post } from "@/types/blog.types";
import { format, parseISO } from "date-fns";
import { parseContent } from "@/utils/parseContent.utils";

export const BlogCard = ({ post }: { post: Post }) => {
  const router = useTransitionRouter();

  const parseISODate = parseISO(post?.dateGmt || "");
  const date = format(parseISODate, "dd-MM-yyyy");

  return (
    <Card className="rounded-none border-zinc-100 pt-0">
      <CardHeader className="p-0">
        <Image
          src={
            post?.featuredImage?.node?.sourceUrl ||
            "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp"
          }
          alt={post?.title || "owner"}
          width={500}
          height={500}
          className="h-[300px] w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          quality={50}
        />
      </CardHeader>

      <CardContent className="flex-1">
        <CardTitle className="text-center text-3xl font-bold text-balance">
          {post?.title || "Detén el Contagio COVID-19"}
        </CardTitle>
        <CardDescription className="mt-6 text-center text-balance text-black">
          {parseContent(post?.excerpt || "") || "Card description"}
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-5">
        <div className="text-primaryColor">{date}</div>
        <Button
          className="bg-secondaryColor hover:bg-primaryColor cursor-pointer text-white transition-colors duration-300"
          onClick={() => router.push(`/blog/${post?.slug}`)}
        >
          Leer más
        </Button>
      </CardFooter>
    </Card>
  );
};
