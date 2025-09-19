import { IconCpu } from "@tabler/icons-react";
import { JSX } from "react";

interface MapHeroIcons {
  [key: string]: JSX.Element;
}

export const MapHeroIcons: MapHeroIcons = {
  tecnología: <IconCpu stroke={1.5} size={50} className="text-white" />,
};
