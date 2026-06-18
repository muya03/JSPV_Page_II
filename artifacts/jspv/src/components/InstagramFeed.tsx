import { useEffect, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { ArrowRight, Video, Copy } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface IGPost {
  id: string;
  thumbnail: string;
  permalink: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

const IG_PROFILE = "https://www.instagram.com/jovesocialistes/";
const IG_HANDLE = "@jovesocialistes";

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

function IgGradientIcon({ size = 22 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size * 2,
        height: size * 2,
        background:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
      }}
    >
      <SiInstagram size={size} className="text-white" aria-hidden="true" />
    </span>
  );
}

function PostGrid({ posts }: { posts: IGPost[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {posts.map((post, i) => (
        <Reveal key={post.id} delay={i * 60}>
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={post.caption || `Post d'Instagram ${i + 1}`}
            className="group relative block aspect-square overflow-hidden rounded-lg bg-[hsl(var(--surface-strong))]"
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

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-[hsl(var(--surface-strong))] animate-pulse" />
      ))}
    </div>
  );
}

function FollowCta() {
  return (
    <Reveal className="flex flex-col items-center gap-6 py-4">
      <div className="flex flex-col sm:flex-row items-center gap-8 w-full max-w-2xl">
        {[0, 1, 2].map((i) => (
          <a
            key={i}
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden="true"
            className="hidden sm:block w-full aspect-square rounded-xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, hsl(${200 + i * 40} 60% 85%), hsl(${340 + i * 20} 70% 80%))`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <IgGradientIcon size={28} />
            </div>
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Segueix-nos a Instagram per veure les últimes publicacions.
      </p>
    </Reveal>
  );
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "no_token" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data: { posts: IGPost[]; source?: string; error?: string }) => {
        if (cancelled) return;
        if (data.source === "no_token") {
          setStatus("no_token");
        } else if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
          setStatus("ok");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-white border-b border-border">
      <div className="container-page py-14 md:py-18">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div className="flex items-center gap-4">
            <IgGradientIcon size={22} />
            <div>
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-1">
                Xarxes socials
              </p>
              <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl leading-none">
                Instagram
              </h2>
            </div>
          </div>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 font-display font-semibold text-primary hover:gap-3 transition-all"
          >
            {IG_HANDLE} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>

        {status === "loading" && <SkeletonGrid />}
        {status === "ok" && <PostGrid posts={posts} />}
        {(status === "no_token" || status === "error") && <FollowCta />}

        <Reveal className="mt-8 flex justify-center">
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 h-11 px-6 rounded-md border border-border font-display font-semibold text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <SiInstagram size={16} aria-hidden="true" />
            Segueix-nos a Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
