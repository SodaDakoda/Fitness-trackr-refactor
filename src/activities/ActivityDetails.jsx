import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivityById, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  async function loadActivity() {
    try {
      setError(null);
      const data = await getActivityById(id);
      setActivity(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadActivity();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteActivity(token, id);
      navigate("/activities");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <>
      <h1>{activity.name}</h1>

      <p>{activity.description}</p>

      <p>
        <strong>Created by:</strong> {activity.creatorName}
      </p>

      {token && (
        <button onClick={handleDelete} className="btn-danger">
          Delete Activity
        </button>
      )}
    </>
  );
}
