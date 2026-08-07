import Link from "next/link";
import { StaticImage } from "@/components/ui/ParallaxImage";
import type { Post } from "@/lib/content/insights";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({
  post,
  className,
  size = "default",
}: {
  post: Post;
  className?: string;
  size?: "default" | "large";
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/insights/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <StaticImage
            image={post.image}
            alt=""
            className={cn(
              "w-full",
              size === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
            )}
            imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            sizes={
              size === "large"
                ? "(max-width: 1024px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            quality={75}
          />
          <span className="label absolute top-4 left-4 bg-alabaster/90 px-3 py-2 text-ink backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        <div className="mt-6">
          <p className="label text-ash">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </p>

          <h3
            className={cn(
              "display mt-4 leading-[1.2] text-ink transition-colors duration-500 group-hover:text-brass-deep",
              size === "large"
                ? "text-[clamp(1.6rem,1.2rem+1.8vw,2.6rem)]"
                : "text-[clamp(1.3rem,1.1rem+0.9vw,1.75rem)]"
            )}
          >
            {post.title}
          </h3>

          <p
            className={cn(
              "mt-4 leading-relaxed text-slate",
              size === "large" ? "max-w-[56ch] text-lead" : "max-w-[46ch] text-sm"
            )}
          >
            {post.excerpt}
          </p>

          <span className="link-underline label mt-6 inline-block text-ink">
            Read the piece
          </span>
        </div>
      </Link>
    </article>
  );
}
