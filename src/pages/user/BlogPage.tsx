import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/layout/Header";
import { PageHero } from "../../components/layout/PageHero";
import Footer from "../../components/layout/Footer";
import BlogSection from "../../components/user/Blog/BlogSection";

const BlogPage: React.FC = () => (
  <>
    <Helmet>
      <title>Blog · Vision Laser Hauts-de-France</title>
      <meta
        name="description"
        content="Articles médicaux du Dr. Anthony Sion : FemtoLASIK, TPRK, presbytie et conseils en chirurgie réfractive."
      />
    </Helmet>
    <Header />
    <PageHero
      eyebrow="Blog médical"
      title="Articles du Dr. Anthony Sion"
      intro="Conseils, explications et mises au point sur la chirurgie réfractive, rédigés et validés par notre chirurgien ophtalmologue."
    />
    <BlogSection />
    <Footer />
  </>
);

export default BlogPage;