import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation({ onMusicToggle, isMusicVisible }: { onMusicToggle: () => void; isMusicVisible: boolean }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/80 backdrop-blur-lg border-b border-primary/20 shadow-ba-md' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Ryan King
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMusicToggle}
                className={`h-9 w-9 p-0 transition-colors ${isMusicVisible ? 'bg-accent' : ''}`}
              >
                <Music className="h-4 w-4" />
              </Button>
              <MusicPlayer isVisible={isMusicVisible} />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}