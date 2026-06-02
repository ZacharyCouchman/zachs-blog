import { getPostPreviews, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getPostPreviews().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <article className="flex-1 min-w-0 prose dark:prose-invert py-6 max-w-none">
      <h1>{post.frontmatter.title}</h1>
      <div className="flex items-center gap-2 py-1">
        <p className="text-xs text-muted-foreground">
          Published: {new Date(post.frontmatter.date).toDateString()}
        </p>
        {post.frontmatter.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full px-2 py-0.5 bg-muted-background text-xs font-semibold text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
