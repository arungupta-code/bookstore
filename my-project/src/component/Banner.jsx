import React from 'react'
import banner from "../../public/banner.jpg"

const Banner = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center py-10'>
      
      {/* Text Section */}
      <div className='w-full md:w-1/2 mt-12 md:mt-32 order-2 md:order-1'>
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold'>
            HELLO, WELCOME HERE TO LEARN SOMETHING{" "}
            <span className='text-pink-500'>new everyday</span>
          </h1>

          <p className='text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <label className="input w-full flex items-center gap-2">
            <svg className="size-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            </svg>
            <input type="text" className="grow" placeholder="email" />
          </label>

          <button className="btn btn-secondary">Secondary</button>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full md:w-1/2 flex justify-center order-1'>
        <img
          src={banner}
          alt="Banner"
          className="w-full max-w-lg h-auto object-contain"
        />
      </div>

    </div>
  )
}

export default Banner
