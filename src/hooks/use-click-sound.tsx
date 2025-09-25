import { useRef, useCallback } from 'react';

export const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/bluearchive-click-sound.mp3');
      audioRef.current.volume = 0.3; // Lower volume for click sounds
    }
    
    audioRef.current.currentTime = 0; // Reset to start for rapid clicks
    audioRef.current.play().catch(console.error);
  }, []);

  return playClickSound;
};