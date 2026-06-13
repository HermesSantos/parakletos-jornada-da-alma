import ThemeProvider from "@/components/ThemeProvider";
import AdminRoute from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HeroEditor from "./pages/admin/HeroEditor";
import HeaderEditor from "./pages/admin/HeaderEditor";
import CoursesEditor from "./pages/admin/CoursesEditor";
import MethodEditor from "./pages/admin/MethodEditor";
import JourneysEditor from "./pages/admin/JourneysEditor";
import FeaturesEditor from "./pages/admin/FeaturesEditor";
import SocialProofEditor from "./pages/admin/SocialProofEditor";
import PricingEditor from "./pages/admin/PricingEditor";
import FaqEditor from "./pages/admin/FaqEditor";
import FooterEditor from "./pages/admin/FooterEditor";
import ThemeEditor from "./pages/admin/ThemeEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<HeroEditor />} />
                <Route path="header" element={<HeaderEditor />} />
                <Route path="courses" element={<CoursesEditor />} />
                <Route path="method" element={<MethodEditor />} />
                <Route path="journeys" element={<JourneysEditor />} />
                <Route path="features" element={<FeaturesEditor />} />
                <Route path="social-proof" element={<SocialProofEditor />} />
                <Route path="pricing" element={<PricingEditor />} />
                <Route path="faq" element={<FaqEditor />} />
                <Route path="footer" element={<FooterEditor />} />
                <Route path="theme" element={<ThemeEditor />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
