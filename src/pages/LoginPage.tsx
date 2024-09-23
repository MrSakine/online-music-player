import { Button, FormControl, Link, TextField } from "@mui/material";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
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
          required
        />
        <p
          style={{
            cursor: "pointer",
            marginTop: "5px",
            display: "block",
          }}
          onClick={handleClickShowPassword}
        >
          {showPassword ? "Hide password" : "Show password"}
        </p>
      </FormControl>
      <div className="submit-btn">
        <Button variant="outlined" size="large" type="submit">
          Submit
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
