const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "https://api.ulohelps.com/api/v1";

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  status: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostFull extends BlogPostListItem {
  body: string;
}

export interface BlogListResponse {
  data: BlogPostListItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    let message = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      message = json.message ?? json.error ?? message;
    } catch {
      message = text || message;
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchPublishedList(options?: {
  page?: number;
  limit?: number;
}): Promise<BlogListResponse> {
  const params = new URLSearchParams();
  if (options?.page != null) params.set("page", String(options.page));
  if (options?.limit != null) params.set("limit", String(options.limit));
  const baseUrl = getBaseUrl();
  // Ensure no double slash: baseUrl should be like https://api.example.com/api/v1 (no trailing slash)
  const url = `${baseUrl.replace(/\/$/, "")}/blog?${params.toString()}`;
  const res = await fetch(url, {
    cache: "no-store", // always fresh so new posts show right away
  });
  const json = await handleResponse<{ data?: BlogPostListItem[]; meta?: BlogListResponse["meta"] }>(res);
  return {
    data: json.data ?? [],
    meta: json.meta,
  };
}

export async function fetchPublishedBySlug(slug: string): Promise<BlogPostFull | null> {
  const url = `${getBaseUrl()}/blog/slug/${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  const json = await handleResponse<{ data?: BlogPostFull } & BlogPostFull>(res);
  const post = json.data ?? json;
  return post as BlogPostFull;
}

export function formatBlogDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
