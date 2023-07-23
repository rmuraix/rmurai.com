import Image from "next/image";
import { IconProp, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
config.autoAddCss = false;

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
type sociallink = {
  icon: IconProp;
  link: string;
  name: string;
  username: string;
};
function SocialLink({ icon, link, name, username }: sociallink) {
  return (
    <a
      href={link}
      target="_blank"
      className="m-2 flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 bg-opacity-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <div className="flex items-center space-x-3">
        <div className="h-8">
          <FontAwesomeIcon icon={icon} size="2xl" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">{username}</p>
        </div>
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </a>
  );
}
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-8 sm:p-4">
      <h1 className="mb-8 mt-10 text-2xl font-bold tracking-tighter">
        Hi, I&apos;m rmuraix 👋
      </h1>
      <p>I&apos;m university student and developper from Japan.</p>
      <div className="my-8 flex flex-col sm:flex-row">
        <SocialLink
          icon={faGithub}
          name="GitHub"
          link="https://github.com/rmuraix"
          username="@rmuraix"
        />
        <SocialLink
          icon={faLinkedin}
          name="Linkdin"
          link="https://www.linkedin.com/in/rmurai/"
          username="@rmurai"
        />
      </div>
    </main>
  );
}
