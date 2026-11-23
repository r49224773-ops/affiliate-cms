import Link from "next/link";
import { getAllPosts, getAllProducts } from "@/lib/content";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const products = getAllProducts().slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Honest Reviews & Buying Guides
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Independent product reviews and helpful articles to help you buy smarter.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Latest Articles</h2>
          <Link href="/posts/" className="text-primary-600 text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}/`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Latest Reviews</h2>
          <Link href="/products/" className="text-primary-600 text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}/`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                {product.price && <span className="font-medium">{product.price}</span>}
                {product.rating > 0 && <span>★ {product.rating}</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
