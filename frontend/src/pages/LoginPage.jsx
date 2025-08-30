import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/useAuthStore'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuthStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    login({username, password})
   
  };

  return (
    <div className="text-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div>
          <label className="label">
            <span>Username:</span>
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="input input-bordered w-full my-3"
          />

          <label className="label">
            <span>Password:</span>
          </label>
          <div className="join w-full my-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered join-item w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-square join-item"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <button className="btn w-full" type="submit">
            Login
          </button>
          <label className="mt-1 label">
            Dont have an account?{" "}
            <Link className="text-primary" to={"/signup"}>
              Sign Up
            </Link>{" "}
          </label>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
