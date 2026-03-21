import { getNews } from "@/lib/strapi";
import NewsArticleClient from "./client";

export async function generateStaticParams() {
  try {
    const articles = await getNews();
    return articles.map((a) => ({ documentId: a.documentId }));
  } catch {
    return [];
  }
}

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
