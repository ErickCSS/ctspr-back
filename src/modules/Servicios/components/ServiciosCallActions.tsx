import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryServiciosCallActions } from "@/modules/shared/graphql/general.query";
import { ServiciosCallActionsProps } from "@/modules/shared/types/generalQuery.types";
import {
  parseContent,
  parsePhoneNumbers,
} from "@/modules/shared/utils/parseContent.utils";

export const ServiciosCallActions = async () => {
  const serviciosCallActions: ServiciosCallActionsProps = await WpQuery({
    query: queryServiciosCallActions,
  });

  const background =
    serviciosCallActions.posts.nodes[0].featuredImage.node.sourceUrl;
  const title = serviciosCallActions.posts.nodes[0].title;
  const content = serviciosCallActions.posts.nodes[0].content;
  const excerpt = serviciosCallActions.posts.nodes[0].excerpt;

  return (
    <section
      className="flex min-h-[800px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-20"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mx-auto max-w-7xl bg-white/80 p-10 lg:p-14">
        <h4 className="text-center text-2xl font-black text-balance text-black lg:text-4xl">
          {title}
        </h4>
        <div className="mt-5 flex flex-col items-center justify-center gap-5 lg:flex-row">
          <div className="text-center text-3xl font-normal text-black lg:text-left">
            {parseContent(excerpt)}
          </div>
          <div className="text-3xl font-normal">
            {parsePhoneNumbers(content, { className: "text-black font-black" })}
          </div>
        </div>
      </div>
    </section>
  );
};
