import Image from "next/image";
import { IconProp, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { languagesFrameworks } from "@/libs/skills";
import warehouse from "public/images/warehouse.jpg";
import eno from "public/images/eno.jpg";
import film from "public/images/film.jpg";
import ArrowIcon from "./components/icon/arrow";

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
      <p>I&apos;m university student and developer from Japan.</p>
      <div className="my-8 columns-2 gap-4">
        <div className="relative mb-4 h-fit">
          <Image
            alt="photos"
            src={warehouse}
            placeholder="blur"
            priority={true}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative mb-4 h-fit sm:mb-12">
          <Image
            alt="photos"
            src={eno}
            placeholder="blur"
            priority={true}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative mb-4 h-fit">
          <Image
            alt="photos"
            src={film}
            placeholder="blur"
            priority={true}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="my-8 flex flex-col sm:flex-row">
        <SocialLink
          icon={faGithub}
          name="GitHub"
          link="https://github.com/rmuraix"
          username="@rmuraix"
        />
        <SocialLink
          icon={faLinkedin}
          name="Linkedin"
          link="https://www.linkedin.com/in/rmurai/"
          username="@rmurai"
        />
      </div>
      <h2 className="mb-4 text-xl font-bold tracking-tighter">Skills</h2>
      <p>
        I am not claiming to be a master in all of these skills, that would be
        amazing, but it is simply not true.
      </p>
      <h3 className="mt-4 text-xl tracking-tighter">Languages / Frameworks</h3>
      <div className="my-2 flex flex-row flex-wrap">
        {languagesFrameworks.map((name, index) => {
          return (
            <>
              <div
                key={index}
                className="m-1 flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 bg-opacity-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
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
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.credly.com/badges/c695749d-2518-40bb-94c6-e57d717e0d78/public_url"
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
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.credly.com/badges/3ebacfb9-149f-4dfc-ad6a-bbd53720581e/public_url"
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
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.openbadge-global.com/ns/portal/openbadge/public/assertions/detail/UjdOOTJ4TmxwUE1neTBJb0ovQm9FZz09"
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
