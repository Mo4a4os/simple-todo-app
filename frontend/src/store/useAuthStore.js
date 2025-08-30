import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  logout: async () => {
    try {
        await axiosInstance.post('/auth/logout')
        set({authUser: null});
        toast.success("Logged out!")
    } catch (error) {
        toast.error(error.response.data.message)
    }
  },
  login: async (data) => {
   try {
    const res = await axiosInstance.post('/auth/login', data)
    set({authUser:res.data});
    toast.success("Logged in!")
   } catch (error) {
    toast.error(error.response.data.message)
   }
  },
  
}));
