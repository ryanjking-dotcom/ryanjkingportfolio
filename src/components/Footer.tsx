import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-card to-ba-light border-t border-primary/20 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              Software Engineer & Creative Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
              asChild
            >
              <a href="https://github.com/ryanjking-dotcom" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
              asChild
            >
              <a href="https://www.linkedin.com/in/ryankingnyc/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
              asChild
            >
              <a href="mailto:ryanjking.nyc@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}