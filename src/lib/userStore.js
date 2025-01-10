import { writable } from 'svelte/store';

function createUserStore() {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
    login: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set(user);
    },
    logout: () => {
      localStorage.removeItem('user');
      set(null);
    },
  };
}

export const userStore = createUserStore();
