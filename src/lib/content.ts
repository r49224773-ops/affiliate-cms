import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");
const productsDirectory = path.join(process.cwd(), "content/products");

export type Post = {
  slug: string;
  title: string;
  date: string;
  status: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};

export type Product = {
  slug: string;
  title: string;
  date: string;
  status: string;
  featuredImage?: string;
  brand?: string;
  price?: string;
  rating?: number;
  affiliateLink?: string;
  pros?: string[];
  cons?: string[];
  categories?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};

function getAllMarkdownFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const files = getAllMarkdownFiles(postsDirectory);
  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || "",
      status: data.status || "draft",
      featuredImage: data.featuredImage || "",
      categories: data.categories || [],
      tags: data.tags || [],
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || "",
      content,
    };
  });

  return posts
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllProducts(): Product[] {
  const files = getAllMarkdownFiles(productsDirectory);
  const products = files.map((filename) => {
    const filePath = path.join(productsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || "",
      status: data.status || "draft",
      featuredImage: data.featuredImage || "",
      brand: data.brand || "",
      price: data.price || "",
      rating: data.rating || 0,
      affiliateLink: data.affiliateLink || "",
      pros: data.pros || [],
      cons: data.cons || [],
      categories: data.categories || [],
      tags: data.tags || [],
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || "",
      content,
    };
  });

  return products
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}
