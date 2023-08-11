import { getWorksList } from "@/libs/microcms";
import Link from "next/link";

export default async function Page() {
  const data = await getWorksList({
    limit: 10,
  });
  return (
    <>
      <div className="mx-auto max-w-5xl p-8 sm:p-4">
        <ul>
          {data.contents.map((works) => (
            <li key={works.id}>
              <Link href={`/works/${works.id}`}>{works.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
