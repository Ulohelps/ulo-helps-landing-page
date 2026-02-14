import Link from "next/link";
import { fetchPublishedList, formatBlogDate } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const BLOG_LIMIT = 6;

/**
 * Server-rendered so blog titles/links are in initial HTML (better for SEO and crawlers).
 */
export async function LatestBlogPosts() {
  let posts: Awaited<ReturnType<typeof fetchPublishedList>>["data"] = [];
  try {
    const result = await fetchPublishedList({ limit: BLOG_LIMIT });
    posts = result.data ?? [];
  } catch {
    return null;
  }

  if (!posts.length) return null;

  return (
    <section className="max-w-[1136px] mx-auto px-4 py-20" aria-label="Latest blog posts">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#344054]">
            Latest from our blog
          </h2>
          <p className="text-base text-[#475367] mt-2 max-w-xl">
            Tips, guides, and updates on hiring and working with domestic workers.
          </p>
        </div>
        <Button variant="outline" asChild className="w-fit border-[#F1473C] text-[#F1473C] hover:bg-[#F1473C08]">
          <Link href="/blog">View all posts</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {posts.map((post) => (
          <Link
            key={post.id}
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
              <p className="text-sm text-[#F1473C] font-medium">
                {formatBlogDate(post.publishedAt)}
              </p>
              <h3 className="text-lg font-semibold text-[#344054] mt-1 group-hover:text-[#F1473C] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-[#475367] mt-2 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium text-[#F1473C] mt-3 inline-flex items-center gap-1 group-hover:underline">
                Read more
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
