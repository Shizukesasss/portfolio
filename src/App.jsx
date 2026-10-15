import { Routes, Route } from 'react-router-dom';
import { LenisProvider } from './motion/LenisProvider';
import { MotionProvider } from './motion/MotionContext';
import { TransitionProvider } from './components/RouteTransition';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <MotionProvider>
      <LenisProvider>
        <TransitionProvider>
          <div className="relative min-h-screen bg-night text-bone">
            <Loader />
            <Cursor />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </TransitionProvider>
      </LenisProvider>
    </MotionProvider>
  );
}
