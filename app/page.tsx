import { About } from "@/components/site/About";
import { Advantages } from "@/components/site/Advantages";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Organization } from "@/components/site/Organization";
import { Partners } from "@/components/site/Partners";
import { Portfolio } from "@/components/site/Portfolio";
import { Projects } from "@/components/site/Projects";
import { Reveal } from "@/components/site/Reveal";
import { Schematic } from "@/components/site/Schematic";
import { Services } from "@/components/site/Services";
import { Vision } from "@/components/site/Vision";
import { WhyUs } from "@/components/site/WhyUs";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Header />
      <main id="content">
        <Hero hero={content.hero} />
        <Reveal>
          <About about={content.about} />
        </Reveal>
        <Reveal>
          <Vision vision={content.vision} />
        </Reveal>
        <Reveal>
          <Organization organization={content.organization} />
        </Reveal>
        <Reveal>
          <Services services={content.services} />
        </Reveal>
        <Reveal>
          <WhyUs why={content.why} />
        </Reveal>
        <Reveal>
          <Schematic schematic={content.schematic} />
        </Reveal>
        <Reveal>
          <Advantages advantages={content.advantages} />
        </Reveal>
        <Reveal>
          <Portfolio portfolio={content.portfolio} />
        </Reveal>
        <Reveal>
          <Projects projects={content.projects} />
        </Reveal>
        <Reveal>
          <Partners partners={content.partners} />
        </Reveal>
        <Reveal>
          <Contact contact={content.contact} services={content.services.items.map((item) => item.title)} />
        </Reveal>
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
