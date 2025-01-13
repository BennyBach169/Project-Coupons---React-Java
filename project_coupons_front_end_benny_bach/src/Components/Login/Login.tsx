import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import "./Login.css";
import React, { useState, FormEvent } from "react";
import { CheckBox } from "@mui/icons-material";
import { ClientType } from "../../models/ClientType";
import loginService from "../../services/LoginService";
import { useNavigate } from "react-router-dom";
import { resolve } from "path";
import { authStore, login } from "../../Redux/AuthStore";
import { showErrorToast, showSuccessToast } from "../ToastNotifications";

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [clientType, setClientType] = useState<string>("CUSTOMER");

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }
  function handleclientType(event: React.ChangeEvent<HTMLInputElement>) {
    setClientType(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    loginService
      .login(clientType, email, password)
      .then((res) => {
        showSuccessToast("Logged in successfully!")
        sessionStorage.setItem("token", res.data);
        authStore.dispatch(login(res.data));
            navigate('/coupons');
      })
      .catch((err) => {
        showErrorToast(err.response?.data || "An error occurred");
      });
  }

  return (
    <div className="Login">
      <h2 className="header">Welcome Back</h2>
      <div className="loginContainer">
        <form onSubmit={handleSubmit}>
          <h3>Please Login</h3>
          <div style={{
            display:'flex',
            flex:'row'
          }}>
              <label className="label">
                <input type="radio" name="client-type" value="CUSTOMER" required onChange={handleclientType} defaultChecked/>
                Customer
                <input type="radio" name="client-type" value="COMPANY" required onChange={handleclientType}/>
                Company
                <input type="radio" name="client-type" value="ADMINISTRATOR" required onChange={handleclientType}/>
                Admin
              </label>
          </div>
          <TextField
            label="Email"
            variant="outlined"
            required
            onChange={handleEmail}
            autoComplete="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            required
            type="password"
            onChange={handlePassword}
            autoComplete="current-password"
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "var(--secondary-color)",
            }}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
}
