import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ClientsCloud } from "@/components/ClientsCloud";
import { FormationsTeaser } from "@/components/FormationsTeaser";
import { ContactCTA } from "@/components/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Manifesto />
      <ServicesGrid locale={locale} />
      <ClientsCloud />
      <FormationsTeaser locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
