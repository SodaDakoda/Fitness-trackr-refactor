import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities, onDelete }) {
  const { token } = useAuth();

  return (
    <ul className="activities-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <span className="activity-name">{activity.name}</span>

          {token && (
            <button
              className="btn-danger"
              onClick={() => onDelete(activity.id)}
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
