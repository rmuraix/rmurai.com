import { Metadata } from "next";
import Link from "next/link";
import Article from "@/app/components/article";
import PrimaryButton from "@/app/components/button/primary";
import { getWorksDetail, getWorksList } from "@/libs/microcms";

export async function generateStaticParams() {
  const data = await getWorksList();
  return data.contents.map((data) => ({
    slug: data.id,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getWorksDetail(params.slug);
  return (
    <>
      <main className="mx-auto min-h-screen max-w-5xl p-8 sm:p-4">
        <Article data={data} />
        <Link href={data.github} target="_blank">
          <PrimaryButton name={"View Repo"} />
        </Link>
      </main>
    </>
  );
}
