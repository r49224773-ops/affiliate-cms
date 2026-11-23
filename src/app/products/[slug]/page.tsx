import { getAllProducts, getProductBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const processed = await remark().use(html).process(product.content);
  const contentHtml = processed.toString();

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{product.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          {product.brand && <span className="font-medium">{product.brand}</span>}
          {product.price && (
            <span className="text-lg font-semibold text-gray-900">{product.price}</span>
          )}
          {product.rating > 0 && (
            <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
              ★ {product.rating} / 5
            </span>
          )}
        </div>

        {product.affiliateLink && (
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-primary-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Check Price →
          </a>
        )}
      </header>

      {(product.pros?.length || product.cons?.length) && (
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {product.pros && product.pros.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-semibold text-green-800 mb-3">Pros</h3>
              <ul className="space-y-2">
                {product.pros.map((pro) => (
                  <li key={pro} className="text-sm text-green-700 flex gap-2">
                    <span>✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.cons && product.cons.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h3 className="font-semibold text-red-800 mb-3">Cons</h3>
              <ul className="space-y-2">
                {product.cons.map((con) => (
                  <li key={con} className="text-sm text-red-700 flex gap-2">
                    <span>✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
