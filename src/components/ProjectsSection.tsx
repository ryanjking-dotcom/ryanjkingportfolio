import { useEffect, useRef, useState } from 'react';
import { Youtube, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'AI Assistant Pipeline',
    description: 'An intelligent AI assistant pipeline showcasing automation and conversational AI capabilities.',
    technologies: ['AI', 'Python', 'Automation'],
    githubUrl: 'https://github.com/ryanjking-dotcom/AI-assistant-pipeline',
    youtubeUrl: 'https://youtu.be/_lKRyxuhIrs',
    imageGradient: 'from-blue-500 to-cyan-500',
  },
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 max-w-6xl mx-auto relative"
    >
      <div className={`transition-all duration-1000 px-6 md:px-12 py-12 md:py-16 relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Semi-transparent background overlay */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/50 backdrop-blur-sm rounded-3xl -z-10"></div>
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in modern web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`group hover:shadow-ba-lg transition-all duration-500 border-primary/20 hover:border-primary/40 bg-gradient-card transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                {/* Project image placeholder */}
                <div className={`h-48 rounded-lg bg-gradient-to-br ${project.imageGradient} mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/90 text-4xl font-bold tracking-wider">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-hero hover:shadow-ba-glow transition-all duration-300"
                    asChild
                  >
                    <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4 mr-2" />
                      Watch Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}