import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

const ItemHead = (props) => {
  return (
    <>
        <div className='w-full flex justify-between items-center bg-w'>
            <h4 className='text-b text-xl font-semibold font-pop'>{props.title}</h4>
            <div className='w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full hover:bg-slate-200 transition-all ease-linear'>
                <BsThreeDotsVertical className='text-primary text-xl' />
            </div>
        </div>
    </>
  )
}

export default ItemHead