// Signup.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Login from './Login';
import Footer from './Footer';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/Authprovider';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      // Signup API
      const res = await axios.post('http://localhost:5003/api/user/signup', userInfo);

      if (res.data) {
        toast.success('Signup successful!');

        // ✅ Store both user info and token
        const signedUpUser = {
          ...res.data.user,
          token: res.data.token,  // Store JWT token
        };
        localStorage.setItem("user", JSON.stringify(signedUpUser));
        setAuthUser(signedUpUser);

        // Navigate to previous page or home
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error('Error: ' + err.response.data.message);
      } else {
        toast.error('Signup failed. Check server.');
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4 py-8">
        <div className="relative w-full max-w-2xl p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</Link>
          <h3 className="font-bold text-3xl text-center">Create Account</h3>
          <p className="text-center text-slate-500 dark:text-slate-300 mt-1">Create your account to continue.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Name */}
            <div className="mt-6 space-y-2 w-full px-4 md:px-8">
              <span className="text-sm font-medium">Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-pink-400"
                {...register('fullname', { required: true })}
              />
              {errors.fullname && <span className="text-sm text-red-500">Name is required</span>}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2 w-full px-4 md:px-8">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-pink-400"
                {...register('email', { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500">Email is required</span>}
            </div>

            <div className="mt-4 space-y-2 w-full px-4 md:px-8">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-pink-400"
                {...register('password', { required: true })}
              />
              {errors.password && <span className="text-sm text-red-500">Password is required</span>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 w-full px-4 md:px-8 mt-8">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-xl px-5 py-2.5 hover:bg-pink-700 duration-200 disabled:opacity-60"
              >
                Signup
              </button>
              <p className="text-md">
                Have an account?{' '}
                <button
                  type="button"
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => document.getElementById('my_modal_3').showModal()}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Login />
      <Footer />
    </>
  );
}

export default Signup;