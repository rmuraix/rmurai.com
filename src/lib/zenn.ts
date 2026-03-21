export interface ZennArticle {
  url: string;
  title: string;
  emoji: string;
  publishedAt: string;
}

interface ZennApiArticle {
  path?: unknown;
  title?: unknown;
  emoji?: unknown;
  published_at?: unknown;
}

interface ZennApiPayload {
  articles?: unknown;
}

export async function fetchZennArticles(username: string): Promise<ZennArticle[]> {
  try {
    const response = await fetch(`https://zenn.dev/api/articles?username=${username}&order=latest`);

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ZennApiPayload;

    if (!Array.isArray(payload.articles)) {
      return [];
    }

    return payload.articles.flatMap((article) => {
      const entry = article as ZennApiArticle;

      if (
        typeof entry.path !== 'string' ||
        typeof entry.title !== 'string' ||
        typeof entry.emoji !== 'string' ||
        typeof entry.published_at !== 'string'
      ) {
        return [];
      }

      return [
        {
          url: `https://zenn.dev${entry.path}`,
          title: entry.title,
          emoji: entry.emoji,
          publishedAt: entry.published_at,
        },
      ];
    });
  } catch {
    return [];
  }
}
