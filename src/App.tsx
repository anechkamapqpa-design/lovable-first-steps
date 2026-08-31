import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LangProvider, LangLayout } from "@/lib/i18n";
import Home from "./pages/Home";
import TemplateDetail from "./pages/TemplateDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Demo pages are heavy and rarely the entry point — load them on demand.
const LuxuryArt = lazy(() => import("./pages/demos/LuxuryArt"));
const SaaSClean = lazy(() => import("./pages/demos/SaaSClean"));
const EcomDrop = lazy(() => import("./pages/demos/EcomDrop"));
const PersonalBrand = lazy(() => import("./pages/demos/PersonalBrand"));
const ExperimentalNeon = lazy(() => import("./pages/demos/ExperimentalNeon"));
const ProductInteractive = lazy(() => import("./pages/demos/ProductInteractive"));
const LuxeAura = lazy(() => import("./pages/demos/LuxeAura"));
const AppMotion = lazy(() => import("./pages/demos/AppMotion"));
const EchoPress = lazy(() => import("./pages/demos/EchoPress"));
const MarketSphere = lazy(() => import("./pages/demos/MarketSphere"));
const Atelier = lazy(() => import("./pages/demos/Atelier"));
const NeuroFlow = lazy(() => import("./pages/demos/NeuroFlow"));
const GlassWave = lazy(() => import("./pages/demos/GlassWave"));
const BrutalistLab = lazy(() => import("./pages/demos/BrutalistLab"));
const CommunityGrid = lazy(() => import("./pages/demos/CommunityGrid"));
const MonoJournal = lazy(() => import("./pages/demos/MonoJournal"));
const Voxel3D = lazy(() => import("./pages/demos/Voxel3D"));
const StoryBrand = lazy(() => import("./pages/demos/StoryBrand"));
const Curiosa = lazy(() => import("./pages/demos/Curiosa"));
const Archive = lazy(() => import("./pages/demos/Archive"));
const Lumiere = lazy(() => import("./pages/demos/Lumiere"));
const Privacy = lazy(() => import("./pages/Privacy"));
const AI = lazy(() => import("./pages/AI"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

const langRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="ai" element={<AI />} />
    <Route path="template/:id" element={<TemplateDetail />} />
    <Route path="about" element={<About />} />
    <Route path="privacy" element={<Privacy />} />
    <Route path="demo/luxury-art" element={<LuxuryArt />} />
    <Route path="demo/saas-clean" element={<SaaSClean />} />
    <Route path="demo/ecom-drop" element={<EcomDrop />} />
    <Route path="demo/personal-brand" element={<PersonalBrand />} />
    <Route path="demo/experimental-neon" element={<ExperimentalNeon />} />
    <Route path="demo/product-interactive" element={<ProductInteractive />} />
    <Route path="demo/luxe-aura" element={<LuxeAura />} />
    <Route path="demo/app-motion" element={<AppMotion />} />
    <Route path="demo/echo-press" element={<EchoPress />} />
    <Route path="demo/market-sphere" element={<MarketSphere />} />
    <Route path="demo/atelier" element={<Atelier />} />
    <Route path="demo/neuro-flow" element={<NeuroFlow />} />
    <Route path="demo/glass-wave" element={<GlassWave />} />
    <Route path="demo/brutalist-lab" element={<BrutalistLab />} />
    <Route path="demo/community-grid" element={<CommunityGrid />} />
    <Route path="demo/mono-journal" element={<MonoJournal />} />
    <Route path="demo/voxel-3d" element={<Voxel3D />} />
    <Route path="demo/story-brand" element={<StoryBrand />} />
    <Route path="demo/curiosa" element={<Curiosa />} />
    <Route path="demo/archive" element={<Archive />} />
    <Route path="demo/lumiere" element={<Lumiere />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LangProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/en" replace />} />
              <Route path="/:lang" element={<LangLayout />}>
                {langRoutes}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
