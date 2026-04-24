import { MessageCircle } from "lucide-react";

const PHONE = "221770000000";

export const WhatsAppFab = () => (
  <a
    href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Asalaa maalekum 👋, je souhaite des informations sur Marsé Bi.")}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contact WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-glow transition-transform hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
  >
    <MessageCircle className="h-5 w-5" />
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);
