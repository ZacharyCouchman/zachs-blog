import PostDescription from "@/components/PostDescription";
import { getPostPreviews } from "@/lib/posts";
import { PostPreview } from "@/types";

export default async function Posts() {
  const posts = await getPostPreviews();
  return (
    <div className="flex-1 lg:p-6">
      <h2 className="font-semibold text-4xl mb-2">Posts</h2>
      <hr className="text-muted-background mb-3" />
      <ul className="flex flex-col gap-6">
        {posts.map((post: PostPreview) => (
          <PostDescription key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
