import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios.js";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required");
      return;
    }

    try{
        setLoading(true);
        setError("");

        const response = api.post("/auth/register",{ name : name.trim(), email:email.trim(), password })
        console.log("Registration successful:", response.status);
        navigate("/login");


    }catch(error){
        setError(
            error.response?.data?.message || "Registration failed. Please try again."
        );
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Paper className="register-card" elevation={3}>
        <Typography variant="h5" fontWeight={700}>
          Create Account
        </Typography>

        <Typography color="text.secondary">
          Join AI Incident Investigation Platform
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form className="register-form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
</Button>
        </form>
      </Paper>
    </div>
  );
}

export default Register;