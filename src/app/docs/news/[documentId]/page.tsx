import NewsArticleClient from "./client";

export async function generateStaticParams() {
  return [];
}

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
