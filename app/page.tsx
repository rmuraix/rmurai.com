import { IconProp, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import eno from "/public/images/eno.jpg";
import film from "/public/images/film.jpg";
import warehouse from "/public/images/warehouse.jpg";
import ArrowIcon from "./components/icon/arrow";
import { languagesFrameworks } from "@/libs/skills";

config.autoAddCss = false;

type sociallink = {
  icon: IconProp;
  link: string;
  name: string;
  username: string;
};
function SocialLink({ icon, link, name, username }: sociallink) {
  return (
    <a
      className="m-2 flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 bg-opacity-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      href={link}
      target="_blank"
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
    <main className="mx-auto min-h-screen max-w-5xl p-8 sm:p-4">
      <h1 className="mb-8 mt-10 text-2xl font-bold tracking-tighter">
        Hi, I&apos;m rmuraix 👋
      </h1>
      <p>I&apos;m university student and developer from Japan.</p>
      <div className="my-8 columns-2 gap-4">
        <div className="relative mb-4 h-fit">
          <Image
            alt="photos"
            className="rounded-lg object-cover"
            placeholder="blur"
            priority={true}
            src={warehouse}
          />
        </div>
        <div className="relative mb-4 h-fit sm:mb-12">
          <Image
            alt="photos"
            className="rounded-lg object-cover"
            placeholder="blur"
            priority={true}
            src={eno}
          />
        </div>
        <div className="relative mb-4 h-fit">
          <Image
            alt="photos"
            className="rounded-lg object-cover"
            placeholder="blur"
            priority={true}
            src={film}
          />
        </div>
      </div>
      <div className="my-8 flex flex-col sm:flex-row">
        <SocialLink
          icon={faGithub}
          link="https://github.com/rmuraix"
          name="GitHub"
          username="@rmuraix"
        />
        <SocialLink
          icon={faLinkedin}
          link="https://www.linkedin.com/in/rmurai/"
          name="Linkedin"
          username="@rmurai"
        />
      </div>
      <h2 className="mb-4 text-xl font-bold tracking-tighter">Skills</h2>
      <p>
        I am not claiming to be a master in all of these skills, that would be
        amazing, but it is simply not true.
      </p>
      <h3 className="mt-4 text-lg tracking-tighter">Languages / Frameworks</h3>
      <div className="my-2 flex flex-row flex-wrap">
        {languagesFrameworks.map((name, index) => {
          return (
            <>
              <div
                className="m-1 flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 bg-opacity-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
                key={index}
              >
                <p>{name}</p>
              </div>
            </>
          );
        })}
      </div>
      <h2 className="my-8 text-xl font-bold tracking-tighter">
        Qualifications
      </h2>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="https://www.credly.com/badges/c695749d-2518-40bb-94c6-e57d717e0d78/public_url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="mr-2 h-14 sm:h-7">
              AZ-900 Microsoft Azure Fundamentals (June 2023)
            </p>
            <ArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="https://www.credly.com/badges/3ebacfb9-149f-4dfc-ad6a-bbd53720581e/public_url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="mr-2 h-14 tracking-tighter sm:h-7">
              SC-900 Microsoft Security, Compliance, and Identity Fundamentals
              (June 2023)
            </p>
            <ArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="https://www.openbadge-global.com/ns/portal/openbadge/public/assertions/detail/UjdOOTJ4TmxwUE1neTBJb0ovQm9FZz09"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p className="mr-2 h-14 sm:h-7">
              JDLA Deep Learning for GENERAL (March 2023)
            </p>
            <ArrowIcon />
          </a>
        </li>
        <li>
          <p className="mr-2 h-14 sm:h-7">
            Fundamental Information Technology Engineer Examination (June 2023)
          </p>
        </li>
      </ul>
    </main>
  );
}
