import { useAuth } from "../auth/AuthContext";

export default function RoutineSetList({ routineId, sets, onDelete }) {
  const { token } = useAuth();

  if (!sets || sets.length === 0) {
    return <p>This routine has no sets yet. Add one below!</p>;
  }

  return (
    <ul className="routine-sets-list">
      {sets.map((set) => (
        <li key={set.id} className="routine-set-item">
          <span>
            {set.activityName || set.activity?.name || "Activity"} – {set.reps}{" "}
            reps
          </span>

          {token && (
            <button className="btn-danger" onClick={() => onDelete(set.id)}>
              Delete Set
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
