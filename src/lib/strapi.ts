import type { Locale } from "./i18n";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

/** Map frontend locale codes to Strapi locale codes */
const STRAPI_LOCALE_MAP: Record<Locale, string> = {
  ru: "ru",
  kz: "kk",
  en: "en",
};

export function toStrapiLocale(locale: Locale): string {
  return STRAPI_LOCALE_MAP[locale] || "ru";
}

interface StrapiResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

async function fetchStrapi<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }
  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}

// ── Rich text helper ──

/** Extract plain text from Strapi v5 blocks JSON */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blocksToText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(blocksToText).filter(Boolean).join("\n");
  if (typeof value === "object") {
    if (typeof value.text === "string") return value.text;
    if (Array.isArray(value.children)) return value.children.map(blocksToText).join("");
  }
  return "";
}

// ── Types (all fields are render-safe strings) ──

export interface Vacancy {
  id: number;
  documentId: string;
  title: string;
  description: string;
  location?: string;
  publishedAt: string;
}

export interface FoundingDocument {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  file?: { url: string; name: string };
  publishedAt: string;
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  formats?: Record<string, { url: string }>;
}

export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  summary?: string;
  content?: string;
  category: "social" | "news";
  cover?: StrapiMedia;
  images?: StrapiMedia[];
  publishedAt: string;
}

export interface ContractDocument {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  file?: { url: string; name: string };
  publishedAt: string;
}

// ── Sanitize: convert rich text blocks to strings, strip extra fields ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitize(item: any): any {
  const { localizations, locale, createdAt, updatedAt, ...rest } = item;
  // Convert any rich text block arrays to plain strings
  for (const key of Object.keys(rest)) {
    const val = rest[key];
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object" && val[0]?.type && val[0]?.children) {
      rest[key] = blocksToText(val);
    }
  }
  return rest;
}

// ── Fetchers ──

export async function getVacancies(locale?: Locale): Promise<Vacancy[]> {
  try {
    const params: Record<string, string> = {
      "sort": "publishedAt:desc",
      "pagination[pageSize]": "100",
      "populate": "*",
    };
    if (locale) params["locale"] = toStrapiLocale(locale);
    const res = await fetchStrapi<StrapiResponse<Vacancy>>("/vacancies", params);
    return res.data.map(sanitize);
  } catch {
    return [];
  }
}

export async function getFoundingDocuments(locale?: Locale): Promise<FoundingDocument[]> {
  try {
    const params: Record<string, string> = {
      "sort": "publishedAt:desc",
      "pagination[pageSize]": "100",
      "populate": "*",
    };
    if (locale) params["locale"] = toStrapiLocale(locale);
    const res = await fetchStrapi<StrapiResponse<FoundingDocument>>("/founding-documents", params);
    return res.data.map(sanitize);
  } catch {
    return [];
  }
}

export async function getNews(category?: "social" | "news", locale?: Locale): Promise<NewsArticle[]> {
  try {
    const params: Record<string, string> = {
      "sort": "publishedAt:desc",
      "pagination[pageSize]": "100",
      "populate": "*",
    };
    if (category) params["filters[category][$eq]"] = category;
    if (locale) params["locale"] = toStrapiLocale(locale);
    const res = await fetchStrapi<StrapiResponse<NewsArticle>>("/news-articles", params);
    return res.data.map(sanitize);
  } catch {
    return [];
  }
}

export async function getNewsArticle(documentId: string, locale?: Locale): Promise<NewsArticle | null> {
  try {
    const params: Record<string, string> = { "populate": "*" };
    if (locale) params["locale"] = toStrapiLocale(locale);
    const res = await fetchStrapi<{ data: NewsArticle }>(`/news-articles/${documentId}`, params);
    return res.data ? sanitize(res.data) : null;
  } catch {
    return null;
  }
}

export async function getContractDocuments(locale?: Locale): Promise<ContractDocument[]> {
  try {
    const params: Record<string, string> = {
      "sort": "publishedAt:desc",
      "pagination[pageSize]": "100",
      "populate": "*",
    };
    if (locale) params["locale"] = toStrapiLocale(locale);
    const res = await fetchStrapi<StrapiResponse<ContractDocument>>("/contract-documents", params);
    return res.data.map(sanitize);
  } catch {
    return [];
  }
}

export function strapiMedia(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/** Submit a job application to Strapi (with optional file upload) */
export async function submitJobApplication(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  vacancyTitle: string;
  resume?: File;
}): Promise<boolean> {
  try {
    const headers: HeadersInit = {};
    if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

    // Step 1: create the entry
    const createRes = await fetch(`${STRAPI_URL}/api/job-applications`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          vacancyTitle: data.vacancyTitle,
        },
      }),
    });
    if (!createRes.ok) return false;

    // Step 2: upload resume and link it to the entry
    if (data.resume) {
      const json = await createRes.json();
      const documentId = json.data?.documentId;
      const entryId = json.data?.id;
      if (entryId) {
        const form = new FormData();
        form.append("files", data.resume);
        form.append("ref", "api::job-application.job-application");
        form.append("refId", String(documentId || entryId));
        form.append("field", "resume");
        const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
          method: "POST",
          headers,
          body: form,
        });
        // If linked upload fails, try updating the entry with the uploaded file
        if (!uploadRes.ok) {
          // Fallback: upload file first, then link via PUT
          const plainUpload = new FormData();
          plainUpload.append("files", data.resume);
          const upRes = await fetch(`${STRAPI_URL}/api/upload`, {
            method: "POST",
            headers,
            body: plainUpload,
          });
          if (upRes.ok) {
            const uploaded = await upRes.json();
            const fileId = uploaded[0]?.id;
            if (fileId) {
              await fetch(`${STRAPI_URL}/api/job-applications/${documentId || entryId}`, {
                method: "PUT",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify({ data: { resume: fileId } }),
              });
            }
          }
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}
