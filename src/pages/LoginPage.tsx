import { Button, FormControl, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import TogglePassword from "../components/TogglePassword";
import { useAxios } from "../AxiosContextLoader";
import { UrlService } from "../services/UrlService";
import { TokenResponse } from "../responses/TokenResponse";
import { LocalStorageService } from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { ToastService } from "../services/ToastService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosService = useAxios();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (emailError || passwordError) return;
      e.preventDefault();
      setLoading(true);
      const endpoint = UrlService.getLogin();
      const data = { mail: email, password };
      console.log("Login data:", data);
      const res = await axiosService.instance.post(endpoint, data);
      const successLogin = res.data as TokenResponse;
      ToastService.success(successLogin.message);
      LocalStorageService.saveToken(successLogin.accessToken);
      navigate('/music');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-page" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <FormControl fullWidth margin="dense">
        <TextField
          fullWidth
          variant="filled"
          id="mail"
          label="Email"
          margin="dense"
          type="email"
          value={email}
          onChange={handleEmailChange}
          helperText={emailError}
          error={!!emailError}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          fullWidth
          variant="filled"
          id="password"
          label="Password"
          margin="dense"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          helperText={passwordError}
          error={!!passwordError}
          slotProps={{
            input: {
              endAdornment: (
                <TogglePassword
                  showPassword={showPassword}
                  onToggle={handleTogglePassword}
                />
              ),
            },
          }}
          required
        />
      </FormControl>
      <div className="submit-btn">
        <Button
          variant="outlined"
          size="large"
          type="submit"
          disabled={!!emailError || !!passwordError || loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
      <div className="notice">
        <span>
          Don't you have an account ? You can create one{" "}
          <Link href="/signup">here</Link>
        </span>
      </div>
    </form>
  );
};

export default LoginPage;
