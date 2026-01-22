import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
} from "@modules/ui/sidebar";
import Image from "next/image";
import { WpQuery } from "@/modules/shared/services/wpQuery";
import { queryMedia } from "@/modules/shared/graphql/general.query";
import { MediaProps } from "@/modules/shared/types/generalQuery.types";

import { DashboardSideButtonFilter } from "./DashboardSideButtonFilter";
import { DashboardAdvancedFilters } from "./DashboardAdvancedFilters";

export const DashboardSidebar = async () => {
  const logo: MediaProps = await WpQuery({
    query: queryMedia({ title: "cts-brand" }),
  });

  const SUCURSAL = ["Barceloneta", "Santurce", "Las Piedras", "San Germán"];

  return (
    <Sidebar>
      <SidebarHeader>
        <Image
          src={logo.mediaItems.nodes[0].link}
          alt="logo"
          width={200}
          height={200}
          className="h-auto w-[200px]"
          loading="lazy"
          decoding="async"
          quality={80}
        />
      </SidebarHeader>

      <SidebarContent>
        {/* === Sucursales === */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Sucursales</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2 flex flex-wrap items-center gap-1">
            {SUCURSAL.map((sucursal, index) => (
              <SidebarMenuItem key={index} className="list-none">
                <DashboardSideButtonFilter sucursal={sucursal} />
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <DashboardAdvancedFilters />
      </SidebarContent>
    </Sidebar>
  );
};
