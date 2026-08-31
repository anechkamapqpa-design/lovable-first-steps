import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { ArrowLeft, ArrowUpRight, Eye, MonitorSmartphone, Code2, Zap, Palette, Globe, Shield } from "lucide-react";
import { getTemplate, demoSlugMap } from "@/data/templates";
import { AnnaNavbar } from "@/components/AnnaNavbar";
import { AnnaFooter } from "@/components/AnnaFooter";
import { Button } from "@/components/ui/button";
import { useLang, useLangPath } from "@/lib/i18n";
import { miniPreviewMap } from "@/components/MiniPreviews";

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const lp = useLangPath();
  const template = getTemplate(Number(id));

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AnnaNavbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.detail.notFound}</h1>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">{t.detail.notFoundDesc}</p>
          <Button className="rounded-xl" asChild><Link to={lp("/")}>{t.detail.returnHome}</Link></Button>
        </div>
      </div>
    );
  }

  const tdKey = template.title as keyof typeof t.templateData;
  const localTitle = t.templateData[tdKey]?.title || template.title;
  const localDesc = t.templateData[tdKey]?.description || template.description;
  const catKey = template.category as keyof typeof t.categories;
  const localCategory = t.categories[catKey] || template.category;

  const features = [
    { icon: MonitorSmartphone, title: t.detail.features.responsive, desc: t.detail.features.responsiveDesc },
    { icon: Zap, title: t.detail.features.performance, desc: t.detail.features.performanceDesc },
    { icon: Code2, title: t.detail.features.code, desc: t.detail.features.codeDesc },
    { icon: Palette, title: t.detail.features.design, desc: t.detail.features.designDesc },
    { icon: Globe, title: t.detail.features.browser, desc: t.detail.features.browserDesc },
    { icon: Shield, title: t.detail.features.practices, desc: t.detail.features.practicesDesc },
  ];

  const MiniPreview = miniPreviewMap[template.title];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnaNavbar />
      <main className="flex-1 min-h-screen flex flex-col justify-center pt-16 sm:pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 group" onClick={() => { navigate(lp("/landings")); setTimeout(() => { document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{t.detail.back}
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-7">
              <Link to={lp(demoSlugMap[template.title] || "#")} className="block relative rounded-2xl overflow-hidden border border-border/30 hover:border-[hsl(220,20%,30%)] transition-all duration-500 hover:shadow-2xl group cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {MiniPreview ? <MiniPreview /> : <div className="w-full h-full bg-gradient-to-br from-[hsl(220,20%,20%)] to-[hsl(220,20%,8%)]" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,6%)]/60 via-transparent to-transparent" />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-background/30 backdrop-blur-md text-foreground/80 border border-foreground/10 rounded-lg text-xs font-semibold">{localCategory}</span>
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2">
                    <div className="flex gap-1.5 px-2.5 py-1.5 bg-background/30 backdrop-blur-md rounded-lg border border-foreground/10">
                      <div className="w-2 h-2 rounded-full bg-destructive/80" /><div className="w-2 h-2 rounded-full bg-amber-400/80" /><div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/30 backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl shadow-lg"><Eye className="w-4 h-4" />{t.detail.livePreview}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.1]">{localTitle}</h1>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{localDesc}</p>
                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Button className="rounded-xl w-full sm:w-auto" onClick={() => {
                    const prefill = `${t.detail.orderPrefix} "${template.title}"`;
                    navigate(lp("/landings?service=landing&prefill=" + encodeURIComponent(prefill)));
                    setTimeout(() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}>{t.detail.getTemplate}<ArrowUpRight className="w-4 h-4" /></Button>
                  <Button variant="secondary" className="rounded-xl w-full sm:w-auto" asChild><Link to={lp(demoSlugMap[template.title] || "#")}>{t.detail.livePreview}</Link></Button>
                </div>
              </div>
              <div className="mt-4 bg-card border border-border/50 rounded-xl p-4 animated-border">
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">{t.detail.included}</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0"><feature.icon className="w-3 h-3 text-primary" /></div>
                      <h4 className="text-xs font-medium text-foreground leading-tight">{feature.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <AnnaFooter />
    </div>
  );
}
