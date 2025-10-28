import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedinFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";

const LIST_SOCIAL = [
  {
    social: "indeed",
    icon: (
      <Image
        src="/images/social/indeed-icon.svg"
        alt="indeed-icon"
        width={32}
        height={32}
        className="size-[22px]"
      />
    ),
    href: "https://www.indeed.com/cmp/Caribbean-Temporary-Services,-Llc./about ",
  },
  {
    social: "linkedin",
    icon: <IconBrandLinkedinFilled className="size-[22px]" />,
    href: "https://www.linkedin.com/company/ctspr/?viewAsMember=true",
  },
  {
    social: "facebook",
    icon: <IconBrandFacebook className="size-[22px]" />,
    href: "https://www.facebook.com/CTSEmpleos",
  },
  {
    social: "instagram",
    icon: <IconBrandInstagram className="text-primaryColor size-[22px]" />,
    href: "https://www.instagram.com/ctsempleos/",
  },
  {
    social: "youtube",
    icon: <IconBrandYoutubeFilled className="text-primaryColor size-[22px]" />,
    href: "https://www.youtube.com/@ctsempleos",
  },
];

export const Social = ({ className }: { className?: string }) => {
  return (
    <ul className="flex gap-x-2">
      {LIST_SOCIAL.map((social) => (
        <li key={social.social}>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={`text-primaryColor ${className} rounded-full bg-white shadow-none`}
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {social.icon}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
