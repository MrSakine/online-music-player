import { useEffect, useState } from "react";
import { AlbumModel } from "../models/AlbumModel";
import { SingleModel } from "../models/SingleModel";
import { useAxios } from "../AxiosContextLoader";
import { UrlService } from "../services/UrlService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../services/LocalStorageService";

const MusicPage = () => {
  const [albums, setAlbums] = useState<Array<AlbumModel>>([]);
  const [singles, setSingles] = useState<Array<SingleModel>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const axiosService = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumResponse, singlesResponse] = await Promise.all([
          axiosService.instance.get(UrlService.getAlbums()),
          axiosService.instance.get(UrlService.getSingles()),
        ]);
        setAlbums(albumResponse.data.data);
        setSingles(singlesResponse.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to load albums/singles:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [error, axiosService.instance]);

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

  console.log(albums);
  console.log(singles);

  return (
    <div>
      <h2>Music Page</h2>
    </div>
  );
};

export default MusicPage;
