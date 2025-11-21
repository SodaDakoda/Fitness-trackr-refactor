import { useAuth } from "../auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <p>Fitness Trackr</p>

      <nav>
        <NavLink
          to="/activities"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Activities
        </NavLink>

        <NavLink
          to="/routines"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Routines
        </NavLink>

        {token ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
