export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <>
      <section
        style={{
          backgroundImage: `url("https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/img-transformacion.webp")`,
          boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.5)",
        }}
        className="h-[250px] bg-cover bg-center bg-no-repeat md:h-[400px]"
      >
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center">
            <h1 className="text-4xl font-bold text-white lg:text-6xl">{id}</h1>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-y-10">
            {/* {parseContent()} */}
          </div>
        </div>
      </section>
    </>
  );
}
