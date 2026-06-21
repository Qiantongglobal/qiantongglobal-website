import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/85257098985"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline text-sm font-semibold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
