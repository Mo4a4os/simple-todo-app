import React, { useEffect } from "react";
import TodoCreator from "../components/TodoCreator";
import { useAuthStore } from "../store/useAuthStore";
import { useTodoStore } from "../store/useTodoStore";
import { Loader, Trash } from "lucide-react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const { authUser } = useAuthStore();

  const { todos, getTodos, isGettingTodos, deleteTodo, updateTodoDone } =
    useTodoStore();
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  if (isGettingTodos) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  const changedTodos = todos.toReversed().slice(0, 3);
  return (
    <div className="text-center  mt-10">
      <p className="font-bold text-shadow-lg/20 text-6xl">Todo App</p>
      <p className="mt-0.5 label">Simple todo site with database</p>

      {authUser ? (
        <div>
          <h2 className="text-2xl my-4">Welcome back, {authUser.username}!</h2>
          <div className="flex justify-center">
            <TodoCreator />
          </div>
          <p className="font-bold my-3 text-2xl">Last 3 todos</p>
          <div className="flex justify-center  mt-2">
            {todos.length === 0 ? (
              <div className="mt-2 flex justify-center">
                <p className="label">
                  Looks like you haven't created any todos yet...{" "}
                  <Link to="/create-todo" className="text-primary">
                    You can create it here
                  </Link>
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto w-full mx-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Done?</th>
                      <th>Text</th>
                      <th>Category</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changedTodos.map((todo) => (
                      <tr
                        className={todo.isDone ? "opacity-10" : ""}
                        key={todo._id}
                      >
                        <th>
                          <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() =>
                              updateTodoDone(todo._id, !todo.isDone)
                            }
                            className="checkbox"
                          />
                        </th>
                        <td>{todo.text}</td>
                        <td>{todo.category}</td>
                        <td>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="btn btn-square border-red-800 bg-red-600 sm:btn-sm md:btn-md"
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btn mt-3">
                  <Link to="/todo" className="">
                    See all
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link to={"/login"}>
          <h2 className="text-2xl text-primary my-4">
            Please log in to create and see todos.
          </h2>
        </Link>
      )}
    </div>
  );
};

export default HomePage;
