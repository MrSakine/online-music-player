import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ textAlign: "center" }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Online Music Player
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Stream music anywhere, anytime
      </Typography>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={login}
        >
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={signup}>
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
