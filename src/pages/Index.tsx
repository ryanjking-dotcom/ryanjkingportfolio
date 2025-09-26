import { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';
import { useClickSound } from '@/hooks/use-click-sound';


const Index = () => {
  const [isMusicVisible, setIsMusicVisible] = useState(false);
  const playClickSound = useClickSound();

  useEffect(() => {
    const handleClick = () => {
      playClickSound();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [playClickSound]);

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url('/src/assets/background.png')`
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
      <AIAssistant />
    </div>
  );
};

export default Index;
