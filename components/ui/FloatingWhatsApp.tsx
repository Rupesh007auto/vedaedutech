"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "914040188140";
  const phoneTel = process.env.NEXT_PUBLIC_PHONE_TEL || "+914040188140";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <motion.a
        href={`tel:${phoneTel}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-premium"
        aria-label="Call us"
      >
        <Phone size={20} />
      </motion.a>
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20VedaEdutech%20courses.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
        <MessageCircle size={26} className="relative" fill="white" />
      </motion.a>
    </div>
  );
}
