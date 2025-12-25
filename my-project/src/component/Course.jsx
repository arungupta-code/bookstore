import React from 'react'
import Cards from './Cards'
import list from '../../public/list.json'
import {Link} from 'react-router-dom'
function Course() {
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div className='mt-28 items-centre justify-centre text-centre'>
        <h1 className='text-2xl md:text-4xl'>
          we are delight to have you{" "}
          <span className='text-pink-500'>here!!</span>
        </h1>
        <p className='mt-12'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt facere fugit quia culpa veritatis. Eligendi sed perspiciatis sint porro incidunt quasi eum hic autem distinctio minus deleniti, commodi nobis voluptatum repellat omnis.
        </p>
        <Link to={'/'}>
        <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button></Link>
      </div>
      <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
        {  list.map((item)=>(
              <Cards key={item.id} item={item}/>
        ))
         
        }
      </div>
    </div>
    </>
  )
}

export default Course
