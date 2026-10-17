import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { FeaturedWork } from "@/components/home/featured-work";
import { Editorials } from "@/components/home/editorials";
import { Process } from "@/components/home/process";
import { FAQ } from "@/components/home/faq";
import { canonical } from "@/lib/seo";
export const metadata = { alternates: canonical("/") };
export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Marquee />
      <FeaturedWork />
      <Editorials />
      <Process />
      <FAQ />
    </main>
  );
}
