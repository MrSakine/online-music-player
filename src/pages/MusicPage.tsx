import { useEffect, useState } from "react";
import { AlbumModel } from "../models/AlbumModel";
import { SingleModel } from "../models/SingleModel";
import { useAxios } from "../AxiosContextLoader";
import { UrlService } from "../services/UrlService";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../services/LocalStorageService";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import { SongModel } from "../models/SongModel";
import { MusicItem } from "../components/MusicItem";
import { ProfileModel } from "../models/ProfileModel";
import { AudioObject } from "../objects/AudioObject";
import CustomMusicPlayer from "../components/MusicPlayer";

const MusicPage = () => {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  // const [albums, setAlbums] = useState<Array<AlbumModel>>([]);
  // const [singles, setSingles] = useState<Array<SingleModel>>([]);
  const [songs, setSongs] = useState<Array<SongModel>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [playlists, setPlaylists] = useState<Array<AudioObject> | []>([]);
  const [currentSong, setCurrentSong] = useState<AudioObject | null>(null);
  const axiosService = useAxios();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    LocalStorageService.deleteToken();
    handleClose();
    navigate("/login", { replace: true });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getSongs = () => {
    return songs;
  };

  const onMusicItemClickEvent = (item?: SongModel) => {
    setPlaylists(
      playlists.map((e) => {
        return { ...e, playing: e.file === item?.file };
      })
    );
    const index = playlists.findIndex((e) => e.file === item?.file);

    if (index !== -1) {
      setCurrentSong(playlists[index]);
    }
  };

  const skip = (item: AudioObject) => {
    const index = playlists.findIndex((e) => e.file === item.file);
    if (index !== -1) {
      let next = index + 1;
      if (next >= playlists.length) {
        next = 0;
      }

      playlists[index].playing = false;
      playlists[next].playing = true;
      setCurrentSong(playlists[next]);
    }
  };

  const back = (item: AudioObject) => {
    const index = playlists.findIndex((e) => e.file === item.file);
    if (index !== -1) {
      let prev = index - 1;
      if (prev < 0) {
        prev = 0;
      }

      playlists[index].playing = false;
      playlists[prev].playing = true;
      setCurrentSong(playlists[prev]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumResponse, singlesResponse, profileResponse] =
          await Promise.all([
            axiosService.instance.get(UrlService.getAlbums()),
            axiosService.instance.get(UrlService.getSingles()),
            axiosService.instance.get(UrlService.getProfile()),
          ]);
        const albums = albumResponse.data.data as Array<AlbumModel>;
        const singles = singlesResponse.data.data as Array<SingleModel>;
        const profile = profileResponse.data.data as ProfileModel;
        let total: Array<SongModel> = [];

        albums.forEach((e) => {
          e.tracks.forEach((x) => {
            total.push({
              title: x.title,
              poster: e.poster,
              file: x.file,
              duration: x.duration,
            });
          });
        });

        singles.forEach((e) => {
          total.push({
            title: e.title,
            poster: e.poster,
            file: e.tracks[0],
            duration: e.duration,
          });
        });

        total = shuffleArray(total);
        const totalCopy = [...total];

        const totalPlaylists: Array<AudioObject> = await Promise.all(
          totalCopy.map(async (t, i) => {
            const [musicResponse, posterResponse] = await Promise.all([
              axiosService.instance.get(
                `${UrlService.getBase()}/music/${t.file}`,
                { responseType: "arraybuffer" }
              ),
              axiosService.instance.get(
                `${UrlService.getBase()}/music/${t.poster}`,
                { responseType: "arraybuffer" }
              ),
            ]);
            const musicBlob = new Blob([musicResponse.data], {
              type: "audio/mpeg",
            });
            const musicUrl = URL.createObjectURL(musicBlob);

            const image = new Blob([posterResponse.data], {
              type: "image/jpeg",
            });
            const imageUrl = URL.createObjectURL(image);

            return {
              src: musicUrl,
              id: i + 1,
              file: t.file,
              title: t.title,
              poster: imageUrl,
            };
          })
        );

        setProfile(profile);
        // setAlbums(albums);
        // setSingles(singles);
        setSongs(total);
        setPlaylists(totalPlaylists);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to load albums/singles:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [error, axiosService]);

  useEffect(() => {
    if (error) {
      const url = String(error.request.responseURL);
      if (
        (url.includes("music") || url.includes("profile")) &&
        error.response?.status === 401
      ) {
        LocalStorageService.deleteToken();
        navigate("/login", { replace: true });
      }
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <div className="music-page">
      {/* <h2>Online music player</h2> */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online music player
          </Typography>
          <div className="music-page-profile">
            <span>{profile?.fullname}</span>
            <span>{profile?.mail}</span>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        {currentSong ? (
          <CustomMusicPlayer
            currentItem={currentSong}
            skip={skip}
            back={back}
          />
        ) : (
          <p>Click on a song to load the player</p>
        )}
      </div>
      <List>
        {getSongs().map((song, index) => (
          <MusicItem
            key={index}
            item={song}
            index={index}
            playlists={playlists}
            cEvent={onMusicItemClickEvent}
          />
        ))}
      </List>
    </div>
  );
};

export default MusicPage;
