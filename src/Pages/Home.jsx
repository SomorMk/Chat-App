import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import SearchBar from '../Components/SearchBar';
import ItemHead from '../Components/ItemHead';
import GroupItem from '../Components/GroupItem';
import groupImg1 from '../assets/group-item-1.png'
import groupImg2 from '../assets/group-item-2.png'
import groupImg3 from '../assets/group-item-3.png'
import FriendItem from '../Components/FriendItem';
import friend1 from '../assets/friend (1).png'
import friend2 from '../assets/friend (2).png'
import friend3 from '../assets/friend (3).png'
import friend4 from '../assets/friend (4).png'
import friend5 from '../assets/friend (5).png'
import UserItem from '../Components/UserItem';
import { userLoginInfo } from '../ReduxSlices/userSlice';

const Demo = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let [verify, setVerify] = useState(true)

  let userData = useSelector((state)=>state.user.userInfo)

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
      dispatch(userLoginInfo(user));
      localStorage.setItem('userInfo', JSON.stringify((user)))
    }
  });

  useEffect(()=>{
    if(!userData){
      navigate('/login')
    }
  },[])

  return (
    <>
        <section className='flex justify-center items-center h-[100vh] bg-primary'>
            {
              verify ?
              <div className='bg-w w-full h-full flex p-10'>

                <div className='w-[12%]'>
                  <Sidebar></Sidebar>
                </div>

                <div className='w-[88%] pl-10 flex flex-col justify-between'>
                  <div className='w-full h-[50%] flex justify-between px-5'>

                    <div className='w-[40%] h-full relative'>
                      <SearchBar></SearchBar>
                      <div className='p-5 pt-0 absolute bg-w bottom-0 left-0 w-full h-[75%] overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                        <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                          <ItemHead title='Groups List'></ItemHead>
                        </div>
                        <div className='mt-1'>
                          <GroupItem img={groupImg1} name='Friends Reunion' info='Hi Guys, Wassup!'></GroupItem>
                          <GroupItem img={groupImg2} name='Friends Forever' info='Good to see you.'></GroupItem>
                          <GroupItem img={groupImg3} name='Crazy Cousins' info='What plans today?'></GroupItem>
                        </div>
                      </div>
                    </div>

                    <div className='w-[58%] h-full flex justify-between'>
                      <div className='w-[48.5%] h-full relative'>
                        <div className='p-5 pt-0 absolute bg-w bottom-0 left-0 w-full h-full overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                          <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                            <ItemHead title='Friends'></ItemHead>
                          </div>
                          <div className='mt-1'>
                            <FriendItem img={friend1} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></FriendItem>
                            <FriendItem img={friend2} name='Swathi' info='Sure!' lastSeen='Today, 2:31pm'></FriendItem>
                            <FriendItem img={friend3} name='Kiran' info='Hi.....' lastSeen='Yesterday, 6:22pm'></FriendItem>
                            <FriendItem img={friend4} name='Tejeshwini C' info='I will call him today.' lastSeen='Today, 12:22pm'></FriendItem>
                            <FriendItem img={friend1} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></FriendItem>
                          </div>
                        </div>
                      </div>
                      <div className='w-[48.5%] h-full relative'>
                      <div className='p-5 pt-0 absolute bg-w bottom-0 left-0 w-full h-full overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                        <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                          <ItemHead title='User List'></ItemHead>
                        </div>
                        <div className='mt-1'>
                          <UserItem img={friend1} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></UserItem>
                          <UserItem img={friend2} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></UserItem>
                          <UserItem img={friend3} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></UserItem>
                          <UserItem img={friend4} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></UserItem>
                          <UserItem img={friend5} name='Raghav' info='Dinner?' lastSeen='Today, 8:56pm'></UserItem>
                        </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className='w-full h-[45%] flex justify-between px-5'>

                    <div className='w-[40%] h-full relative'>
                      <div className='p-5 pt-0 absolute bottom-0 left-0 w-full h-full overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                        <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                          <ItemHead title='Friend Request'></ItemHead>
                        </div>
                      </div>
                    </div>

                    <div className='w-[58%] h-full flex justify-between'>
                      <div className='w-[48.5%] h-full relative'>
                        <div className='p-5 pt-0 absolute bottom-0 left-0 w-full h-full overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                          <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                            <ItemHead title='My Groups'></ItemHead>
                          </div>
                        </div>
                      </div>
                      <div className='w-[48.5%] h-full relative'>
                        <div className='p-5 pt-0 absolute bottom-0 left-0 w-full h-full overflow-y-scroll no-scrollbar shadow-md rounded-2xl'>
                          <div className='sticky top-0 left-0 w-full bg-w pt-5'>
                            <ItemHead title='Blocked Users'></ItemHead>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              :
              <div className='text-center'>
                <h1 className='text-w text-xl md:text-[40px] font-bold font-nunito text-center'>Please Verify Your Email</h1>
                <p className='text-center font-nunito text-w text-base md:text-xl mt-10 mb-5'>Click the button after verifying your Email</p>
                <button onClick={()=>{window.location.reload()}} className='py-2 px-4 bg-w text-primary text-sm md:text-base font-bold font-nunito rounded-lg'>I Verified My Email</button>
              </div>
            }
        </section>
    </>
  )
}

export default Demo