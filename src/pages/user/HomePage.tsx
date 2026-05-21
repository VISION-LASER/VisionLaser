import Footer from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

function HomePage() {

  return (
    <>
        <Header />
        <main className="container-page mt-10">
          <h1 className="text-3xl font-bold text-navy">Bienvenue sur le site de Vision Laser Hauts-de-France</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous sommes spécialisés dans la correction de la vision au laser, offrant des solutions personnalisées pour améliorer votre qualité de vie. Découvrez nos services et prenez rendez-vous pour un bilan visuel gratuit.
          </p>
        </main>
        <Footer />
    </>
  )
}

export default HomePage
