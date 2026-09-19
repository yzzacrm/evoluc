import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <div className="bg-ink-950 pb-16 pt-36 sm:pt-40">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar ao blog
          </Link>
          <span className="mt-6 inline-block rounded-full bg-copper-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {post.category}
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-ink-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime} de leitura
            </span>
          </div>
        </Container>
      </div>

      <article className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="relative -mt-2 mb-8 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 672px, 100vw"
              />
            </div>
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-600">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
