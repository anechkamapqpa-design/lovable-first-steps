import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, X } from "lucide-react";
import { templates } from "@/data/templates";
import { TemplateCard } from "@/components/TemplateCard";
import { AnnaNavbar } from "@/components/AnnaNavbar";
import { AnnaFooter } from "@/components/AnnaFooter";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useLang, useLangPath } from "@/lib/i18n";

export default function Landings() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLang();
  const lp = useLangPath();
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  const categories = useMemo(() => {
    const uniqueCategories = new Set(templates.map((tpl) => tpl.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredTemplates = useMemo(() => {
    let result = templates;
    if (selectedCategory !== "All") {
      result = result.filter((tpl) => tpl.category === selectedCategory);
    }
    if (query) {
      result = result.filter((tpl) => {
        const local = t.templateData[tpl.title as keyof typeof t.templateData];
        const haystack = [tpl.title, tpl.description, tpl.category, local?.title, local?.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      });
    }
    return result;
  }, [selectedCategory, query, t]);

  const clearAll = () => {
    setSelectedCategory("All");
    if (query) setSearchParams({}, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnaNavbar />
      <main className="flex-1">
        {/* Landing-service hero */}
        <section className="relative overflow-x-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/[0.03] rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative pt-28 sm:pt-36 pb-10 sm:pb-14">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-5">{t.services.landing.tag}</motion.p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] sm:leading-[0.95]">
              <AnimatedText text={t.hero.line1} />{" "}
              <AnimatedText text={t.hero.line2} className="text-gradient" />{" "}
              <AnimatedText text={t.hero.line3} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{t.hero.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span>{t.hero.templateCount}</span></div>
              <div className="w-px h-4 bg-border" /><span>{t.hero.responsive}</span>
              <div className="w-px h-4 bg-border" /><span>{t.hero.updates}</span>
            </motion.div>
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 scroll-mt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 sm:mb-5">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{t.collection.title}</h2>
          </motion.div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-3 mb-4 flex-wrap">
            {categories.map((category) => {
              const catKey = category as keyof typeof t.categories;
              const localCat = t.categories[catKey] || category;
              return (
                <Button key={category} variant={selectedCategory === category ? "default" : "secondary"} size="sm" onClick={() => setSelectedCategory(category)} className="rounded-lg">{localCat}</Button>
              );
            })}
            {query && (
              <Button variant="outline" size="sm" onClick={() => setSearchParams({}, { replace: true })} className="rounded-lg gap-1.5 border-primary/40 text-primary">
                “{searchParams.get("q")}”
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredTemplates.map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <LayoutGrid className="w-5 sm:w-6 h-5 sm:h-6 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">{t.collection.noResults}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.collection.noResultsHint}</p>
              <Button variant="secondary" size="sm" onClick={clearAll} className="mt-6 rounded-lg">{t.collection.clearFilters}</Button>
            </div>
          )}
        </section>

        {/* How it works */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.howItWorks.title}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {t.howItWorks.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                <div className="text-5xl sm:text-6xl font-black text-primary/10 mb-4">{step.num}</div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">{t.howItWorks.pricing}</p>
            <Button size="lg" className="rounded-xl" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              {t.howItWorks.cta}<ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Cases */}
        <section id="cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">{t.cases.label}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.cases.title}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.cases.intro}</p>
          </motion.div>
          <div className="space-y-5 sm:space-y-6">
            {t.cases.items.map((c, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8 hover:border-border transition-colors"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-display text-2xl sm:text-3xl font-black text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">{c.title}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {([["problem", c.problem], ["approach", c.approach], ["result", c.result]] as const).map(([key, text]) => (
                    <div key={key}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-2">{t.cases[key]}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
            <Link to={lp("/privacy")} className="text-xs font-medium text-muted-foreground/60 hover:text-primary transition-colors underline underline-offset-4">
              {t.cases.privacyPolicy}
            </Link>
          </motion.div>
        </section>
      </main>
      <AnnaFooter />
    </div>
  );
}
