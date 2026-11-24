import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";

function App() {
  return (
    <Routes>
      
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;