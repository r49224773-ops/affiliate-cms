import Link from "next/link";
import { getAllProducts } from "@/lib/content";

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Product Reviews</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}/`}
            className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              {product.brand && <span>{product.brand}</span>}
              {product.price && <span className="font-medium text-gray-900">{product.price}</span>}
              {product.rating > 0 && <span>★ {product.rating}</span>}
            </div>
            {product.pros && product.pros.length > 0 && (
              <p className="text-sm text-gray-500">
                Top pro: {product.pros[0]}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
