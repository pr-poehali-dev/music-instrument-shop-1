import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  compact?: boolean;
}

const AudioPlayer = ({ audioUrl, isPlaying, onPlayPause, compact = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => onPlayPause();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayPause]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (compact) {
    return (
      <>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        <Button
          size="icon"
          className="w-12 h-12 rounded-full"
          onClick={onPlayPause}
        >
          <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
        </Button>
      </>
    );
  }

  return (
    <div className="w-full">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={onPlayPause}
          className="flex-shrink-0"
        >
          <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
        </Button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Icon name="Volume2" size={16} className="text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
