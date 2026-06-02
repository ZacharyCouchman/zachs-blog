"use client";

import type { PostPreview } from "@/types";
import ThemedLink from "./ThemedLink";

interface Props {
  post: PostPreview;
}
export default function PostDescription({ post }: Props) {
  return (
    <li key={post.slug}>
      <ThemedLink className="text-2xl font-semibold" href={`/posts/${post.slug}`}>
        {post.frontmatter.title}
      </ThemedLink>
      <div className="flex items-center gap-2 py-1">
        <p className="text-xs text-muted-foreground">Published: {new Date(post.frontmatter.date).toDateString()}</p>
        {post.frontmatter.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full px-2 py-0.5 bg-muted-background text-xs font-semibold text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div>
        <p className="text-foreground">{post.excerpt}</p>
      </div>
    </li>
  );
}
