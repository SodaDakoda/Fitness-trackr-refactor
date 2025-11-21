import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRoutineById,
  deleteRoutine,
  addSetToRoutine,
  deleteSet,
} from "../api/routines";
import { useAuth } from "../auth/AuthContext";

import RoutineSetForm from "./RoutineSetForm";
import RoutineSetList from "./RoutineSetList";

export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  async function loadRoutine() {
    try {
      setError(null);
      const data = await getRoutineById(id);
      setRoutine(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadRoutine();
  }, [id]);

  async function handleDeleteRoutine() {
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleAddSet(formData) {
    setError(null);

    const activityId = formData.get("activityId");
    const reps = Number(formData.get("reps"));

    try {
      await addSetToRoutine(token, id, { activityId, reps });
      await loadRoutine();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDeleteSet(setId) {
    try {
      setError(null);
      await deleteSet(token, id, setId);
      await loadRoutine();
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) return <p role="alert">{error}</p>;
  if (!routine) return <p>Loading...</p>;

  return (
    <>
      <button
        className="btn-secondary"
        onClick={() => navigate("/routines")}
        style={{ marginBottom: "16px" }}
      >
        ← Back to Routines
      </button>

      <section className="card routine-details-card">
        <div className="title-bar">
          <h1>{routine.name}</h1>

          {token && (
            <button className="btn-danger" onClick={handleDeleteRoutine}>
              Delete Routine
            </button>
          )}
        </div>

        <p>{routine.goal}</p>

        <p className="routine-meta">
          <strong>Created by:</strong> {routine.creatorName}
        </p>

        <section className="routine-sets-section card">
          <h2>Sets</h2>

          <RoutineSetList
            routineId={routine.id}
            sets={routine.sets}
            onDelete={handleDeleteSet}
          />
        </section>

        {token && (
          <section className="routine-add-set-section form-card">
            <h3>Add a Set</h3>
            <RoutineSetForm routineId={routine.id} onSubmit={handleAddSet} />
          </section>
        )}
      </section>
    </>
  );
}
