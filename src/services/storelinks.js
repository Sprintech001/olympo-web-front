import { writable } from 'svelte/store';

export const selectedExerciseId = writable(null);

export const exercisesStore = writable([]);

export const sessionStore = writable([]);

export const previousRoute = writable(null);

export function setSelectedExercise(id) {
    selectedExerciseId.set(id);
}

export function setPreviousRoute(route) {
    previousRoute.set(route);
}

export function addExercise(exercise) {
    exercisesStore.update(exercises => [...exercises, exercise]);
}

export function removeExercise(id) {
    exercisesStore.update(exercises => exercises.filter(ex => ex.id !== id));
}

