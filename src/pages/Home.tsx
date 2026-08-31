import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Bot, Check } from "lucide-react";
import { AnnaNavbar } from "@/components/AnnaNavbar";
import { AnnaFooter } from "@/components/AnnaFooter";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useLang, useLangPath } from "@/lib/i18n";

function MarqueeStrip() {
  const { t } = useLang();
  const items = t.marquee as readonly string[];
  return (
    <div className="relative overflow-hidden py-4 sm:py-6 border-y border-border/30">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-4 sm:mx-8 text-xs sm:text-sm font-medium text-muted-foreground/40 uppercase tracking-[0.2em] flex items-center gap-3 sm:gap-4">
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary/30" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const lp = useLangPath();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnaNavbar />
      <main className="flex-1">
        <section className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/[0.03] rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative pt-28 sm:pt-32 flex-1 min-h-0 flex flex-col justify-center">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-5">{t.services.label}</motion.p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] sm:leading-[0.95] max-w-4xl">
              <AnimatedText text={t.services.title} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{t.services.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button size="lg" className="rounded-xl w-full sm:w-auto" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{t.services.ctaPrimary}<ArrowRight className="w-4 h-4 ml-1" /></Button>
              <Button size="lg" variant="secondary" className="rounded-xl w-full sm:w-auto" asChild>
                <Link to={lp("/ai")}>{t.services.ctaSecondary}</Link>
              </Button>
            </motion.div>

            <div className="mt-10 sm:mt-14 grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* AI assistants — primary service */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}>
                <Link to={lp("/ai")} className="group relative flex flex-col h-full rounded-3xl border border-primary/40 bg-primary/[0.06] p-6 sm:p-8 transition-all duration-300 hover:border-primary/70 hover:bg-primary/[0.09]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.services.ai.tag}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">{t.services.ai.title}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{t.services.ai.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {t.services.ai.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-primary shrink-0" />{b}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{t.services.ai.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </motion.div>

              {/* Landing pages — secondary service */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}>
                <Link to={lp("/landings")} className="group relative flex flex-col h-full rounded-3xl border border-border/50 bg-card/40 p-6 sm:p-8 transition-all duration-300 hover:border-border">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
                      <LayoutGrid className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t.services.landing.tag}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">{t.services.landing.title}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{t.services.landing.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {t.services.landing.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-foreground/60 shrink-0" />{b}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">{t.services.landing.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="w-full pt-10 pb-6">
            <MarqueeStrip />
          </div>
        </section>
      </main>
      <AnnaFooter />
    </div>
  );
}
