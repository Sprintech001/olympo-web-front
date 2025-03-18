import { writable } from 'svelte/store';

// Armazena o ID do exercício selecionado
export const selectedExerciseId = writable(null);

// Armazena a lista de exercícios
export const exercisesStore = writable([]);

// Armazena a rota anterior
export const previousRoute = writable(null);

// Função para definir o exercício selecionado
export function setSelectedExercise(id) {
    selectedExerciseId.set(id);
}

// Função para definir a rota anterior
export function setPreviousRoute(route) {
    previousRoute.set(route);
}

// Função para adicionar um exercício à lista
export function addExercise(exercise) {
    exercisesStore.update(exercises => [...exercises, exercise]);
}

// Função para remover um exercício pelo ID
export function removeExercise(id) {
    exercisesStore.update(exercises => exercises.filter(ex => ex.id !== id));
}
