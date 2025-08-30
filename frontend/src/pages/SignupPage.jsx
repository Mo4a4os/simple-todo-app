import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {signup} = useAuthStore();
  const validateForm = () => {
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    signup({username, password})
    
  };

  return (
    <div className="text-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div>
          <div className="my-3">
          <label className="label mb-3">
            <span>Username:</span>
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="input input-bordered w-full"
          />
          <p className="label text-sm">Username should be unique</p>
          </div>
          
          <label className="label">
            <span>Password:</span>
          </label>
          <div className="my-3"><div className="join w-full ">
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
          <p className="text-sm label">Password should be at least 6 letters</p></div>
          

          <button className="btn w-full" type="submit">
            Signup
          </button>
          <label className="mt-1 label">
            Already have an account?{" "}
            <Link className="text-primary" to={"/login"}>
              Login
            </Link>{" "}
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
