import { writable } from 'svelte/store';

function createExercisesStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    setExercises: (exercises) => set(exercises),
    addExercise: (exercise) => update((exercises) => [...exercises, exercise]),
    removeExercise: (id) => update((exercises) => exercises.filter(exercise => exercise.id !== id))
  };
}

export const exercisesStore = createExercisesStore();