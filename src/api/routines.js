const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(`${API}/routines`);
    const result = await response.json();
    if (!response.ok) throw Error(result.message || "Failed to fetch routines");
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getRoutineById(id) {
  const response = await fetch(`${API}/routines/${id}`);
  const data = await response.json();
  if (!response.ok) throw Error(data.message || "Failed to fetch routine");
  return data;
}

export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(`${API}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  const result = await response.json();
  if (!response.ok) throw Error(result.message || "Failed to create routine");
  return result;
}

export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(`${API}/routines/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 204) return { success: true };

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw Error(result?.message || "Failed to delete routine");
  }

  return result;
}

export async function addSetToRoutine(token, routineId, setData) {
  if (!token) {
    throw Error("You must be signed in to add a set.");
  }

  const response = await fetch(`${API}/routines/${routineId}/sets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(setData),
  });

  const result = await response.json();
  if (!response.ok) throw Error(result.message || "Failed to add set");
  return result;
}

export async function deleteSet(token, routineId, setId) {
  if (!token) {
    throw Error("You must be signed in to delete a set.");
  }

  const response = await fetch(`${API}/routines/${routineId}/sets/${setId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 204) return { success: true };

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw Error(result?.message || "Failed to delete set");
  }

  return result;
}
