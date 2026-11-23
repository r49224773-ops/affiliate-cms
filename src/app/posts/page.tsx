import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}/`}
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
              {post.categories && post.categories.length > 0 && (
                <span className="ml-3">
                  {post.categories.join(", ")}
                </span>
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
