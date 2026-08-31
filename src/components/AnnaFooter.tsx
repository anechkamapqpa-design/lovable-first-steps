import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Globe, Loader2 } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang, useLangPath } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AnnaFooter() {
  const { t } = useLang();
  const lp = useLangPath();
  const [searchParams, setSearchParams] = useSearchParams();
  // Kept as hidden lead-routing state, set from the ?service= param; the
  // selector UI was removed to keep the form to name / contact / description.
  const [selectedType, setSelectedType] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prefill = searchParams.get("prefill");
    const service = searchParams.get("service");
    if (prefill || service) {
      if (prefill) setDescription(prefill);
      // Preselect the matching project type: "ai" → first option, "landing" → second.
      if (service === "ai") setSelectedType(0);
      else if (service === "landing") setSelectedType(1);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const contactCards = [
    { icon: SiTelegram, label: t.footer.contacts.telegram, desc: t.footer.contacts.telegramDesc, href: "https://t.me/formcrafttech", color: "group-hover:text-[hsl(200,80%,60%)]", glow: "group-hover:shadow-[0_0_20px_hsl(200,80%,60%,0.1)]" },
    { icon: Mail, label: t.footer.contacts.email, desc: t.footer.contacts.emailDesc, href: "mailto:G.Anna1@internet.ru", color: "group-hover:text-primary", glow: "group-hover:shadow-[0_0_20px_hsl(150,60%,50%,0.1)]" },
  ];

  const isValidContact = (value: string) => {
    const v = value.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telegramHandle = /^@?[a-zA-Z0-9_]{4,}$/;
    const telegramLink = /(t\.me\/|telegram\.me\/)[a-zA-Z0-9_]{4,}/i;
    return email.test(v) || telegramHandle.test(v) || telegramLink.test(v);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim()) {
      toast.error(t.footer.form.errorRequired);
      return;
    }
    if (!isValidContact(contact)) {
      toast.error(t.footer.form.errorContact);
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-form", {
        body: {
          name: name.trim(),
          contact: contact.trim(),
          projectType: t.footer.form.projectTypes[selectedType],
          timeline: "",
          description: description.trim(),
        },
      });
      if (error) throw error;
      toast.success(t.footer.form.success);
      setName("");
      setContact("");
      setDescription("");
      setSelectedType(0);
    } catch (err) {
      console.error(err);
      toast.error(t.footer.form.errorSubmit);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#0b0f14" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">{t.footer.title}</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.footer.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3 rounded-2xl border border-border/40 bg-[hsl(220,20%,6%)] p-5 sm:p-6">
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{t.footer.form.name}</label>
                  <input id="contact-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.footer.form.namePlaceholder} className="w-full px-3 py-2.5 bg-background/60 border border-border/50 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-handle" className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{t.footer.form.contact}</label>
                  <input id="contact-handle" type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={t.footer.form.contactPlaceholder} className="w-full px-3 py-2.5 bg-background/60 border border-border/50 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-description" className="block text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{t.footer.form.description}</label>
                <textarea id="contact-description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.footer.form.descriptionPlaceholder} className="w-full px-3 py-2.5 bg-background/60 border border-border/50 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
              </div>

              <Button className="w-full py-5 text-sm font-semibold" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {t.footer.form.submit}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {contactCards.map(({ icon: Icon, label, desc, href, color, glow }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-[hsl(220,20%,6%)] transition-all duration-300 hover:border-border/60 ${glow}`}>
                <div className={`w-10 h-10 rounded-lg bg-border/10 flex items-center justify-center text-muted-foreground transition-colors duration-300 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-foreground text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300 group-hover:translate-x-1 transform" />
              </a>
            ))}
            <div className="flex items-center justify-center gap-2 mt-2 px-4 py-2">
              <Globe className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground/60 tracking-wide">{t.footer.remote}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Link to={lp("/")} className="font-display text-2xl font-bold tracking-tight text-foreground/80">
            Form<span className="text-gradient">Craft</span>
          </Link>
          <p className="text-xs text-muted-foreground/50">{new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
