import React from 'react'
import {BsSearch} from 'react-icons/bs'
import {BsThreeDotsVertical} from 'react-icons/bs'

const SearchBar = () => {
  return (
    <>
        <div className='relative'>
            <BsSearch className='absolute top-[50%] left-[20px] translate-y-[-50%] text-b text-xl' />

            <input type="text" placeholder='Search' className='w-full py-3 pl-[60px] pr-[60px] rounded-xl font-nunito placeholder:text-base placeholder:font-nunito shadow-md' />

            <div className='absolute w-[40px] h-[40px] top-[50%] right-[15px] translate-y-[-50%] flex justify-center items-center cursor-pointer rounded-full hover:bg-slate-200 transition-all ease-linear'>
                <BsThreeDotsVertical className='text-primary text-xl' />
            </div>
        </div>
    </>
  )
}

export default SearchBar