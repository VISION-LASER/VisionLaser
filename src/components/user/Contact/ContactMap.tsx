import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation, Building2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Reveal } from "../../layout/Reveal";

// ── Leaflet icon fix ──────────────────────────────────────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ── Constants ─────────────────────────────────────────────────────────────────
const GOLD = "#C9A84C";

const HORAIRES = [
  { day: "Lun – Ven", hours: "9:00 – 19:00", open: true },
  { day: "Samedi", hours: "9:00 – 17:00", open: true },
  { day: "Dimanche", hours: "Fermé", open: false },
];

// ── MapController ─────────────────────────────────────────────────────────────
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, 17); }, [center, map]);
  return null;
};

// ── Component ─────────────────────────────────────────────────────────────────
const ContactMap = () => {
  const coordinates: [number, number] = [50.293481276071944, 3.9777031251635857];
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => { setIsMapReady(true); }, []);

  return (
    <section
      className="section"
      style={{ background: "linear-gradient(135deg, #0C2340 0%, #0f2d50 100%)" }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, " + GOLD + " 0%, transparent 50%)," +
            "radial-gradient(circle at 80% 20%, " + GOLD + " 0%, transparent 40%)",
        }}
      />

      <div className="container-page" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="eyebrow" style={{ color: GOLD }}>Nous trouver</p>
            <h2 className="mt-3 text-white">
              Vision Laser · Maubeuge
            </h2>
            <p className="mt-2" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,.45)" }}>
              Polyclinique du Val de Sambre — Rte de Mons 162, 59600 Maubeuge
            </p>
          </div>
        </Reveal>

        {/* ── Grid ── */}
        <div className="grid gap-12 md:grid-cols-2" style={{ alignItems: "stretch" }}>

          {/* ── Left column — info ── */}
          <div style={{ height: "100%" }}>
            <Reveal>
              <div style={{
                display: "flex", flexDirection: "column", gap: "1.5rem",
                height: "100%",
              }}>

                {/* Coordonnées */}
                <Card title="Coordonnées" icon={<Building2 size={14} />}>
                  <InfoRow href="tel:+33759596369" icon={<Phone size={14} color={GOLD} />}>
                    +33 7 59 59 63 69
                  </InfoRow>
                  <InfoRow href="mailto:contact@vision-laser.fr" icon={<Mail size={14} color={GOLD} />}>
                    contact@vision-laser.fr
                  </InfoRow>
                  <InfoRow icon={<MapPin size={14} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />}>
                    Rte de Mons 162, 59600 Maubeuge
                  </InfoRow>
                </Card>

                {/* Horaires */}
                <Card title="Horaires" icon={<Clock size={14} />} grow>
                  {HORAIRES.map(({ day, hours, open }) => (
                    <div
                      key={day}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "0.5rem 0",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,.55)" }}>{day}</span>
                      <span style={{
                        fontSize: "0.8125rem",
                        fontWeight: open ? 600 : 400,
                        color: open ? "#fff" : "rgba(255,255,255,.28)",
                      }}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </Card>

                {/* CTA */}
                <a
                  href={`https://www.google.com/maps/dir//${coordinates[0]},${coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    gap: "0.5rem", fontSize: "0.875rem", width: "100%", marginTop: "auto",
                  }}
                >
                  <Navigation size={16} />
                  Obtenir l'itinéraire
                </a>

              </div>
            </Reveal>
          </div>


          {/* ── Right column — map ── */}
          <div style={{ height: "100%" }}>
            <Reveal>
              <div style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.10)",
                boxShadow: "0 32px 80px rgba(0,0,0,.45)",
                height: "100%",
                minHeight: 520,
              }}>
                {isMapReady && (
                  <MapContainer
                    center={coordinates}
                    zoom={17}
                    style={{ height: "100%", width: "100%", minHeight: 520 }}
                    zoomControl
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates}>
                      <Popup>
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontWeight: 600, margin: 0 }}>Vision Laser</p>
                          <p style={{ fontSize: 11, color: "#666", margin: "2px 0 4px" }}>Polyclinique du Val de Sambre</p>
                          <a
                            href={`https://www.google.com/maps/dir//${coordinates[0]},${coordinates[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 11, color: "#C9A84C" }}
                          >
                            Itinéraire →
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                    <MapController center={coordinates} />
                  </MapContainer>
                )}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMap;

// ── Helpers ───────────────────────────────────────────────────────────────────
const GOLD_COLOR = "#C9A84C";

function Card({ title, icon, children, grow }: { title: string; icon: React.ReactNode; children: React.ReactNode; grow?: boolean }) {
  return (
    <div style={{
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,.08)",
      background: "rgba(255,255,255,.04)",
      backdropFilter: "blur(8px)",
      padding: "1.25rem",
      width: "100%",
      ...(grow ? { flex: 1 } : {}),
    }}>
      <p style={{
        display: "flex", alignItems: "center", gap: 8,
        fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: GOLD_COLOR,
        marginBottom: "1rem",
      }}>
        <span style={{ color: GOLD_COLOR }}>{icon}</span>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  href, icon, children,
}: {
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    display: "flex", alignItems: "flex-start", gap: 10,
    fontSize: "0.8125rem", color: "rgba(255,255,255,.65)",
    textDecoration: "none",
  };
  return href ? (
    <a href={href} style={style}>
      {icon}
      <span>{children}</span>
    </a>
  ) : (
    <div style={style}>
      {icon}
      <span>{children}</span>
    </div>
  );
}