import React, { useState } from 'react'
import userImage from '../assets/user.png'
import {GoHome} from 'react-icons/go'
import {AiFillMessage} from 'react-icons/ai'
import {BsBell} from 'react-icons/bs'
import {LuSettings} from 'react-icons/lu'
import {HiOutlineLogout} from 'react-icons/hi'
import {RxCross1} from 'react-icons/rx'
import {IoMdCloudUpload} from 'react-icons/io'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../ReduxSlices/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from  'react-loader-spinner'
import Toolbar from './Toolbar'

const Sidebar = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [loderShow, setLoderShow] = useState(false)
    let [LogoutAlert, setLogoutAlert] = useState(false)
    let [userImgUploadBtn, setUserImgUploadBtn] = useState(false)
    let [toolbar, setToolbar] = useState(false)

    let logoutClick = ()=>{
        setLogoutAlert(true)
    }

    let handelLogout = ()=>{
        signOut(auth).then(() => {
            setLoderShow(true)
            setTimeout(()=>{
                navigate('/login')
                localStorage.removeItem('userInfo')
                dispatch(userLoginInfo())
            },2000)
          }).catch((error) => {
            setLoderShow(false)
            console.log(error);
            toast.error(error)
          });
    }


  return (
    <>
        <section className='w-full h-full bg-primary rounded-2xl flex flex-col items-center justify-between py-10'>
            <div>
                <div onMouseOver={()=>{setUserImgUploadBtn(true)}} onMouseOut={()=>{setUserImgUploadBtn(false)}} className='w-[100px] h-[100px] rounded-full relative'>
                    <img src={userImage} alt="User Image" className='w-full max-w-full rounded-full' />
                    {
                        userImgUploadBtn ?
                        <div className='absolute top-0 left-0 w-full h-full bg-b-half rounded-full flex justify-center items-center cursor-pointer'>
                            <IoMdCloudUpload className='text-[30px] text-w' />
                        </div>
                        : null
                    }
                </div>
            </div>
            <div className='w-full text-center'>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:bg-w after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:bg-primary before:rounded-l-lg'>
                    <GoHome className='text-[35px] text-primary cursor-pointer'/>
                </div>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <AiFillMessage className='text-[35px] text-[#BAD1FF] cursor-pointer'/>
                </div>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <BsBell className='text-[35px] text-[#BAD1FF] cursor-pointer'/>
                </div>
                <div className='flex justify-center py-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <LuSettings className='text-[35px] text-[#BAD1FF] cursor-pointer'/>
                </div>
            </div>
            <div>
                <div className='relative'>
                    <HiOutlineLogout onClick={logoutClick} onMouseOver={()=>{setToolbar(true)}} onMouseOut={()=>{setToolbar(false)}} className='text-[35px] text-w cursor-pointer' />
                    {
                        toolbar ? <Toolbar title='Logout'></Toolbar> : null
                    }
                </div>

                {
                    LogoutAlert ?
                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
                        
                        <div onClick={()=>{setLogoutAlert(false)}} className='absolute top-0 left-0 w-full h-full bg-[#5F35F580;]'></div>

                        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 w-[500px] py-10 text-center bg-w rounded-xl'>
                            <RxCross1 onClick={()=>{setLogoutAlert(false)}} className='text-[25px] text-primary absolute top-5 right-5 cursor-pointer' />
                            <h3 className='text-primary text-xl font-bold font-nunito capitalize'>Are you sure want to logout?</h3>
                            <button onClick={handelLogout} className='relative w-[300px] py-3 bg-primary mt-10 text-w text-lg font-bold font-nunito rounded-xl hover:bg-slate-400 transition-all ease-linear'>Logout</button>
                        </div>

                    </div>
                    :
                    null
                }
            </div>



            <div className='absolute bottom-0 left-0'>
            <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            />
            </div>
            <div className={`${loderShow == true? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-full bg-[#0000007A] blur-[2px] flex justify-center items-center z-[9999]`}>
            <TailSpin
              height="100"
              width="100"
              color="#5F35F5"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              visible={ loderShow ? true : false}
              wrapperClass="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999]"
            />
          </div>
        </section>
    </>
  )
}

export default Sidebar