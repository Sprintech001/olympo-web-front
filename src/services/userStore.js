import { writable } from 'svelte/store';

let user = null;

if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user')) || null;
}

export function getUser() {
    return user;
}

export function setUser(newUser) {
    user = newUser;
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export function clearUser() {
    user = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
}

function createUserStore() {
  const initialUser = getUser();

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
    login: (user) => {
      setUser(user);
      set(user);
    },
    logout: () => {
      clearUser();
      set(null);
    },
  };
}

console.log(getUser());

export const userStore = createUserStore();
