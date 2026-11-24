import { Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h4">
        Welcome, {user?.name}!
      </Typography>
    </div>
  );
}

export default Dashboard;