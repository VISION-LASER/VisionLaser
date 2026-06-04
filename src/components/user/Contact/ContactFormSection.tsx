import React from "react";
import { ContactForm } from "../../layout/ContactForm";
import ContactInfoItem from "./ContactInfoItem";
import { CONTACT_INFOS } from "../../../data/data";

const ContactFormSection: React.FC = () => (
  <section className="section pt-16 pb-20">
    <div className="container-page">

      <div className="grid gap-12 md:grid-cols-12">
        {/* Form */}
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        {/* Sidebar — centrée verticalement par rapport au formulaire */}
        <aside className="md:col-span-5 flex items-center">
          <div className="w-full space-y-8">
            {CONTACT_INFOS.map((info) => (
              <ContactInfoItem key={info.title} {...info} />
            ))}

            <div className="hairline" />

            <p className="text-xs text-muted-foreground">
              Vos données sont traitées dans le cadre du RGPD, uniquement pour
              répondre à votre demande. Elles ne sont jamais transmises à des
              tiers à but commercial.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

export default ContactFormSection;