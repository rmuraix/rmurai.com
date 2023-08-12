import Link from "next/link";

type WorksCard = {
  id: string;
  title: string;
};

export default function WorksCard({ id, title }: WorksCard) {
  return (
    <>
      <div>
        <Link href={`/works/${id}`} className="block p-6">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Link>
      </div>
    </>
  );
}
