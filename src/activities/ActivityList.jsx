import { NavLink } from "react-router-dom";

export default function ActivityList({ activities }) {
  return (
    <ul className="activities-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <NavLink to={`/activities/${activity.id}`} className="activity-name">
            {activity.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
