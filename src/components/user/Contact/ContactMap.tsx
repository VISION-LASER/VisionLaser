// components/user/Contact/ContactMap.tsx
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Car, Train, Building2, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Correction des icônes Leaflet par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 18);
    }, [center, map]);
    return null;
};

const ContactMap = () => {
    const coordinates: [number, number] = [50.293481276071944, 3.9777031251635857];
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        setIsMapReady(true);

        const style = document.createElement('style');
        style.textContent = `
            .leaflet-container {
                z-index: 1 !important;
            }
            .leaflet-control-container {
                z-index: 1 !important;
            }
            .leaflet-control-zoom {
                z-index: 20 !important;
            }
            .leaflet-popup {
                z-index: 30 !important;
            }
            .leaflet-marker-icon {
                z-index: 10 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section className="py-16 relative z-0 bg-cream">
            <div className="container-page">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-navy mb-4">Nous trouver</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Vision Laser - Polyclinique du Val de Sambre, Maubeuge
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Informations */}
                    <div className="lg:col-span-1 space-y-6 relative z-10">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
                            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-gold" />
                                Nos coordonnées
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="font-medium text-navy">Adresse</p>
                                        <p className="text-muted-foreground text-sm">
                                            VISION LASER,
                                            Polyclinique du Val de Sambre,
                                            Rte de Mons 162,
                                            59600 Maubeuge
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="font-medium text-navy">Téléphone</p>
                                        <a href="tel:+33759596369" className="text-muted-foreground text-sm hover:text-gold transition-colors">
                                            +33 7 59 59 63 69
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="font-medium text-navy">Email</p>
                                        <a href="mailto:contact@vision-laser.fr" className="text-muted-foreground text-sm hover:text-gold transition-colors">
                                            contact@vision-laser.fr
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horaires */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
                            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-gold" />
                                Horaires d'ouverture
                            </h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                                    <span className="font-medium text-navy">9:00 - 19:00</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Samedi</span>
                                    <span className="font-medium text-navy">9:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">Dimanche</span>
                                    <span className="font-medium text-navy">Fermé</span>
                                </div>
                            </div>
                        </div>

                        {/* Accès */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
                            <h2 className="text-xl font-bold text-navy mb-4">Comment venir ?</h2>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Car className="h-4 w-4 text-gold" />
                                    <span className="text-muted-foreground">Parking gratuit à disposition</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Train className="h-4 w-4 text-gold" />
                                    <span className="text-muted-foreground">Gare de Lens à 5 min à pied</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Navigation className="h-4 w-4 text-gold" />
                                    <span className="text-muted-foreground">Accès facile par l'A21 - Sortie Lens Centre</span>
                                </div>
                            </div>

                            <a
                                href={`https://www.google.com/maps/dir//${coordinates[0]},${coordinates[1]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold w-full mt-6 text-center inline-flex items-center justify-center gap-2"
                            >
                                <Navigation className="h-4 w-4" />
                                Itinéraire
                            </a>
                        </div>
                    </div>

                    {/* Carte Leaflet */}
                    <div className="lg:col-span-2 relative z-0">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border">
                            <div className="h-[500px] w-full relative">
                                {isMapReady && (
                                    <MapContainer
                                        center={coordinates}
                                        zoom={18}
                                        style={{ height: "100%", width: "100%" }}
                                        zoomControl={true}
                                        attributionControl={true}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />

                                        <Marker position={coordinates}>
                                            <Popup>
                                                <div className="text-center">
                                                    <p className="font-semibold text-navy">Vision Laser</p>
                                                    <p className="text-xs text-muted-foreground">Hauts-de-France</p>
                                                    <a
                                                        href={`https://www.google.com/maps/dir//${coordinates[0]},${coordinates[1]}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gold text-xs hover:underline mt-1 inline-block"
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactMap;