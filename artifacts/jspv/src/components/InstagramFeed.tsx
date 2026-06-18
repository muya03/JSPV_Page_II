import { useEffect, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { Video, Copy } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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

function PostGrid({ posts }: { posts: IGPost[] }) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      {posts.map((post, i) => (
        <Reveal key={post.id} delay={i * 60}>
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={post.caption || `Post d'Instagram ${i + 1}`}
            className="group relative block aspect-square overflow-hidden bg-[hsl(var(--surface-strong))]"
          >
            <img
              src={post.thumbnail}
              alt={post.caption ? post.caption.slice(0, 80) : "Post Instagram JSPV"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <SiInstagram
                size={28}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </div>
            <MediaBadge type={post.mediaType} />
          </a>
        </Reveal>
      ))}
    </div>
  );
}

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
          setPosts(data.posts);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, []);

  if (status !== "ok") return null;

  return (
    <section className="border-b border-border overflow-hidden">
      <PostGrid posts={posts} />
    </section>
  );
}
