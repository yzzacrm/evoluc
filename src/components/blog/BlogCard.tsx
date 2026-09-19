import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden bg-ink-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-copper-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {post.readTime}
          </span>
        </div>
        <h3 className="font-display mt-3 text-lg font-bold text-ink-900">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 group-hover:text-copper-600">
          Ler artigo
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
