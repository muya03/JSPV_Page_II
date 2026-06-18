import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface InstagramPost {
  id: string;
  thumbnail: string;
  permalink: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

let cache: { data: InstagramPost[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchViaToken(token: string): Promise<InstagramPost[]> {
  const fields = "id,media_type,media_url,thumbnail_url,permalink,timestamp,caption";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=6`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Instagram Graph API returned ${resp.status}`);
  const json = (await resp.json()) as {
    data: Array<{
      id: string;
      media_type: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink: string;
      timestamp: string;
      caption?: string;
    }>;
  };
  return json.data.map((p) => ({
    id: p.id,
    thumbnail: p.thumbnail_url ?? p.media_url ?? "",
    permalink: p.permalink,
    caption: p.caption?.slice(0, 120) ?? "",
    timestamp: p.timestamp,
    mediaType:
      p.media_type === "VIDEO"
        ? "VIDEO"
        : p.media_type === "CAROUSEL_ALBUM"
          ? "CAROUSEL_ALBUM"
          : "IMAGE",
  }));
}

router.get("/instagram", async (_req, res) => {
  const token = process.env["INSTAGRAM_TOKEN"];

  if (!token) {
    res.status(200).json({ posts: [], source: "no_token" });
    return;
  }

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    res.json({ posts: cache.data, source: "cache" });
    return;
  }

  try {
    const posts = await fetchViaToken(token);
    cache = { data: posts, fetchedAt: Date.now() };
    res.json({ posts, source: "live" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(502).json({ error: msg, posts: [] });
  }
});

export default router;
