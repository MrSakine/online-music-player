import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MusicPage from "./pages/MusicPage";
import { ThemeProvider } from "@mui/material";
import customTheme from "./customTheme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/music" element={<MusicPage />}></Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
