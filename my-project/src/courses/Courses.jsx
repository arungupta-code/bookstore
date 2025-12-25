import React from 'react'
import Course from '../component/Course'
import Navbaar from '../component/Navbaar'
import Footer from '../component/Footer'

function Courses() {
  return (<>
     <Navbaar/>
    <div>
      <Course/>
    </div>
    <Footer/>
    </>
  )
}

export default Courses
