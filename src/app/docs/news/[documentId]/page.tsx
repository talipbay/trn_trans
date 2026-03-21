import NewsArticleClient from "./client";

export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
