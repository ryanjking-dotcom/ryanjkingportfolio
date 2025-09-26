import { useEffect, useRef, useState } from 'react';

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Check if hovering over a button
      const target = e.target as HTMLElement;
      const isButton = target?.tagName === 'BUTTON' || target?.closest('button');
      setIsHoveringButton(!!isButton);

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
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
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999]"
      style={{
        boxShadow: isHoveringButton 
          ? '0 0 15px hsla(60, 100%, 60%, 0.8), 0 0 25px hsla(60, 100%, 60%, 0.4)' // Neon yellow glow
          : '0 0 15px hsla(206, 100%, 60%, 0.8), 0 0 25px hsla(206, 100%, 60%, 0.4)', // Blue glow
        backgroundColor: isHoveringButton ? 'hsl(60, 100%, 70%)' : undefined,
      }}
    />
  );

  return { CursorComponent };
}