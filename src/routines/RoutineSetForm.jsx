import { useEffect, useState } from "react";
import { getActivities } from "../api/activities";

export default function RoutineSetForm({ routineId, onSubmit }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  async function loadActivities() {
    try {
      setError(null);
      const data = await getActivities();
      setActivities(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <>
      {error && <p role="alert">{error}</p>}

      <form action={onSubmit} className="set-form">
        <label>
          Activity
          <select name="activityId" required>
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Reps
          <input type="number" name="reps" min="1" required />
        </label>

        <button>Add Set</button>
      </form>
    </>
  );
}
