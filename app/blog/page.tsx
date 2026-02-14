import Link from "next/link";
import { fetchPublishedList, formatBlogDate } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ulo",
  description:
    "Tips, guides, and updates on hiring and working with domestic workers. Read the latest from Ulo.",
};

const BLOG_PAGE_SIZE = 12;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

/**
 * Server-rendered so post list is in initial HTML (better for SEO).
 */
export default async function BlogListPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(String(pageParam), 10) || 1);
  let posts: Awaited<ReturnType<typeof fetchPublishedList>>["data"] = [];
  let meta: Awaited<ReturnType<typeof fetchPublishedList>>["meta"];
  try {
    const result = await fetchPublishedList({ page, limit: BLOG_PAGE_SIZE });
    posts = result.data ?? [];
    meta = result.meta;
  } catch {
    posts = [];
    meta = undefined;
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1136px] mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#344054]">
            Blog
          </h1>
          <p className="text-lg text-[#475367] mt-2 max-w-2xl">
            Tips, guides, and updates on hiring and working with domestic
            workers.
          </p>
        </header>

        {!posts.length ? (
          <div className="rounded-[16px] border border-[#EAECF0] bg-white p-16 text-center">
            <FileText className="w-16 h-16 mx-auto text-[#9CA3AF] mb-4" />
            <p className="text-[#475367]">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {posts.map((post) => (
                <article key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-[16px] overflow-hidden bg-white border border-[#EAECF0] shadow-sm hover:shadow-md hover:border-[#F1473C33] transition-all"
                    role="listitem"
                  >
                    <div className="aspect-[16/10] relative bg-[#F9FAFB] overflow-hidden">
                      {post.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                          <FileText className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <time className="text-sm text-[#F1473C] font-medium" dateTime={post.publishedAt ?? undefined}>
                        {formatBlogDate(post.publishedAt)}
                      </time>
                      <h2 className="text-lg font-semibold text-[#344054] mt-1 group-hover:text-[#F1473C] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#475367] mt-2 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-medium text-[#F1473C] mt-3 inline-flex items-center gap-1 group-hover:underline">
                        Read more
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <nav className="flex items-center justify-between mt-12 pt-8 border-t border-[#EAECF0]" aria-label="Blog pagination">
                <p className="text-sm text-[#475367]">
                  Page {meta.page} of {meta.totalPages} ({meta.total} posts)
                </p>
                <div className="flex gap-2">
                  {meta.hasPrevPage && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={page > 2 ? `/blog?page=${page - 1}` : "/blog"}>
                        Previous
                      </Link>
                    </Button>
                  )}
                  {meta.hasNextPage && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog?page=${page + 1}`}>Next</Link>
                    </Button>
                  )}
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}
