import React from "react";
import type { ContactInfo } from "../../../types/types";

type ContactInfoItemProps = ContactInfo;

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon: Icon, title, lines }) => (
  <div className="flex gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--cream)]">
      <Icon className="h-4 w-4 text-navy" />
    </div>
    <div>
      <p className="text-sm font-semibold text-navy">{title}</p>
      {lines.map((line) => (
        <p key={line} className="text-sm text-muted-foreground">
          {line}
        </p>
      ))}
    </div>
  </div>
);

export default ContactInfoItem;