import { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

import { useClickSound } from '@/hooks/use-click-sound';
import backgroundImage from '@/assets/background.png';


const Index = () => {
  const [isMusicVisible, setIsMusicVisible] = useState(false);
  const playClickSound = useClickSound();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      // Don't play the click sound on external navigation clicks (helps avoid browser popup/security quirks)
      if (target?.closest('a[target="_blank"], a[href^="http"]')) return;

      playClickSound();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [playClickSound]);

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <CustomCursor />
      <Navigation onMusicToggle={() => setIsMusicVisible(!isMusicVisible)} isMusicVisible={isMusicVisible} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
