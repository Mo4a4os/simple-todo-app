import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ListTodo } from "lucide-react";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  if (authUser) {
    return (
      <div className="navbar bg-base-200 shadow-lg   ">
        <div className="navbar-start">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm btn-xs md:btn-md lg:btn-lg"
            }
            to="/"
          >
            <ListTodo />
            Todo App
          </NavLink>
        </div>
        <div className="navbar-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm btn-xs md:btn-md lg:btn-lg"
            }
            to="/todo"
          >
            Todos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm btn-xs md:btn-md lg:btn-lg"
            }
            to="/Create-todo"
          >
            Create Todo
          </NavLink>
        </div>
        <div className="navbar-end">
          <div >
            <label className="md:text-md lg:text-lg text-sm hidden sm:inline-block mr-3 ">{authUser?.username}</label>
            <div className="avatar hidden sm:inline-block mr-3 avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8  rounded-full">
                <span className="text-xs">{authUser?.username[0]}</span>
              </div>
            </div>
          </div>

          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-base-200 shadow-lg   ">
        <div className="navbar-start">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to="/"
          >
            <ListTodo />
            Todo App
          </NavLink>
        </div>
        <div className="navbar-end">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg mr-4"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg mr-4"
            }
            to={"/login"}
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/signup"}
          >
            Signup
          </NavLink>
        </div>
      </div>
    );
  }

  {
    /*if (authUser) {
    return (
      <div className="bg-base-200 shadow-lg border-b-gray-800 ">
        <div className="flex justify-between p-6 md:mx-30">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/todo"}
          >
            Todos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline  sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/"}
          >
            Simple Todo App
          </NavLink>
          <button
            className="btn  sm:btn-sm md:btn-md lg:btn-lg"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-base-200 shadow-lg border-b-gray-800 ">
        <div className="flex justify-between p-6 md:mx-30">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/login"}
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline  sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/"}
          >
            Simple Todo App
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline sm:btn-sm md:btn-md lg:btn-lg"
                : "btn  sm:btn-sm md:btn-md lg:btn-lg"
            }
            to={"/signup"}
          >
            Signup
          </NavLink>
        </div>
      </div>
    );
  } */
  }
};

export default Navbar;
