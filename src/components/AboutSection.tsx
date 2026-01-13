import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const skills = [
  { icon: Code, title: 'Frontend Development', desc: 'React, TypeScript, Modern CSS' },
  { icon: Database, title: 'Backend Development', desc: 'Node.js, Python, APIs' },
  { icon: Globe, title: 'Web Technologies', desc: 'Full-stack applications' },
  { icon: Zap, title: 'Performance', desc: 'Optimization & best practices' },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
            About <span className="bg-gradient-hero bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative">
          {/* Text content */}
          <div className="space-y-6 relative">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi! I'm Ryan, a recent Computer Science graduate with a passion for building 
              responsive and interactive web applications. I love the intersection of design 
              and technology, where creativity meets functionality.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open source projects, or learning about the latest trends in software development. 
              I believe in writing clean, maintainable code that makes a difference.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Linux', 'Windows', 'Mac', 'iOS', 'Android'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className={`group hover:shadow-ba-md transition-all duration-300 border-primary/20 hover:border-primary/40 bg-gradient-card transform hover:-translate-y-1 ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <skill.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold mb-2 text-sm">{skill.title}</h3>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}