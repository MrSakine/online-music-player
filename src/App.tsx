import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MusicPage from "./pages/MusicPage";
import { ThemeProvider } from "@mui/material";
import customTheme from "./customTheme";
import { AxiosProvider } from "./AxiosContext";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AxiosProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/music" element={<MusicPage />}></Route>
          </Routes>
        </Router>
        <ToastContainer />
      </AxiosProvider>
    </ThemeProvider>
  );
}

export default App;
