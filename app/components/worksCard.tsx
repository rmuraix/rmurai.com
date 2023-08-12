import Link from "next/link";
import { Article } from "@/libs/microcms";

export default function WorksCard({ id, title, summary }: Article) {
  return (
    <>
      <div>
        <Link href={`/works/${id}`} className="block p-6">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {summary}
          </p>
        </Link>
      </div>
    </>
  );
}
