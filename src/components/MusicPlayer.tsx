import React, { useRef, useState, useEffect } from "react";
import { Box, Slider, Button } from "@mui/material";
import { AudioObject } from "../objects/AudioObject";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  VolumeUp,
} from "@mui/icons-material";

export interface MusicPlayerProps {
  currentItem: AudioObject;
  skip: (currentItem: AudioObject) => void;
  back: (currentItem: AudioObject) => void;
}

const CustomMusicPlayer: React.FC<MusicPlayerProps> = ({
  currentItem,
  skip,
  back,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(Math.floor(audio.currentTime));
      });

      if (currentItem) {
        audio.play();
        setIsPlaying(true);
      }
    }
  }, [audioRef, currentItem]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      const seekTime = newValue as number;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);

      console.log(seekTime, duration);

      if (seekTime >= duration) {
        // skip(currentItem);
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // const rewind = () => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = Math.max(
  //       0,
  //       audioRef.current.currentTime - 10
  //     );
  //   }
  // };

  // const forward = () => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = Math.min(
  //       duration,
  //       audioRef.current.currentTime + 10
  //     );
  //   }
  // };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      <Box display="block">
        <img
          width={80}
          height={80}
          src={currentItem.poster}
          alt="Artist profile"
        />
        <p color="white">{currentItem.title}</p>
      </Box>
      <Box width={500} display="block">
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSeek}
          aria-labelledby="seek-slider"
          sx={{ flex: 1, mx: 2 }}
        />
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={() => back(currentItem)}
            sx={{ mr: 2 }}
          >
            <FastRewind />
          </Button>

          {/* Play/Pause Button */}
          <Button variant="outlined" onClick={togglePlayPause} sx={{ mr: 2 }}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </Button>

          {/* Forward Button */}
          <Button
            variant="outlined"
            onClick={() => skip(currentItem)}
            sx={{ mr: 2 }}
          >
            <FastForward />
          </Button>
        </Box>
      </Box>

      {/* Time Info */}
      <Box display="flex" justifyContent="center" sx={{ mx: 2 }}>
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </Box>

      {/* Volume Control */}
      <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
        <VolumeUp />
        <Slider
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          sx={{ width: 100, ml: 1 }}
        />
      </Box>

      {/* Native Audio Element */}
      {currentItem && (
        <audio ref={audioRef} src={currentItem.src} preload="auto" />
      )}
    </Box>
  );
};

export default CustomMusicPlayer;
