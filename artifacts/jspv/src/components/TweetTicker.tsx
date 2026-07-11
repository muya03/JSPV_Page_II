import { useEffect, useState } from "react";
import { Twitter } from "lucide-react";

interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  url: string;
}

const HANDLE = "@JoveSocialistes";
const PROFILE_URL = "https://x.com/JoveSocialistes";

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("ca-ES", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <a
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-[320px] bg-white border border-border rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="font-display font-extrabold text-white text-xs leading-none">
              JS
            </span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground leading-tight">
              JSPV
            </p>
            <p className="text-xs text-muted-foreground">{HANDLE}</p>
          </div>
        </div>
        <Twitter size={15} className="text-[#1D9BF0] shrink-0 mt-0.5" />
      </div>

      <p className="text-sm text-foreground leading-relaxed line-clamp-3">
        {tweet.text}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
        <span>{formatDate(tweet.createdAt)}</span>
        <div className="flex items-center gap-3">
          <span>🔁 {tweet.retweetCount}</span>
          <span>❤️ {tweet.likeCount}</span>
        </div>
      </div>
    </a>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  const widths = ["w-3/4", "w-full", "w-5/6", "w-2/3", "w-full"];
  const lines = ["w-full", "w-4/5", "w-3/5"];
  return (
    <div
      key={index}
      className="shrink-0 w-[320px] bg-white border border-border rounded-2xl p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3 bg-muted rounded animate-pulse w-24" />
          <div className="h-2.5 bg-muted rounded animate-pulse w-16" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {lines.map((w, i) => (
          <div
            key={i}
            className={`h-3 bg-muted rounded animate-pulse ${i === 0 ? widths[index % widths.length] : w}`}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="h-2.5 w-12 bg-muted rounded animate-pulse" />
        <div className="h-2.5 w-20 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export function TweetTicker({ lang }: { lang: string }) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [status, setStatus] = useState<
    "loading" | "ok" | "no_token" | "error"
  >("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/twitter")
      .then((r) => r.json())
      .then((data: { tweets: Tweet[]; source?: string }) => {
        if (cancelled) return;
        if (data.source === "no_token") {
          setStatus("no_token");
        } else if (data.tweets?.length > 0) {
          setTweets(data.tweets.slice(0, 10));
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items =
    status === "ok"
      ? tweets
      : Array.from({ length: 10 }, (_, i) => i);
  const doubled = [...items, ...items];

  return (
    <section className="bg-[hsl(var(--surface))] border-t border-border py-10 overflow-hidden">
      <div className="container-page mb-6">
        <div className="flex items-center gap-2.5">
          <Twitter size={16} className="text-[#1D9BF0]" />
          <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {lang === "es" ? "Últimos tweets" : "Últims tweets"}
          </p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-semibold text-primary hover:underline"
          >
            {HANDLE} →
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[hsl(var(--surface))] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[hsl(var(--surface))] to-transparent" />

        <div className="flex gap-4 tweet-ticker-track pb-2">
          {doubled.map((item, i) =>
            status === "ok" ? (
              <TweetCard key={`${(item as Tweet).id}-${i}`} tweet={item as Tweet} />
            ) : (
              <PlaceholderCard key={i} index={i % 10} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
