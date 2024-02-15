import React from 'react'
import {ThreeCircles}  from "react-loader-spinner"

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ThreeCircles 
      type="Circles"
      color="#00BFFF"
      height={80}
      width={80}
      className="m-5"
      />
      <p className="text-lg text-center px-2 mt-8 ">{message}</p>
    </div>
  )
}

export default Spinner
