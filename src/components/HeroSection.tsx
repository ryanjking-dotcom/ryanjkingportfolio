import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-primary/20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full bg-primary/15 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className={`text-center space-y-8 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Profile Image */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="w-full h-full rounded-full bg-gradient-hero p-1 animate-glow-pulse">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow"></div>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Ryan King
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Aspiring Software Engineer | Freelancer | Student
          </p>
          <div className="text-sm md:text-base text-muted-foreground font-mono">
            Building the future with{' '}
            <span className="text-primary font-semibold">clean code</span> and{' '}
            <span className="text-primary font-semibold">innovative solutions</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-hero hover:shadow-ba-glow transition-all duration-300 font-semibold"
            onClick={() => scrollToNext()}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mt-8">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToNext}
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
}