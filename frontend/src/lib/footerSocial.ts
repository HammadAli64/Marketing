import { SOCIAL_LINKS } from "@/lib/constants";

/** Platforms with SVG icons in `Footer`. */
export type SocialPlatform =
  | "linkedin"
  | "x"
  | "facebook"
  | "github"
  | "instagram"
  | "whatsapp"
  | "youtube"
  | "tiktok"
  | "website";

export type FooterSocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

/** Footer social links from `NEXT_PUBLIC_SOCIAL_*` env (see `constants.ts`). No API call. */
export function getFooterSocialLinks(): FooterSocialLink[] {
  return SOCIAL_LINKS.map((s) => ({
    id: s.id as SocialPlatform,
    label: s.label,
    href: s.href,
  }));
}
