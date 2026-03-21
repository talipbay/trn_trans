import NewsArticleClient from "./client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
