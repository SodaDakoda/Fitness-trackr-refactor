import { useState, useEffect } from "react";
import { getActivities, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  async function handleDelete(id) {
    try {
      setError(null);
      await deleteActivity(token, id);
      await syncActivities();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="activities-page">
      <header className="activities-header">
        <h1>Activities</h1>
      </header>

      {error && <p role="alert">{error}</p>}

      <div className="activities-layout">
        <ActivityList activities={activities} onDelete={handleDelete} />

        <section className="activity-form-section">
          <h2>Add Activity</h2>
          <ActivityForm syncActivities={syncActivities} />
        </section>
      </div>
    </main>
  );
}
