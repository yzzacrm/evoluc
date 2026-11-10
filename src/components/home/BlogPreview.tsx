import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/data";

export default function BlogPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal variant="left" className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Guia do comprador"
            title="Para decidir com tranquilidade"
            description="Financiamento, escolha da planta e acompanhamento de obra, explicados com clareza."
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 border-b border-ink-950/20 pb-1 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950"
          >
            Ver todos os artigos
            <ArrowRight size={16} />
          </Link>
        </Reveal>

        <RevealGroup
          variant="scale"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
