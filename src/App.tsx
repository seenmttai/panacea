import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Diagnostics } from './pages/Diagnostics';
import { Technology } from './pages/Technology';
import { ContactPage } from './pages/ContactPage';
import { AuroraBackground } from './components/AuroraBackground';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'diagnostics':
        return <Diagnostics />;
      case 'technology':
        return <Technology />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      <AuroraBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
