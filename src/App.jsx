import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence } from 'framer-motion';

import { SalemHeader } from './components/layout/SalemHeader';
import { SalemFooter } from './components/layout/SalemFooter';
import { SalemWhatsAppCTA } from './components/action/SalemWhatsAppCTA';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-gold/20 text-carbon">
      <SalemHeader />
      <main className="flex-grow">
        {children}
      </main>
      <SalemFooter />
      <SalemWhatsAppCTA />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
