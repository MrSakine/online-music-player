import { FC, useEffect, useState } from "react";
import { SongModel } from "../models/SongModel";
import { PlayCircleFilledRounded } from "@mui/icons-material";
import { useAxios } from "../AxiosContextLoader";
import { UrlService } from "../services/UrlService";
import { Button } from "@mui/material";
import { AudioObject } from "../objects/AudioObject";

interface MusicItemProps {
  playlists: Array<AudioObject>;
  item?: SongModel;
  index: number;
  cEvent?: (item?: SongModel) => void;
  // onHover: () => void;
}

const MusicItem: FC<MusicItemProps> = ({ item, playlists, cEvent }) => {
  const [imageBuffer, setImageBuffer] = useState<string | null>(null);
  const axiosService = useAxios();

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const isPlaying = () => {
    const index = playlists.findIndex((e) => e.file === item?.file);
    if (index !== -1) return playlists[index].playing;
    return false;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (item) {
        try {
          const profile = await axiosService.instance.get(
            `${UrlService.getBase()}/music/${item.poster}`,
            { responseType: "arraybuffer" }
          );
          const image = new Blob([profile.data], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(image);
          setImageBuffer(imageUrl);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [axiosService, item]);

  return (
    <div className="music-item">
      <div className="music-item-data">
        {imageBuffer ? (
          <img src={imageBuffer} alt="Music Poster" />
        ) : (
          <p>Loading image...</p>
        )}
        <span>{item?.title}</span>
      </div>
      <div className="music-item-file">
        {isPlaying() ? (
          "Playing..."
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => cEvent?.(item)}
            style={{ minWidth: 0 }}
          >
            <PlayCircleFilledRounded />
          </Button>
        )}
        <span>{item ? formatDuration(item.duration) : <span>....</span>}</span>
      </div>
    </div>
  );
};

export { MusicItem };
