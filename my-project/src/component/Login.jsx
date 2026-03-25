// Login.jsx
import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/Authprovider';

function Login() {
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      // Correct API path for your backend
      const res = await axios.post("http://localhost:5003/api/user/login", userInfo);

      if (res.data) {
        toast.success("Login successful!");

        // Close modal if exists
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();

        // Save user info and token
        const loggedInUser = {
          ...res.data.user,
          token: res.data.token // save JWT
        };
       localStorage.setItem("user", JSON.stringify(loggedInUser));
        setAuthUser(loggedInUser);

        // Redirect directly to home page after login
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Login failed. Check server.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box dark:bg-slate-900 dark:text-white relative rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Link 
                to={"/"} 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3")?.close()}
              >
                ✕
              </Link>

              <h3 className="font-bold text-2xl mb-1 text-center">
                Login
              </h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-300 mb-4">Welcome back to your account.</p>

              {/* Email */}
              <div className='mb-4'>
                <span>Email</span>
                <input
                  type="email"
                  placeholder='Enter your email' 
                  className='w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 mt-1 focus:ring-2 focus:ring-pink-400'
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className='mb-4'>
                <span>Password</span>
                <input
                  type="password"
                  placeholder='Enter your password' 
                  className='w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 mt-1 focus:ring-2 focus:ring-pink-400'
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Buttons */}
              <div className='flex justify-between items-center mt-6'>
                <button 
                  type="submit"
                  className='bg-pink-500 text-white rounded-xl px-5 py-2.5 hover:bg-pink-700 duration-200'
                >
                  Login
                </button>
                <p>
                  Not registered?{" "}
                  <Link to="/signup" className='underline text-blue-400'>
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;