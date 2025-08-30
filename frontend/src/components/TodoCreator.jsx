import React, { useEffect, useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import toast from "react-hot-toast";
const TodoCreator = () => {
  const [text, setText] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [category, setCategory] = useState("No");
  const { createTodo } = useTodoStore();
  const handleSumbit = (e) => {
    e.preventDefault();
    if (!text) return toast.error("Please enter a text");
    if (category === "Custom Category...") {
      createTodo({ text, category: customCategory });
      setText("");
    } else {
      createTodo({ text, category });
      setText("");
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl border p-4">
        <legend className="fieldset-legend text-sm md:text-xl">
          Create Todo
        </legend>

        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="textarea w-full"
          value={text}
          placeholder="Enter todo text"
        ></textarea>
        <p>Select a Category</p>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          defaultValue="No"
          className="select w-full"
        >
          <option disabled={true}>Select a category</option>
          <option>No</option>
          <option>Home</option>
          <option>Work</option>
          <option>Custom Category...</option>
        </select>
        {category === "Custom Category..." && (
          <div>
            <input
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Create custom category"
              className="input w-full"
            ></input>
          </div>
        )}
        <button onClick={handleSumbit} className="btn">
          Create Todo
        </button>
      </fieldset>
    </div>
  );
};

export default TodoCreator;
