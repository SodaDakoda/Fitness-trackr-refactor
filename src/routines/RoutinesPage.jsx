import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getRoutines, createRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import RoutineForm from "./RoutineForm";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  async function loadRoutines() {
    try {
      setError(null);
      const data = await getRoutines();
      setRoutines(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  const handleCreateRoutine = async (formData) => {
    setError(null);
    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await createRoutine(token, { name, goal });
      await loadRoutines();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="routines-page">
      <header>
        <h1>Routines</h1>
      </header>

      {error && <p role="alert">{error}</p>}

      <ul className="routines-list">
        {routines.map((routine) => (
          <li key={routine.id} className="routine-item">
            <NavLink to={`/routines/${routine.id}`} className="routine-name">
              {routine.name}
            </NavLink>
            {routine.creatorName && (
              <span className="routine-creator"> by {routine.creatorName}</span>
            )}
          </li>
        ))}
      </ul>

      {token && (
        <section className="routine-form-section">
          <h2>Create a new routine</h2>
          <RoutineForm onSubmit={handleCreateRoutine} />
        </section>
      )}
    </section>
  );
}
