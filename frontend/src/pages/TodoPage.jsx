import React, {  useEffect, useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { Link } from "react-router-dom";
import { Loader, Trash } from "lucide-react";
const TodoPage = () => {
  const { todos, getTodos, isGettingTodos, deleteTodo, updateTodoDone } =
    useTodoStore();

  
  const [filteredTodos, setFilteredTodos] = useState(todos);
  useEffect(() => {
    getTodos();
  }, [getTodos]);
  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);
  const handleCategorySearch = (e) => {
    
    if (e.target.value === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) =>
        todo.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  };

  if (isGettingTodos) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="mt-6 flex justify-center">
        <p>
          Looks like you haven't created any todos yet...{" "}
          <Link to="/create-todo" className="text-primary">
            You can create it here
          </Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <input
        type="text"
        onChange={handleCategorySearch}
        placeholder="Select a category"
        className="input mx-5"
      />
      <div className="flex justify-center mt-2">
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
              {filteredTodos.map((todo) => (
                <tr className={todo.isDone ? "opacity-10" : ""} key={todo._id}>
                  <th>
                    <input
                      type="checkbox"
                      checked={todo.isDone}
                      onChange={() => updateTodoDone(todo._id, !todo.isDone)}
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
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
