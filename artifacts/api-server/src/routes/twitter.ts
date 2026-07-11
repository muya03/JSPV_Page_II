import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  url: string;
}

let cachedUserId: string | null = null;
let cache: { data: Tweet[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora — minimiza consumo de créditos API

const USERNAME = "JoveSocialistes";

async function fetchUserId(bearer: string): Promise<string> {
  if (cachedUserId) return cachedUserId;
  const resp = await fetch(
    `https://api.twitter.com/2/users/by/username/${USERNAME}`,
    { headers: { Authorization: `Bearer ${bearer}` } },
  );
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Twitter users lookup ${resp.status}: ${body}`);
  }
  const json = (await resp.json()) as { data?: { id: string } };
  if (!json.data?.id) throw new Error("Twitter users lookup: no user data");
  cachedUserId = json.data.id;
  return cachedUserId;
}

async function fetchTweets(bearer: string): Promise<Tweet[]> {
  const userId = await fetchUserId(bearer);
  const params = new URLSearchParams({
    max_results: "10",
    "tweet.fields": "created_at,public_metrics,text",
    exclude: "retweets,replies",
  });
  const resp = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets?${params}`,
    { headers: { Authorization: `Bearer ${bearer}` } },
  );
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Twitter timeline ${resp.status}: ${body}`);
  }
  const json = (await resp.json()) as {
    data?: Array<{
      id: string;
      text: string;
      created_at?: string;
      public_metrics?: {
        like_count: number;
        retweet_count: number;
        reply_count: number;
      };
    }>;
  };
  return (json.data ?? [])
    .map((t) => ({
      id: t.id,
      // Strip trailing t.co URLs (they appear when tweet is just a link/media)
      text: t.text.replace(/https:\/\/t\.co\/\S+/g, "").trim(),
      createdAt: t.created_at ?? "",
      likeCount: t.public_metrics?.like_count ?? 0,
      retweetCount: t.public_metrics?.retweet_count ?? 0,
      replyCount: t.public_metrics?.reply_count ?? 0,
      url: `https://x.com/${USERNAME}/status/${t.id}`,
    }))
    .filter((t) => t.text.length > 0); // skip media-only tweets with no text
}

router.get("/twitter", async (_req, res) => {
  const bearer = process.env["X_BEARER_TOKEN"];

  if (!bearer) {
    res.status(200).json({ tweets: [], source: "no_token" });
    return;
  }

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    res.json({ tweets: cache.data, source: "cache" });
    return;
  }

  try {
    const tweets = await fetchTweets(bearer);
    cache = { data: tweets, fetchedAt: Date.now() };
    res.json({ tweets, source: "live" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: msg, tweets: [] });
  }
});

export default router;
