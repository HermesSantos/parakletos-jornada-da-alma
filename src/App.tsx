import ThemeProvider from "@/components/ThemeProvider";
import StudentRoute from "@/components/student/StudentRoute";
import StudentLayout from "@/components/student/StudentLayout";
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
import MissaoLiberteEditor from "./pages/admin/MissaoLiberteEditor";
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
import PaymentSuccess from "./pages/PaymentSuccess";
import StudentDashboard from "./pages/student/StudentDashboard";
import JourneyContentPage from "./pages/student/JourneyContentPage";
import ModuleDetailPage from "./pages/student/ModuleDetailPage";
import StudentAccountPage from "./pages/student/StudentAccountPage";
import StudentContentEditor from "./pages/admin/StudentContentEditor";
import StudentsEditor from "./pages/admin/StudentsEditor";
import CommentsEditor from "./pages/admin/CommentsEditor";

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
            <Route path="/pagamento/sucesso" element={<PaymentSuccess />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/aluno" element={<StudentRoute />}>
              <Route element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="jornadas/:slug" element={<JourneyContentPage />} />
                <Route path="jornadas/:slug/modulos/:moduleId" element={<ModuleDetailPage />} />
                <Route path="conta" element={<StudentAccountPage />} />
              </Route>
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<HeroEditor />} />
                <Route path="missao-liberte" element={<MissaoLiberteEditor />} />
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
                <Route path="student-content" element={<StudentContentEditor />} />
                <Route path="students" element={<StudentsEditor />} />
                <Route path="comments" element={<CommentsEditor />} />
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
