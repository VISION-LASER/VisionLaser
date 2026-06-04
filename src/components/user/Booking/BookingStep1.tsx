// import React from "react";
// import { User, Mail, Phone, Calendar, FileText, ChevronRight } from "lucide-react";
// import { MOTIFS, type PatientInfo } from "../../../types/booking";

// interface Step1Props {
//   data: PatientInfo;
//   onChange: (data: PatientInfo) => void;
//   onNext: () => void;
// }

// const inputClass =
//   "w-full rounded-xl border border-border bg-[color:var(--cream)] px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-navy/35 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10";

// const BookingStep1: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
//   const set = (field: keyof PatientInfo) => (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => onChange({ ...data, [field]: e.target.value });

//   const valid =
//     data.firstName.trim() &&
//     data.lastName.trim() &&
//     data.email.trim() &&
//     data.phone.trim() &&
//     data.motif;

//   return (
//     <div className="space-y-5">
//       <div>
//         <p className="eyebrow">Étape 1 sur 3</p>
//         <h2 className="mt-2 text-2xl font-semibold text-navy">Vos informations</h2>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Ces informations nous permettent de préparer votre dossier avant la consultation.
//         </p>
//       </div>

//       {/* Name row */}
//       <div className="grid gap-4 sm:grid-cols-2">
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-navy/70">
//             Prénom <span className="text-rose-500">*</span>
//           </label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
//             <input
//               type="text"
//               value={data.firstName}
//               onChange={set("firstName")}
//               placeholder="Sophie"
//               className={`${inputClass} pl-10`}
//             />
//           </div>
//         </div>
//         <div>
//           <label className="mb-1.5 block text-xs font-medium text-navy/70">
//             Nom <span className="text-rose-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={data.lastName}
//             onChange={set("lastName")}
//             placeholder="Dupont"
//             className={inputClass}
//           />
//         </div>
//       </div>

//       {/* Email */}
//       <div>
//         <label className="mb-1.5 block text-xs font-medium text-navy/70">
//           Email <span className="text-rose-500">*</span>
//         </label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
//           <input
//             type="email"
//             value={data.email}
//             onChange={set("email")}
//             placeholder="sophie@exemple.fr"
//             className={`${inputClass} pl-10`}
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="mb-1.5 block text-xs font-medium text-navy/70">
//           Téléphone <span className="text-rose-500">*</span>
//         </label>
//         <div className="relative">
//           <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
//           <input
//             type="tel"
//             value={data.phone}
//             onChange={set("phone")}
//             placeholder="06 00 00 00 00"
//             className={`${inputClass} pl-10`}
//           />
//         </div>
//       </div>

//       {/* Birth date */}
//       <div>
//         <label className="mb-1.5 block text-xs font-medium text-navy/70">
//           Date de naissance
//         </label>
//         <div className="relative">
//           <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
//           <input
//             type="date"
//             value={data.birthDate}
//             onChange={set("birthDate")}
//             className={`${inputClass} pl-10`}
//           />
//         </div>
//       </div>

//       {/* Motif */}
//       <div>
//         <label className="mb-1.5 block text-xs font-medium text-navy/70">
//           Motif de consultation <span className="text-rose-500">*</span>
//         </label>
//         <select
//           value={data.motif}
//           onChange={set("motif")}
//           className={inputClass}
//         >
//           <option value="">Sélectionner un motif…</option>
//           {MOTIFS.map((m) => (
//             <option key={m.value} value={m.value}>
//               {m.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Notes */}
//       <div>
//         <label className="mb-1.5 block text-xs font-medium text-navy/70">
//           Informations complémentaires
//         </label>
//         <div className="relative">
//           <FileText className="absolute left-3 top-3 h-4 w-4 text-navy/30" />
//           <textarea
//             value={data.notes}
//             onChange={set("notes")}
//             placeholder="Antécédents, correction actuelle, questions…"
//             rows={3}
//             className={`${inputClass} resize-none pl-10`}
//           />
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={onNext}
//         disabled={!valid}
//         className="btn-gold w-full disabled:opacity-40"
//       >
//         Choisir un créneau
//         <ChevronRight className="h-4 w-4" />
//       </button>
//     </div>
//   );
// };

// export default BookingStep1;

import React from "react";
import { User, Mail, Phone, Calendar, FileText, ChevronRight } from "lucide-react";
import { MOTIFS, type PatientInfo } from "../../../types/booking";

interface Step1Props {
  data: PatientInfo;
  onChange: (data: PatientInfo) => void;
  onNext: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-[color:var(--cream)] px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-navy/35 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10";

const BookingStep1: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const set = (field: keyof PatientInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  const valid =
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.email.trim() &&
    data.phone.trim() &&
    data.motif;

  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow">Étape 1 sur 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Vos informations</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ces informations nous permettent de préparer votre dossier avant la consultation.
        </p>
      </div>

      {/* Ligne 1 : Prénom, Nom, Email - côte à côte (3 colonnes) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Prénom <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="text"
              value={data.firstName}
              onChange={set("firstName")}
              placeholder="Sophie"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Nom <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="text"
              value={data.lastName}
              onChange={set("lastName")}
              placeholder="Dupont"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="email"
              value={data.email}
              onChange={set("email")}
              placeholder="sophie@exemple.fr"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Ligne 2 : Téléphone, Date de naissance, Motif - côte à côte (3 colonnes) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Téléphone <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="tel"
              value={data.phone}
              onChange={set("phone")}
              placeholder="06 00 00 00 00"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Date de naissance
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              type="date"
              value={data.birthDate}
              onChange={set("birthDate")}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Motif de consultation <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.motif}
            onChange={set("motif")}
            className={inputClass}
          >
            <option value="">Sélectionner un motif…</option>
            {MOTIFS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes - pleine largeur */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Informations complémentaires
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-navy/30" />
          <textarea
            value={data.notes}
            onChange={set("notes")}
            placeholder="Antécédents, correction actuelle, questions…"
            rows={3}
            className={`${inputClass} resize-none pl-10`}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!valid}
        className="btn-gold w-full disabled:opacity-40"
      >
        Choisir un créneau
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BookingStep1;