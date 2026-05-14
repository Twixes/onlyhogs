import type { Post } from "../lib/posts";

const TYPE_META: Record<Post["type"], { icon: string; label: string }> = {
  photo: { icon: "📸", label: "Photo" },
  video: { icon: "🎬", label: "Video" },
  text: { icon: "📝", label: "Post" },
  audio: { icon: "🎧", label: "Audio" },
};

function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function PostCard({ post }: { post: Post }) {
  const hue = hashHue(post.id);
  const bg = `linear-gradient(140deg, hsl(${hue} 55% 78%), hsl(${(hue + 50) % 360} 60% 62%))`;
  const meta = TYPE_META[post.type];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--surface)] shadow-sm dark:border-white/10">
      <div
        className="relative flex aspect-video items-center justify-center"
        style={{ background: bg }}
      >
        <span className="text-5xl drop-shadow-sm">{meta.icon}</span>
        <span className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {meta.label}
        </span>
        {post.isExclusive && (
          <span className="absolute top-3 right-3 rounded-full bg-[var(--brand)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-ink)] shadow">
            Exclusive
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold leading-snug">{post.title}</h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground/70">
          {post.body}
        </p>
        {post.audioSrc && (
          <audio
            controls
            preload="metadata"
            className="mt-3 h-10 w-full"
            style={{ colorScheme: "light" }}
          >
            <source src={post.audioSrc} type="audio/mpeg" />
          </audio>
        )}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-foreground/50">
          <span>{post.likes.toLocaleString()} likes</span>
          <span>{post.comments.toLocaleString()} comments</span>
          <span className="ml-auto">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
