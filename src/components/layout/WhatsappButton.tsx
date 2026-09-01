import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site-config";

export default function WhatsappButton() {
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Olá! Vim pelo site da Evoluc e gostaria de mais informações."
  );

  return (
    <a
      href={`https://wa.me/55${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <WhatsappIcon width={28} height={28} />
    </a>
  );
}
