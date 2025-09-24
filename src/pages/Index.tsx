import { useState } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';
import { MusicPlayer } from '@/components/MusicPlayer';

const Index = () => {
  const [isMusicVisible, setIsMusicVisible] = useState(false);
  return (
    <div className="min-h-screen bg-background">
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
      <MusicPlayer isVisible={isMusicVisible} />
    </div>
  );
};

export default Index;
