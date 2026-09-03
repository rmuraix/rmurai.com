export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "orcid";
  /** Shown next to the label in monospace, terminal-style. */
  handle: string;
}

export const site = {
  name: "Ryota Murai",
  role: "Master's Student in Computer Vision",
  bio: "I work on making visual information legible to machines — sign language recognition, temporal localization, and multimodal fusion — and on turning those results into systems people can actually use.",
  url: "https://rmurai.com",
  description:
    "Ryota Murai — master's student in computer vision. Research on Japanese sign language recognition, temporal localization, and multimodal fusion.",
  zenn: "https://zenn.dev/rmuraix",
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/rmuraix", icon: "github", handle: "rmuraix" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rmurai/", icon: "linkedin", handle: "rmurai" },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0007-0248-9267",
    icon: "orcid",
    handle: "0009-0007-0248-9267",
  },
];

export const sections = [
  { id: "index", label: "index" },
  { id: "publications", label: "publications" },
  { id: "blog", label: "blog" },
] as const;
