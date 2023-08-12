import { Metadata } from "next";
import { getWorksDetail } from "@/libs/microcms";
import Article from "@/app/components/article";
import PrimaryButton from "@/app/components/button/primary";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getWorksDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.summary,
    openGraph: {
      title: data.title,
      description: data.summary,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getWorksDetail(params.slug, {
    draftKey: searchParams.dk,
  });
  return (
    <>
      <main className="mx-auto max-w-5xl p-8 sm:p-4">
        <Article data={data} />
        <Link href={data.github} target="_blank">
          <PrimaryButton name={"View Repo"} />
        </Link>
      </main>
    </>
  );
}
