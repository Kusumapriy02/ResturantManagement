import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove logged-in user
    localStorage.removeItem("user");

    // Go back to Home page
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;