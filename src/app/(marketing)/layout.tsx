import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization",
    name: company.name, url: siteUrl, email: company.email, telephone: company.phone,
    address: { "@type": "PostalAddress", streetAddress: company.address }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hazard-stripe" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
