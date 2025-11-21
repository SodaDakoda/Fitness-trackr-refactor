import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails";
import Error404 from "./Error404.jsx";

import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetails from "./routines/RoutineDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Activities */}
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:id" element={<ActivityDetails />} />

        {/* Routines */}
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="routines/:id" element={<RoutineDetails />} />

        {/* Auth */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Catch-all */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
