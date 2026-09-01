import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description: "Entre em contato com a Evoluc.",
};

export default function FaleConoscoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Fale conosco"
        description="Tire dúvidas sobre lançamentos, financiamento ou fale diretamente com nosso time comercial."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <InfoRow icon={Phone} label="Telefone" value={siteConfig.phone} />
              <InfoRow
                icon={Phone}
                label="WhatsApp"
                value={siteConfig.whatsapp}
              />
              <InfoRow icon={Mail} label="E-mail" value={siteConfig.email} />
              <InfoRow
                icon={MapPin}
                label="Endereço"
                value={siteConfig.address}
              />

              <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-ink-100 to-ink-200">
                <div className="flex h-full items-center justify-center text-xs text-ink-400">
                  Mapa / localização
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper-50 text-copper-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-ink-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}
