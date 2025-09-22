import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const animationId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctxRef.current = ctx;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update main cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      // Add new point to trail
      trailPoints.current.push({
        x,
        y,
        timestamp: Date.now()
      });

      // Limit trail length and remove old points
      const maxAge = 800; // Trail duration in ms
      const now = Date.now();
      trailPoints.current = trailPoints.current.filter(
        point => now - point.timestamp < maxAge
      );
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // Animation loop for drawing the trail
    const drawTrail = () => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = trailPoints.current;
      if (points.length < 2) {
        animationId.current = requestAnimationFrame(drawTrail);
        return;
      }

      const now = Date.now();
      const maxAge = 800;

      // Draw the neon trail
      for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i];
        const prevPoint = points[i - 1];
        
        const age = now - currentPoint.timestamp;
        const normalizedAge = age / maxAge;
        const opacity = Math.max(0, 1 - normalizedAge);
        
        if (opacity <= 0) continue;

        // Create gradient for neon effect
        const gradient = ctx.createLinearGradient(
          prevPoint.x, prevPoint.y,
          currentPoint.x, currentPoint.y
        );

        // Blue Archive neon colors
        const glowColor = `hsla(206, 100%, 60%, ${opacity})`;
        const coreColor = `hsla(206, 100%, 80%, ${opacity * 0.8})`;
        
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, coreColor);

        // Draw multiple layers for glow effect
        ctx.save();
        
        // Outer glow
        ctx.shadowColor = `hsla(206, 100%, 60%, ${opacity * 0.6})`;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Inner glow
        ctx.shadowBlur = 8;
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        // Core line
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `hsla(206, 100%, 90%, ${opacity})`;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();

        ctx.restore();
      }

      animationId.current = requestAnimationFrame(drawTrail);
    };

    // Start animation loop
    drawTrail();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  const CursorComponent = () => (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ mixBlendMode: 'screen' }}
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] shadow-ba-glow"
        style={{
          boxShadow: '0 0 15px hsla(206, 100%, 60%, 0.8), 0 0 25px hsla(206, 100%, 60%, 0.4)',
        }}
      />
    </>
  );

  return { CursorComponent };
}