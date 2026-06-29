import { Desktop } from "@/components/Desktop";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeViewGate } from "@/components/view/HomeViewGate";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <Suspense fallback={null}>
        <HomeViewGate>
          <Desktop />
        </HomeViewGate>
      </Suspense>
    </>
  );
}
