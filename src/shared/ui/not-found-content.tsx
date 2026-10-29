"use client";

import Link from "next/link";

import { useMessages } from "@/shared/i18n/messages";

export function NotFoundContent() {
  const t = useMessages().notFound;
  return <main className="m-auto p-8 text-center"><h1 className="font-display mb-8">{t.title}</h1><Link className="underline" href="/">{t.home}</Link></main>;
}
