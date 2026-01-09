import { EmpleosSinglePage } from "@modules/Empleos/features/single/EmpleosSinglePage";

export default async function SingleEmpleoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <EmpleosSinglePage slug={slug} />
    </>
  );
}
