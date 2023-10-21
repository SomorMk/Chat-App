import React from 'react'

const GroupItem = (props) => {
  return (
    <>
        <div className='flex items-center mb-3'>
            <div className='w-[70px] h-[70px] rounded-full flex items-center'>
                <img src={props.img} alt="Group DP" className='w-full max-w-full rounded-full' />
            </div>
            <div className='w-full flex justify-between items-center ml-5'>
                <div>
                    <h5 className='text-b text-base font-semibold font-pop'>{props.name}</h5>
                    <p className='text-[#4D4D4D] text-xs font-medium font-pop'>{props.info}</p>
                </div>
                <div>
                    <button className='px-6 py-1 bg-primary text-w text-base font-semibold font-pop rounded hover:scale-[0.9] transition-all ease-linear'>Join</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default GroupItem