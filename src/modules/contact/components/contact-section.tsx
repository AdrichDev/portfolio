"use client";

import { PROFILE } from "@/modules/profile/profile";
import { useMessages } from "@/shared/i18n/messages";
import { ArcadeButton } from "@/shared/ui/arcade-button";
import { ArcadeSection } from "@/shared/ui/arcade-section";

export function ContactSection() {
  const t = useMessages().contact;
  return (
    <ArcadeSection id="contact" kicker={t.kicker} title={t.title} tone="green">
      <p className="max-w-2xl text-base leading-8">{t.text}</p>
      <ul className="flex flex-wrap gap-4">
        {PROFILE.contacts.map((contact) => <li key={contact.id}><ArcadeButton href={contact.href} tone="green" external={contact.external}>{contact.label}</ArcadeButton></li>)}
      </ul>
    </ArcadeSection>
  );
}
