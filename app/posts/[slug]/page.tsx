import { getPostPreviews, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  return getPostPreviews().map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);
  return (
     <article className="flex-1 min-w-0 prose dark:prose-invert py-6 max-w-none">
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}