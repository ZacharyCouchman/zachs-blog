import PostDescription from "@/components/PostDescription";
import Profile from "@/components/Profile";
import { getPostPreviews } from "@/lib/posts";
import type { PostPreview } from "@/types";

export default async function Home() {
  const latestPosts = await getPostPreviews(4);
  return (
    <>
      <img alt="Grampians Landscape" src="/img/grampians.jpeg" width={"100%"} />
      <div className="mx-auto px-4 max-w-7xl mt-4 relative flex flex-col lg:flex-row gap-4 lg:px-6">
        <Profile />
        <div className="flex-1 lg:mt-6 lg:p-6">
          <h2 className="font-semibold text-4xl mb-2">Recent Posts</h2>
          <hr className="text-muted-background mb-6" />
          <ul className="flex flex-col gap-6">
            {latestPosts.map((post: PostPreview) => <PostDescription key={post.slug} post={post} />)}
          </ul>
        </div>
      </div>
    </>
  );
}
