import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useTodoStore = create((set) => ({
    todos: [],
    isGettingTodos: false,
    getTodos: async () => {
        set({ isGettingTodos: true });
        try {
            const res = await axiosInstance.get("/todo");
            set({ todos: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isGettingTodos: false });
        }
    },
    createTodo: async (data) => {
        try {
            const res = await axiosInstance.post("/todo/send", data);
            set((state) => ({ todos: [res.data, ...state.todos] }));
            toast.success("Todo created!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    deleteTodo: async (id) => {
        try {
            await axiosInstance.delete(`/todo/delete/${id}`);
            set((state) => ({ todos: state.todos.filter((todo) => todo._id !== id) }));
            toast.success("Todo deleted!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateTodoText: async (id, text) => {
        try {
            await axiosInstance.patch(`/todo/text/${id}`, { text });
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? { ...todo, text } : todo
                ),
            }));
            toast.success("Todo updated!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateTodoCategory: async (id, category) => {
        try {
            await axiosInstance.patch(`/todo/category/${id}`, { category });
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? { ...todo, category } : todo
                ),
            }));
            toast.success("Todo category updated!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    updateTodoDone: async (id, isDone) => {
        try {
            await axiosInstance.patch(`/todo/done/${id}`, { isDone });
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? { ...todo, isDone } : todo
                ),
            }));
            toast.success("Todo status updated!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
}))