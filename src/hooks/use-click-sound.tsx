import { useRef, useCallback } from 'react';

export const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = useCallback(() => {
    if (!audioRef.current) {
      const isGithubPages = import.meta.env.PROD && window.location.hostname.endsWith('github.io');
      const repo = window.location.pathname.split('/').filter(Boolean)[0];
      const base = isGithubPages && repo ? `/${repo}/` : '/';

      audioRef.current = new Audio(`${base}assets/bluearchive-click-sound.mp3`);
      audioRef.current.volume = 0.6; // Increased volume for click sounds
    }
    
    audioRef.current.currentTime = 0; // Reset to start for rapid clicks
    audioRef.current.play().catch(console.error);
  }, []);

  return playClickSound;
};