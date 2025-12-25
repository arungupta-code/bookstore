import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form" // 1. Import useForm
import Login from './Login'
import Footer from './Footer'

function Signup() {
  // 2. Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 3. Define the onSubmit function
  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically call your API to register the user
  };

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className="relative w-[600px] flex flex-col items-center justify-center p-6 rounded-2xl shadow-md border-[1px] dark:bg-slate-900 dark:text-white">
          
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
          
          <h3 className="font-bold text-2xl">Signup</h3>

          {/* 4. Wrap inputs in a form tag and use handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            
            {/* Name Input */}
            <div className='mt-4 space-y-2 w-full px-10'>
              <span>Name</span>
              <br/>
              <input 
                type="text"
                placeholder='Enter your name' 
                className='w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800 dark:border-slate-700'
                {...register("name", { required: true })} // register name
              />
              <br/>
              {errors.name && <span className='text-sm text-red-500'>Name is required</span>}
            </div>

            {/* Email Input */}
            <div className='mt-4 space-y-2 w-full px-10'>
              <span>Email</span>
              <br/>
              <input 
                type="email"
                placeholder='Enter your email' 
                className='w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800 dark:border-slate-700'
                {...register("email", { required: true })} // register email
              />
              <br/>
              {errors.email && <span className='text-sm text-red-500'>Email is required</span>}
            </div>

            {/* Password Input */}
            <div className='mt-4 space-y-2 w-full px-10'>
              <span>Password</span>
              <br/>
              <input 
                type="password"
                placeholder='Enter your password' 
                className='w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800 dark:border-slate-700'
                {...register("password", { required: true })} // register password
              />
              <br/>
              {errors.password && <span className='text-sm text-red-500'>Password is required</span>}
            </div>

            {/* Buttons Section */}
            <div className='flex justify-between items-center w-full px-10 mt-6'>
              <button className='bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200'>
                Signup
              </button>
              <p className='text-md'>
                Have an account?{" "} 
                <button 
                  type="button" // Use type="button" to prevent form submission on click
                  className='underline text-blue-500 cursor-pointer' 
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Login />
      <Footer/>
    </>
  )
}

export default Signup