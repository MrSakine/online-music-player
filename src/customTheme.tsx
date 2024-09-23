import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'lightblue',
          '&:hover': {
            backgroundColor: '#eee',
          },
          '&.Mui-focused': {
            backgroundColor: 'lightblue',
          },
        },
      },
    },
  },
});

export default customTheme;