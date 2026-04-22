import { create } from "zustand";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("mystartup.user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const useUserStore = create((set) => ({
  user: getStoredUser(),

  setUser: (userData) => {
    localStorage.setItem("mystartup.user", JSON.stringify(userData));
    set({ user: userData });
  },

  clearUser: () => {
    localStorage.removeItem("mystartup.user");
    set({ user: null });
  },
}));

export default useUserStore;
