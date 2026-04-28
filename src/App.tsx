import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Boutique from "./pages/Boutique";
import ProduitDetail from "./pages/ProduitDetail";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import Mentions from "./pages/Mentions";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/produit/:id" element={<ProduitDetail />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/commande" element={<Commande />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/mentions" element={<Mentions />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
