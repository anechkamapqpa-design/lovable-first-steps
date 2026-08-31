import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Route, ShieldCheck, Mail, Headphones, Boxes } from "lucide-react";
import { AnnaNavbar } from "@/components/AnnaNavbar";
import { AnnaFooter } from "@/components/AnnaFooter";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

const capabilityIcons = [Mail, MessageSquare, Route, ShieldCheck];
const painIcons = [Boxes, Headphones, Route];

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function AI() {
  const { t } = useLang();
  const ai = t.aiPage;
  const [, setSearchParams] = useSearchParams();

  const goToContact = () => {
    // Tell the shared contact form to preselect the "AI Assistant" project type.
    setSearchParams({ service: "ai" }, { replace: true });
    setTimeout(scrollToContact, 60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnaNavbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/[0.04] rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-28 sm:pt-32 pb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
              <Bot className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{ai.hero.tag}</span>
            </motion.div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="block">{ai.hero.title1}</motion.span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="block text-gradient">{ai.hero.title2}</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{ai.hero.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Button size="lg" className="rounded-xl w-full sm:w-auto" onClick={goToContact}>{ai.hero.ctaPrimary}<ArrowRight className="w-4 h-4 ml-1" /></Button>
              <Button size="lg" variant="secondary" className="rounded-xl w-full sm:w-auto" asChild>
                <a href="#flagship">{ai.hero.ctaSecondary}</a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-muted-foreground">
              {ai.hero.stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{s}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pains */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{ai.pains.title}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{ai.pains.subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {ai.pains.items.map((item, i) => {
              const Icon = painIcons[i] || Boxes;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-y border-border/30 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-12 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">{ai.capabilities.label}</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">{ai.capabilities.title}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {ai.capabilities.items.map((item, i) => {
                const Icon = capabilityIcons[i] || Bot;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-4 sm:gap-5 rounded-2xl border border-border/50 bg-background/40 p-6 sm:p-8">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flagship case — Top Domus */}
        <section id="flagship" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 scroll-mt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">{ai.flagship.label}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground max-w-3xl">{ai.flagship.title}</h2>
          </motion.div>
          <div className="rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-10">
            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              {([["problemLabel", "problem"], ["approachLabel", "approach"], ["resultLabel", "result"]] as const).map(([labelKey, textKey], i) => (
                <motion.div key={labelKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">{ai.flagship[labelKey]}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ai.flagship[textKey]}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-border/40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-5">{ai.flagship.metricsLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {ai.flagship.metrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="font-display text-3xl sm:text-4xl font-black text-gradient mb-1">{m.value}</div>
                    <p className="text-sm text-muted-foreground leading-snug">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other AI cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-10 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">{ai.otherCases.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{ai.otherCases.subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {ai.otherCases.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-2xl font-black text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-border/30 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-12 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{ai.process.title}</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{ai.process.subtitle}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {ai.process.steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-4xl sm:text-5xl font-black text-primary/15 mb-3">{step.num}</div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10 sm:mb-14 text-center">{ai.faq.title}</motion.h2>
          <div className="space-y-4">
            {ai.faq.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-7">
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-12 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">{ai.finalCta.title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-7 leading-relaxed">{ai.finalCta.subtitle}</p>
            <Button size="lg" className="rounded-xl" onClick={goToContact}>{ai.finalCta.cta}<ArrowRight className="w-4 h-4 ml-1" /></Button>
          </motion.div>
        </section>
      </main>
      <AnnaFooter />
    </div>
  );
}
