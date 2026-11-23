import { getAllPosts, getPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const processed = await remark().use(html).process(post.content);
  const contentHtml = processed.toString();

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          {new Date(post.date).toLocaleDateString()}
        </p>
        {post.categories && post.categories.length > 0 && (
          <div className="mt-3 flex gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
