// StickyWhatsApp.tsx — version finale fiable
import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33327621234";
const WHATSAPP_MSG = encodeURIComponent(
  "Bonjour, je souhaite obtenir des informations sur un bilan visuel gratuit."
);

const StickyWhatsApp: React.FC = () => (
  <>
    <style>{`
      .sticky-wa {
        position: fixed;
        right: 0;
        top: calc(50% - 56px);
        z-index: 50;
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 14px;
        border-radius: 24px 0 0 24px;
        background: #25D366;
        box-shadow: -4px 4px 18px rgba(37,211,102,.35);
        text-decoration: none;
        transition: all 0.3s ease;
        gap: 0;
      }
      .sticky-wa .sticky-label {
        color: white;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-width 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
      }
      .sticky-wa:hover .sticky-label {
        max-width: 140px;
        opacity: 1;
        margin-right: 10px;
      }
    `}</style>

    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="sticky-wa"
    >
      <span className="sticky-label">Nous contacter</span>
      <MessageCircle size={20} fill="white" stroke="none" />
    </a>
  </>
);

export default StickyWhatsApp;