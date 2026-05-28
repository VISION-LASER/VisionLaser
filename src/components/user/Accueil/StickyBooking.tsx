// StickyBooking.tsx — version finale fiable
import React, { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

interface Props { onOpen: () => void; }

const StickyBooking: React.FC<Props> = ({ onOpen }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 10_000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .sticky-rdv {
          position: fixed;
          right: 0;
          top: calc(50% + 16px);
          z-index: 50;
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 14px;
          border-radius: 24px 0 0 24px;
          background: #C9A84C;
          box-shadow: -4px 4px 18px rgba(201,168,76,.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          gap: 0;
        }
        .sticky-rdv .sticky-label {
          color: #0C2340;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-width 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        .sticky-rdv:hover .sticky-label {
          max-width: 160px;
          opacity: 1;
          margin-right: 10px;
        }
        .sticky-rdv:hover {
          box-shadow: -6px 4px 24px rgba(201,168,76,.55);
        }
      `}</style>

      <button
        onClick={() => { onOpen(); setPulse(false); }}
        aria-label="Prendre rendez-vous"
        className="sticky-rdv"
      >
        <span className="sticky-label">Prendre rendez-vous</span>
        <span style={{ position: "relative", display: "flex" }}>
          <CalendarDays size={20} color="#0C2340" />
          {pulse && (
            <span
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#0C2340",
                opacity: 0.7,
                animation: "ping 1s cubic-bezier(0,0,.2,1) infinite",
              }}
            />
          )}
        </span>
      </button>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default StickyBooking;