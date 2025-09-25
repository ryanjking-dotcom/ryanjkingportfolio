import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isVisible: boolean;
}

export const MusicPlayer = ({ isVisible }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
      audio.loop = true;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
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
      <audio ref={audioRef} src="/assets/FutureBossaLofi.mp3" />
      
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