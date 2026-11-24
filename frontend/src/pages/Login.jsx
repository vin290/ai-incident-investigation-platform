import { useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {  useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const { login } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    setError("");

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data;

    // Store user and token in AuthContext
    login(user, token);

    // Redirect after successful login
    navigate("/dashboard", { replace: true });

  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Login failed. Please try again."
    );
  }
};

  return (
    <div className="login-container">
      <Paper className="login-card" elevation={3}>
        <Typography variant="h5" fontWeight={700}>
          Welcome Back
        </Typography>

        <Typography color="text.secondary">

          Continue here to access your account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" size="large" fullWidth>
            Sign In
          </Button>
          <Typography align="center">
  Don't have an account?{" "}
  <Link to="/register">Register</Link>
</Typography>
        </form>
      </Paper>
    </div>
  );
}

export default Login;