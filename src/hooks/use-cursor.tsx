import { useEffect, useRef } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
}

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<CursorTrail[]>([]);

  useEffect(() => {
    // Initialize trail positions
    for (let i = 0; i < 10; i++) {
      trailPositions.current.push({ x: 0, y: 0, opacity: 0 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update main cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      // Update trail positions
      trailPositions.current.unshift({ x, y, opacity: 1 });
      if (trailPositions.current.length > 10) {
        trailPositions.current.pop();
      }

      // Update trail elements
      trailsRef.current.forEach((trail, index) => {
        if (trail && trailPositions.current[index]) {
          const position = trailPositions.current[index];
          const delay = index * 50;
          
          setTimeout(() => {
            trail.style.left = `${position.x}px`;
            trail.style.top = `${position.y}px`;
            trail.style.opacity = `${Math.max(0, 1 - index * 0.1)}`;
          }, delay);
        }
      });
    };

    const handleMouseLeave = () => {
      // Hide cursor when leaving window
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      trailsRef.current.forEach(trail => {
        if (trail) trail.style.opacity = '0';
      });
    };

    const handleMouseEnter = () => {
      // Show cursor when entering window
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const CursorComponent = () => (
    <>
      <div ref={cursorRef} className="cursor" />
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          ref={el => el && (trailsRef.current[i] = el)}
          className="cursor-trail"
          style={{ zIndex: 9998 - i }}
        />
      ))}
    </>
  );

  return { CursorComponent };
}