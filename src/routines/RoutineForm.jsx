export default function RoutineForm({ onSubmit }) {
  return (
    <form action={onSubmit} className="routine-form">
      <label>
        Name
        <input type="text" name="name" required />
      </label>

      <label>
        Goal
        <input type="text" name="goal" required />
      </label>

      <button>Create Routine</button>
    </form>
  );
}
