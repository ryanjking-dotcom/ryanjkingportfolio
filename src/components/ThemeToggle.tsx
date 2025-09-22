import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative bg-card border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
    >
      <Sun className={`h-5 w-5 text-primary transition-all duration-300 ${
        isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
      }`} />
      <Moon className={`absolute h-5 w-5 text-primary transition-all duration-300 ${
        isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}