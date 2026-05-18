export type PostMetaData = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  },
}
export type Post = {
  contentHtml: string;
} & PostMetaData

export type PostPreview = {
  excerpt: string;
} & PostMetaData