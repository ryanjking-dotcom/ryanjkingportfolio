import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { globalAudioManager } from '@/utils/globalAudio';

interface MusicPlayerProps {
  isVisible: boolean;
}

export const MusicPlayer = ({ isVisible }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Use global audio instance
    audioRef.current = globalAudioManager.getInstance();
    
    console.log('MusicPlayer mounted, isVisible:', isVisible);

    // Set up event listeners
    const audio = audioRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Initial state sync
    setIsPlaying(!audio.paused);
    setVolume(audio.volume * 100);
    setIsMuted(audio.muted);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      console.log('MusicPlayer unmounted');
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
      // state will sync via play/pause event listeners
    } catch (err) {
      console.error('Music playback blocked or failed:', err);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value[0] / 100;
    }
  };

  return (
    <div className={`absolute top-12 right-0 z-50 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
      {/* No audio element here - using global instance */}
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="h-8 w-8 p-0"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <div className="w-20">
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>
        
        <span className="text-xs text-muted-foreground min-w-[2rem]">
          {volume}%
        </span>
      </div>
    </div>
  );
};