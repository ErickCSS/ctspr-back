"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@modules/ui/card";
import Image from "next/image";
import { Button } from "@modules/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { Post } from "@/modules/shared/types/blog.types";
import { format, parseISO } from "date-fns";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";

export const BlogCard = ({ post }: { post: Post }) => {
  const router = useTransitionRouter();
  const { dateGmt, featuredImage, slug, title, excerpt } = post.node;

  if (!dateGmt || !featuredImage || !slug || !title || !excerpt) {
    return null;
  }

  const parseISODate = parseISO(dateGmt);
  const date = format(parseISODate, "dd-MM-yyyy");

  return (
    <Card className="rounded-none border-zinc-100 pt-0">
      <CardHeader className="p-0">
        <Image
          src={
            featuredImage?.node?.sourceUrl ||
            "https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp"
          }
          alt={title || "owner"}
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
          {title || "Detén el Contagio COVID-19"}
        </CardTitle>
        <CardDescription className="mt-6 text-center text-balance text-black">
          {parseContent(excerpt || "") || "Card description"}
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between gap-5">
        <div className="text-primaryColor">{date}</div>
        <Button
          className="bg-secondaryColor hover:bg-primaryColor cursor-pointer text-white transition-colors duration-300"
          onClick={() => router.push(`/blog/${slug}`)}
        >
          Leer más
        </Button>
      </CardFooter>
    </Card>
  );
};
