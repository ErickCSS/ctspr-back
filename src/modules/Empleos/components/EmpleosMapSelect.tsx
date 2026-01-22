import { WpQuery } from "@/modules/shared/services/wpQuery";
import {
  queryEmpleosTitle,
  queryEmpleos,
  queryMedia,
} from "@/modules/shared/graphql/general.query";
import {
  EmpleosProps,
  MediaProps,
} from "@/modules/shared/types/generalQuery.types";
import { parseContent } from "@/modules/shared/utils/parseContent.utils";
import { Button } from "@modules/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";

export const EmpleosMapSelect = async () => {
  const empleosTitle: EmpleosProps = await WpQuery({
    query: queryEmpleosTitle,
  });

  const empleos: EmpleosProps = await WpQuery({
    query: queryEmpleos,
  });

  const mapa: MediaProps = await WpQuery({
    query: queryMedia({ title: "mapa-sucursales-cts" }),
  });

  const title = empleosTitle.posts.nodes[0].title;
  const content = empleosTitle.posts.nodes[0].content;

  const foundEmpleos = empleos.posts.nodes[0].title;
  const foundEmpleosContent = empleos.posts.nodes[0].content;

  const mapaImage = mapa.mediaItems.nodes[0].link;

  return (
    <section className="bg-white px-4 py-28">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-y-8 text-center">
          <h2 className="text-4xl font-bold xl:text-5xl">{title}</h2>
          <hr className="border-secondaryColor my-3 w-[120px] border-2 outline-none" />
        </div>

        {/* <div className="mx-auto mt-10 max-w-5xl bg-zinc-100 p-10">
          <div className="grid grid-cols-1 items-center gap-x-10 gap-y-10 lg:grid-cols-2">
            <div className="flex flex-col gap-y-2">
<<<<<<< HEAD:src/components/Empleos/EmpleosMapSelect.tsx
              <h3 className="text-center text-3xl font-bold text-pretty md:text-4xl lg:text-left">
=======
              <h3 className="text-center text-3xl font-bold md:text-4xl lg:text-left">
>>>>>>> fase2-developer:src/modules/Empleos/components/EmpleosMapSelect.tsx
                {foundEmpleos}
              </h3>
              <div className="text-center text-lg text-balance md:text-xl lg:text-left">
                {parseContent(foundEmpleosContent)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                "Barceloneta",
                "Santurce",
                "Las Piedras",
                "San Germán",
                "Salinas",
              ].map((item) => (
                <Button
                  key={item}
                  asChild
                  className="bg-secondaryColor h-12 text-lg text-white transition-colors duration-300 hover:bg-pink-700"
                >
                  <Link
<<<<<<< HEAD:src/components/Empleos/EmpleosMapSelect.tsx
                    href={`https://empleos.ctspr.com/jobs/index.php?q=${item === "Salinas" ? "LasPiedras" : item === "San Germán" ? "SanGerman" : item.charAt(0).toUpperCase() + item.slice(1).replace(" ", "")}`}
=======
                    href={`/empleos?q=${item === "San Germán" ? "San-German" : item.charAt(0).toUpperCase() + item.slice(1).replace(" ", "-")}`}
>>>>>>> fase2-developer:src/modules/Empleos/components/EmpleosMapSelect.tsx
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {item}
                  </Link>
                </Button>
              ))}
              <Button
                asChild
                className="bg-secondaryColor h-12 text-lg text-white transition-colors duration-300 hover:bg-pink-700"
              >
                <Link
                  href="/empleos"
                  target="_self"
                  rel="noopener noreferrer nofollow"
                >
                  Ver todos los empleos
                </Link>
              </Button>
            </div>
          </div>
        </div> */}

        <div className="mt-10">
          <Image
            src={mapaImage}
            alt="Mapa"
            width={1000}
            height={1000}
            className="mx-auto h-auto w-[1200px]"
          />
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <div className="bg-primaryColor flex flex-col items-center gap-5 rounded-xl p-14">
            <div className="text-center text-white [&>h3]:text-4xl [&>h3]:font-black">
              {parseContent(content)}
            </div>

            <Button
              asChild
              className="bg-secondaryColor min-h-[50px] w-[250px] text-xl text-white transition-colors duration-300 hover:bg-pink-700"
            >
              <Link href="/contacto">Más Información</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
