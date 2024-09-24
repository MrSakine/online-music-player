import { Button, FormControl, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import TogglePassword from "../components/TogglePassword";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../AxiosContextLoader";
import { UrlService } from "../services/UrlService";
import { BaseResponse } from "../responses/BaseResponse";
import { ToastService } from "../services/ToastService";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosService = useAxios();
  const navigate = useNavigate();

  const validateFullname = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullname(value);
    if (!validateFullname(value)) {
      setFullnameError("Full name is required");
    } else {
      setFullnameError("");
    }
  };

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
      if (fullnameError || emailError || passwordError) return;
      e.preventDefault();
      setLoading(true);
      const endpoint = UrlService.getSignUp();
      const data = { fullname, mail: email, password };
      const res = await axiosService.instance.post(endpoint, data);
      const successSignUp = res.data as BaseResponse;
      ToastService.success(successSignUp.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-page" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <FormControl fullWidth margin="dense">
        <TextField
          variant="filled"
          id="fullname"
          label="Full Name"
          type="text"
          autoComplete="off"
          value={fullname}
          onChange={handleFullnameChange}
          helperText={fullnameError}
          error={!!fullnameError}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          variant="filled"
          id="mail"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          helperText={emailError}
          error={!!emailError}
          autoComplete="off"
          required
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          variant="filled"
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          helperText={passwordError}
          error={!!passwordError}
          autoComplete="off"
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
          disabled={
            !!fullnameError || !!emailError || !!passwordError || loading
          }
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
      <div className="notice">
        <span>
          Have an account ? Login <Link href="/login">here</Link>
        </span>
      </div>
    </form>
  );
};

export default SignupPage;
