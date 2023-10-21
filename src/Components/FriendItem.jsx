import React from 'react'

const FriendItem = (props) => {
    return (
        <>
            <div className='flex items-center mb-3'>
                <div className='w-[55px] h-[55px] rounded-full flex items-center'>
                    <img src={props.img} alt="Group DP" className='w-full max-w-full rounded-full' />
                </div>
                <div className='w-full flex justify-between items-center ml-5'>
                    <div>
                        <h5 className='text-b text-sm font-semibold font-pop'>{props.name}</h5>
                        <p className='text-[#4D4D4D] text-xs font-medium font-pop'>{props.info}</p>
                    </div>
                    <div>
                        <p className='text-b text-[10px] font-medium font-pop'>{props.lastSeen}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendItem