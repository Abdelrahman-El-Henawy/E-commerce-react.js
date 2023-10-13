import React from 'react'
import { Hourglass } from 'react-loader-spinner'

export default function LoadingScreen() {
  return <>
  <div className='h-100 hourglass z-1 position-absolute top-0 start-0 w-100 d-flex justify-content-center align-items-center'>
  <Hourglass
      visible={true}
      height="100"
      width="100"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#4FA74F', '#4FA74F']}
    />
  </div>
  </>
}
