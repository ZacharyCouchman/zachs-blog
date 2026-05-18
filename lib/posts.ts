import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { Post, PostPreview } from "@/types";

const postsDir = path.join(process.cwd(), "posts");

function extractExcerpt(content: string): string {
  const paragraphs = content.split("\n\n");
  const first = paragraphs.find(
    (p) =>
      p.trim().length > 0 &&
      !p.startsWith("#") &&
      !p.startsWith("##") &&
      !p.startsWith("```") &&
      !p.startsWith("!"),
  );
  return first?.trim()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/`([^`]+)`/g, '$1')              // inline code → text
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // bold/italic → text
    ?? '';
}

export function getPostPreviews(take?: number) {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "").toLowerCase();
      const file = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data, content } = matter(file);
      return {
        slug,
        frontmatter: { ...data, date: new Date(data.date).toISOString() ?? "" },
        excerpt: extractExcerpt(content),
      } as PostPreview;
    })
    .sort((a: PostPreview, b: PostPreview) =>
      a.frontmatter.date < b.frontmatter.date ? 1 : -1,
    )
    .slice(0, take);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const file = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(file);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    frontmatter: {
      title: data.title,
      date: new Date(data.date).toISOString() ?? "",
      tags: data.tags
    },
    contentHtml: processed.toString(),
  };
}

