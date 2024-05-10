import React from 'react'
function Loader() {
  return (
    <div className='loader-container w-full absolute flex justify-center top-0 left-0'>
        {/* <img className='loader w-1/2' src={loader} alt="loader" /> */}
        <span className="loader"></span>
    </div>
  )
}

export default Loader
