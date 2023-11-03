import React, { createRef, useEffect, useRef, useState } from 'react'
import userImage from '../assets/user.png'
import { GoHome } from 'react-icons/go'
import { AiFillMessage } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { LuSettings } from 'react-icons/lu'
import { HiOutlineLogout } from 'react-icons/hi'
import { RxCross1 } from 'react-icons/rx'
import { IoMdCloudUpload } from 'react-icons/io'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../ReduxSlices/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'
import Toolbar from './Toolbar'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { stringify } from 'postcss'

const Sidebar = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [loderShow, setLoderShow] = useState(false)
    let [logoutAlert, setLogoutAlert] = useState(false)
    let [dpUploadScreen, setDpUploadScreen] = useState(false)
    let [toolbar, setToolbar] = useState(false)
    let [userName, setUserName] = useState('Your Name Here')
    let [safeName, setSafeName] = useState(userName)
    let [nameBtn, setNameBtn] = useState(false)
    
    let [userProfileImage, setUserProfileImage] = useState(userImage)
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState('');
    const cropperRef = createRef();
    let [crpooerScreen, setCrpooerScreen] = useState(false)

    let logoutClick = () => {
        setLogoutAlert(true)
    }
    let handelDpClick = () => {
        setDpUploadScreen(true)
    }

    let handelLogout = () => {
        signOut(auth).then(() => {
            setLoderShow(true)
            setTimeout(() => {
                navigate('/login')
                localStorage.removeItem('userInfo')
                dispatch(userLoginInfo())
            }, 2000)
        }).catch((error) => {
            setLoderShow(false)
            console.log(error);
            toast.error(error)
        });
    }

    const handelDpImage = (e) => {
        setCrpooerScreen(true)
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            setLoderShow(true)
            const storage = getStorage();
            const storageRef = ref(storage, 'user-profile-img');

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                setLoderShow(false)
                toast.success('New Profile Photo Uploaded!')
                setDpUploadScreen(false)
                getDownloadURL(storageRef).then((downloadURL) => {
                    setUserProfileImage(downloadURL)
                });
                setImage('')
                setCrpooerScreen(false)
            });
        }
    };

    let nameSave = ()=>{
        let ele = document.querySelector('.name_input')
        setUserName(ele.innerText)
        console.log(ele);
        setNameBtn(false)
        toast.success('User Name Updated')
    }

    let cancleName = ()=>{
        setNameBtn(false)
    }



    return (
        <>
            <section className='w-full h-full bg-primary rounded-2xl flex flex-col items-center justify-between py-10'>
                <div>
                    <div onClick={handelDpClick} className='w-[100px] h-[100px] rounded-full relative group'>
                        <img src={userProfileImage} alt="User Image" className='w-full max-w-full rounded-full' />
                        <div className='absolute top-0 left-0 w-full h-full bg-b-half rounded-full flex justify-center items-center cursor-pointer scale-0 group-hover:scale-[1] duration-300'>
                            <IoMdCloudUpload className='text-[30px] text-w' />
                        </div>
                    </div>
                    <div className='relative'>
                        <h2 onClick={()=>{setNameBtn(true)}} contentEditable='true' spellCheck='false' className='name_input text-w text-xs font-bold font-nunito text-center mt-2'>{userName}</h2>
                        {nameBtn ?
                        <div className='absolute bottom-[-30px] left-[50%] translate-x-[-50%] flex gap-2'>
                            <button onClick={nameSave} className='text-primary text-[10px] font-medium font-pop py-1 px-2 bg-w rounded-md' >Save</button>
                            <button onClick={cancleName} className='text-primary text-[10px] font-medium font-pop py-1 px-2 bg-w rounded-md' >Cancle</button>
                        </div> : null}
                    </div>
                    {
                        dpUploadScreen ?
                            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
                                <div onClick={() => { setDpUploadScreen(false) }} className='absolute top-0 left-0 w-full h-full bg-[#5F35F580;]'></div>
                                <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 ${crpooerScreen ? 'w-[800px]' : 'w-[500px]'} w-[500px] py-10 text-center bg-w rounded-xl`}>
                                    <h3 className='text-primary text-xl font-bold font-nunito capitalize'>Upload New Photo as Profile Picture</h3>
                                    <div className='mt-10 flex justify-evenly items-center'>
                                        <input onChange={handelDpImage} type="file" accept='.png, .jpg' />
                                    </div>
                                    <div className='flex justify-evenly items-center'>
                                        <div className={`${crpooerScreen ? 'w-1/2 h-[300px] mt-10' : null} flex justify-center items-center`}>
                                            {
                                                crpooerScreen ?
                                                <div className='flex flex-col items-center'>
                                                    <div
                                                        className="img-preview overflow-hidden rounded-full border-[2px] border-primary"
                                                        style={{ width: "150px", height: "150px" }}
                                                    />
                                                    <h4 className='text-primary text-base font-bold font-nunito capitalize mt-5'>Your Profile Picture Will Look Like This</h4>
                                                </div>
                                                : null
                                            }
                                        </div>
                                        <div className={`${crpooerScreen ? 'w-1/2 h-[300px] mt-10' : null} flex justify-center items-center`}>
                                            {
                                                crpooerScreen ?
                                                <div className=''>
                                                    <Cropper
                                                        ref={cropperRef}
                                                        style={{ height: 300, width: "300px" }}
                                                        zoomTo={0.5}
                                                        initialAspectRatio={1}
                                                        preview=".img-preview"
                                                        src={image}
                                                        viewMode={1}
                                                        minCropBoxHeight={10}
                                                        minCropBoxWidth={10}
                                                        background={false}
                                                        responsive={true}
                                                        autoCropArea={1}
                                                        checkOrientation={false}
                                                        guides={true}
                                                    />
                                                </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                <div>
                                    <button onClick={getCropData} className={`${crpooerScreen ? 'bg-primary mr-10' : 'hidden'} relative w-[150px] py-3 mt-10 text-w text-lg font-bold font-nunito rounded-xl hover:bg-slate-400 transition-all ease-linear`}>Upload</button>
                                    <button onClick={() => { setDpUploadScreen(false) }} className='relative w-[150px] py-3 bg-red-500 mt-10 text-w text-lg font-bold font-nunito rounded-xl hover:bg-slate-400 transition-all ease-linear'>Cancle</button>
                                </div>
                            </div>
                    </div>
                : null
                }
            </div>

            <div className='w-full text-center'>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:bg-w after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:bg-primary before:rounded-l-lg'>
                    <GoHome className='text-[35px] text-primary cursor-pointer' />
                </div>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <AiFillMessage className='text-[35px] text-[#BAD1FF] cursor-pointer' />
                </div>
                <div className='flex justify-center py-4 mb-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <BsBell className='text-[35px] text-[#BAD1FF] cursor-pointer' />
                </div>
                <div className='flex justify-center py-4 relative z-[1] after:absolute after:content-[""] after:top-0 after:right-0 after:w-[75%] after:h-full after:rounded-l-2xl after:z-[-1] before:absolute before:content-[""] before:top-[50%] before:right-0 before:translate-y-[-50%] before:w-[8px] before:h-[95%] before:rounded-l-lg after:bg-transparent'>
                    <LuSettings className='text-[35px] text-[#BAD1FF] cursor-pointer' />
                </div>
            </div>
            <div>
                <div className='relative'>
                    <HiOutlineLogout onClick={logoutClick} onMouseOver={() => { setToolbar(true) }} onMouseOut={() => { setToolbar(false) }} className='text-[35px] text-w cursor-pointer' />
                    {
                        toolbar ? <Toolbar title='Logout'></Toolbar> : null
                    }
                </div>

                {
                    logoutAlert ?
                        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>

                            <div onClick={() => { setLogoutAlert(false) }} className='absolute top-0 left-0 w-full h-full bg-[#5F35F580;]'></div>

                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 w-[500px] py-10 text-center bg-w rounded-xl'>
                                <RxCross1 onClick={() => { setLogoutAlert(false) }} className='text-[25px] text-primary absolute top-5 right-5 cursor-pointer' />
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
            <div className={`${loderShow == true ? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-full bg-[#0000007A] blur-[2px] flex justify-center items-center z-[9999]`}>
                <TailSpin
                    height="100"
                    width="100"
                    color="#5F35F5"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    visible={loderShow ? true : false}
                    wrapperClass="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999]"
                />
            </div>
        </section >
    </>
  )
}

export default Sidebar