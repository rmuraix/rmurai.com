import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siZenn } from "simple-icons";

interface SocialLink {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: any;
  url: string;
  description: string;
  color: string;
  type: string;
}

const socialLinks = [
  {
    name: "GitHub",
    icon: faGithub,
    url: "https://github.com/rmuraix",
    description: "@rmuraix",
    color: "text-gray-800",
    type: "fa",
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    url: "https://linkedin.com/in/rmurai",
    description: "in/rmurai",
    color: "text-blue-800",
    type: "fa",
  },
  {
    name: "Zenn",
    icon: siZenn,
    url: "https://zenn.dev/rmuraix",
    description: "@rmuraix",
    color: "fill-blue-500",
    type: "si",
  },
];

// Components that render appropriately based on icon type
function SocialLinkIcon({ link }: { link: SocialLink }) {
  if (link.type === "si") {
    return (
      <svg className={`w-6 h-6 ${link.color}`}>
        <title>{link.name}</title>
        <path d={link.icon.path} />
      </svg>
    );
  }
  return (
    <FontAwesomeIcon icon={link.icon} className={`w-6 h-6 ${link.color}`} />
  );
}

// Common link card layout
function SocialLinkItem({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="w-full rounded-lg transition-shadow duration-300 p-4 flex items-center space-x-4 group hover:shadow-sm">
        <div className="bg-gray-100 p-3 rounded-full">
          <SocialLinkIcon link={link} />
        </div>
        <div>
          <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">
            {link.name}
          </h3>
          <p className="text-sm">{link.description}</p>
        </div>
      </div>
    </a>
  );
}

export default function SocialLinksCard() {
  return (
    <div className="grid grid-cols-1">
      {socialLinks.map((link) => (
        <SocialLinkItem key={link.name} link={link} />
      ))}
    </div>
  );
}
