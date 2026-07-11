import { useEffect, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { Video, Copy } from "lucide-react";

interface IGPost {
  id: string;
  thumbnail: string;
  permalink: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

function MediaBadge({ type }: { type: IGPost["mediaType"] }) {
  if (type === "IMAGE") return null;
  return (
    <span className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm text-white">
      {type === "VIDEO" ? (
        <Video size={14} aria-label="Vídeo" />
      ) : (
        <Copy size={14} aria-label="Àlbum" />
      )}
    </span>
  );
}

function PostTile({ post, index }: { post: IGPost; index: number }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption || `Post d'Instagram ${index + 1}`}
      className="shrink-0 w-48 h-48 relative block overflow-hidden bg-[hsl(var(--surface-strong))] hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <img
        src={post.thumbnail}
        alt={post.caption ? post.caption.slice(0, 80) : "Post Instagram JSPV"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center group">
        <SiInstagram
          size={28}
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
      </div>
      <MediaBadge type={post.mediaType} />
    </a>
  );
}

function PlaceholderTile({ index }: { index: number }) {
  return (
    <a
      key={index}
      href="https://instagram.com/jovesocialistes"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram JSPV"
      className="shrink-0 w-48 h-48 relative block overflow-hidden bg-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-30 group-hover:opacity-60 transition-opacity">
        <SiInstagram size={28} className="text-white" aria-hidden="true" />
      </div>
    </a>
  );
}

const PLACEHOLDER_COUNT = 10;

export function InstagramFeed() {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "no_token" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data: { posts: IGPost[]; source?: string }) => {
        if (cancelled) return;
        if (data.source === "no_token") {
          setStatus("no_token");
        } else if (data.posts?.length > 0) {
          setPosts(data.posts.slice(0, 10));
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, []);

  const realPosts = status === "ok" ? posts : Array.from({ length: PLACEHOLDER_COUNT });
  const doubled = [...realPosts, ...realPosts];

  return (
    <section className="border-b border-border bg-white py-0 overflow-hidden">
      {/* Header */}
      <div className="container-page py-5 flex items-center gap-2.5">
        <SiInstagram size={16} className="text-[#E1306C]" />
        <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Instagram
        </p>
        <a
          href="https://instagram.com/jovesocialistes"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold text-primary hover:underline"
        >
          @jovesocialistes →
        </a>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex gap-1 ig-ticker-track pb-0">
          {doubled.map((post, i) =>
            status === "ok" && post ? (
              <PostTile key={`${(post as IGPost).id}-${i}`} post={post as IGPost} index={i} />
            ) : (
              <PlaceholderTile key={i} index={i} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
