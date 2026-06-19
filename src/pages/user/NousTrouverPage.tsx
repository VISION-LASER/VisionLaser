import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Car, Train, Building2, Navigation, MessageCircle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PageHero } from "../../components/layout/PageHero";
import { Header } from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

// Correction des icônes Leaflet par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Composant pour centrer la carte
const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 18);
    }, [center, map]);
    return null;
};

const NousTrouver = () => {
    const coordinates: [number, number] = [50.293481276071944, 3.9777031251635857];
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        setIsMapReady(true);

        // Injecter du CSS pour corriger les z-index de Leaflet
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
        <div className="min-h-screen bg-cream">
            <Header />
            <PageHero
                eyebrow="Transparence"
                title="Nous trouver"
                intro="Vision Laser -  ."
            />


            {/* Map Section */}
            <section className="py-16 relative z-0">
                <div className="container-page">
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
                                            <a href="tel:+33759507184" className="text-muted-foreground text-sm hover:text-gold transition-colors">
                                                +33 7 59 50 71 84
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
                                            className="relative"
                                        >
                                            {/* Vue satellite */}
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                                subdomains="abcd"
                                            />

                                            <Marker position={coordinates}>
                                                <Popup>
                                                    <div className="text-center">
                                                        <p className="font-semibold text-navy">Vision Laser</p>
                                                        <p className="text-xs text-muted-foreground"> </p>
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
                                <div className="p-4 bg-white text-center text-xs text-muted-foreground border-t border-border">
                                    <span>📍 Vision Laser - Centre de chirurgie réfractive</span>
                                </div>
                            </div>

                            {/* Légende */}
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-3 shadow-sm border border-border text-center">
                                    <div className="text-gold font-bold text-lg">15+</div>
                                    <div className="text-xs text-muted-foreground">Années d'expérience</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 shadow-sm border border-border text-center">
                                    <div className="text-gold font-bold text-lg">10k+</div>
                                    <div className="text-xs text-muted-foreground">Patients traités</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Section contact rapide */}
            <section className="py-16 bg-navy text-white relative z-10">
                <div className="container-page text-center">
                    <h2 className="text-3xl font-bold mb-4">Besoin d'informations ?</h2>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+33759596369"
                            className="btn-gold inline-flex items-center justify-center gap-2"
                        >
                            <Phone className="h-4 w-4" />
                            Nous appeler
                        </a>
                        <a
                            href="https://wa.me/33759596369"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default NousTrouver;