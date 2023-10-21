import React from 'react'

const Toolbar = (props) => {
  return (
    <div className='absolute top-[-30px] left-[50%] translate-x-[-50%] bg-w py-1 px-2 rounded-md text-xs text-primary font-medium font-nunito'>{props.title}</div>
  )
}

export default Toolbar