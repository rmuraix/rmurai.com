import { type Article } from "@/libs/microcms";
import { formatRichText } from "@/libs/utils";

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  return (
    <>
      <h1 className="mt-10 mb-8 text-2xl font-bold tracking-tighter">
        {data.title}
      </h1>
      <p className="mb-10">{data.summary}</p>
      <div
        className="mb-10"
        dangerouslySetInnerHTML={{
          __html: `${formatRichText(data.body)}`,
        }}
      />
    </>
  );
}
