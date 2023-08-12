import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSDate,
  MicroCMSContentId,
} from "microcms-js-sdk";
import { notFound } from "next/navigation";

export type Works = {
  title: string;
  summary: string;
  body: string;
};

export type Article = Works & MicroCMSContentId & MicroCMSDate;

// Check env
if (!process.env.SERVICE_DOMAIN) {
  throw new Error("SERVICE_DOMAIN is required");
}
if (!process.env.API_KEY) {
  throw new Error("API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
});

export const getWorksList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Works>({
      endpoint: "works",
      queries,
    })
    .catch(notFound);
  return listData;
};
export const getWorksDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client
    .getListDetail<Works>({
      endpoint: "works",
      contentId,
      queries,
    })
    .catch(notFound);
  return detailData;
};
