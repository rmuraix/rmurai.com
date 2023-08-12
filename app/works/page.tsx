import { getWorksList } from "@/libs/microcms";
import WorksCard from "../components/worksCard";

export default async function Page() {
  const data = await getWorksList({
    limit: 10,
  });
  return (
    <>
      <main className="mx-auto min-h-screen max-w-5xl p-8 sm:p-4">
        {data.contents.map((works) => (
          <WorksCard
            body={""}
            createdAt={""}
            github={""}
            id={works.id}
            key={works.id}
            summary={works.summary}
            title={works.title}
            updatedAt={""}
          />
        ))}
      </main>
    </>
  );
}
