import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 1. Define the onSubmit function to handle the data
  const onSubmit = (data) => {
    console.log(data);
    // You can add your logic here to authenticate the user
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          {/* 2. Wrap all inputs and buttons inside the form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <Link 
              to={"/"} 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >✕</Link>
            
            <h3 className="font-bold text-lg">Login</h3>

            {/* Email */}
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input 
                type="email"
                placeholder='enter your email' 
                className='w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-800'
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Password */}
            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input 
                type="password" // Changed to password type for security
                placeholder='enter your password' 
                className='w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-800'
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Buttons */}
            <div className='flex justify-around mt-6'>
              <button 
                type="submit" // Explicitly set type to submit
                className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'
              >
                Login
              </button>
              <p>Not registered?{" "} 
                <Link to={"/signup"} className='underline text-blue-400 cursor-pointer'>Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;