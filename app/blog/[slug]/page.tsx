import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchPublishedBySlug, formatBlogDate } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ulohelps.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBySlug(slug);
  if (!post) {
    return { title: "Post not found | Ulo" };
  }
  const title = post.seoTitle?.trim() || post.title;
  const description = post.seoDescription?.trim() || post.excerpt;
  const ogImage = post.ogImageUrl?.trim() || post.coverImageUrl?.trim();
  const canonical = `${SITE_URL.replace(/\/$/, "")}/blog/${slug}`;
  return {
    title: `${title} | Ulo`,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] }),
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPublishedBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription?.trim() || post.excerpt,
    ...(post.coverImageUrl && { image: post.coverImageUrl }),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? undefined,
    author: { "@type": "Organization", name: "Ulo" },
    publisher: { "@type": "Organization", name: "Ulo" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL.replace(/\/$/, "")}/blog/${slug}`,
    },
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-[720px] mx-auto px-4" itemScope itemType="https://schema.org/Article">
        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2 text-[#475367] hover:text-[#F1473C]">
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </Button>

        {post.coverImageUrl && (
          <div className="aspect-[16/10] relative rounded-[16px] overflow-hidden bg-[#F9FAFB] mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <time className="text-sm font-medium text-[#F1473C]" dateTime={post.publishedAt ?? undefined} itemProp="datePublished">
            {formatBlogDate(post.publishedAt)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold text-[#344054] mt-2" itemProp="headline">
            {post.title}
          </h1>
        </header>

        <div
          className="blog-post-body max-w-none text-base text-[#475367] [&_h1]:text-[#344054] [&_h2]:text-[#344054] [&_h3]:text-[#344054] [&_a]:text-[#F1473C] [&_a]:no-underline hover:[&_a]:underline"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
    </main>
  );
}
