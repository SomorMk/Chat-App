import React, { useState } from 'react'
import registrationImg from '../assets/registration-bg.png'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from  'react-loader-spinner'

const Registration = () => {

  let [loderShow, setLoderShow] = useState(false)

  const auth = getAuth();
  let navigate = useNavigate()

  let [show, setShow] = useState(true)
  let eyeClick = ()=>{ setShow(!show); }

  let [email, setEmail] = useState('')
  let [name, setName] = useState('')
  let [password, setPass] = useState('')

  let emailChange = (e)=>{
    setEmail(e.target.value);
    setEmailErr('')
  }
  let nameChange = (e)=>{
    setName(e.target.value);
    setNameErr('')
  }
  let passChange = (e)=>{
    setPass(e.target.value);
    setPasswordErr('')
  }

  let [emailErr, setEmailErr] = useState('')
  let [nameErr, setNameErr] = useState('')
  let [passwordErr, setPasswordErr] = useState('')


  let submitClick = ()=>{

    (()=>{
        if(!email){
          setEmailErr('Email required')
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
          setEmailErr('Enter Valid Email')
        }
      }
    )();

    (()=>{
        if(!name){
          setNameErr('Name required')
        } else{
          setNameErr('')
        }
      }
    )();

    (()=>{
        if(!password){
          setPasswordErr('Password required')
        } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
          setPasswordErr('Enter Valid Password')
        } else{
          setPasswordErr('')
        }
      }
    )();


    (()=>{
      if(email && name && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) && (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) ){

        setLoderShow(true)

          createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
              toast('Register Successfully! Go to Gmail and Verify Your Email to Login');
              setEmail('')
              setName('')
              setPass('')
              setTimeout(()=>{navigate('/login')}, 2000)
            });
          })
          .catch((error) => {
            setLoderShow(false)
            const errorCode = error.code;
            console.log(errorCode);
            if(errorCode.includes('auth/email-already-in-use')){
              setEmailErr('This Email is already used')
            }
          });
      }
    })();

  }


  let loginPage = ()=>{
    setLoderShow(true)
    setTimeout(()=>{
      navigate('/login')
    }, 1000)
  }



  return (
    <>
        <section className='flex flex-wrap justify-center items-center h-screen px-[10px] lg:px-0'>

            <div className='w-full lg:w-[65%] xl:w-1/2 flex justify-center xl:justify-end items-center'>
              <div className='text-center lg:text-left xl:mr-[130px]'>
                <p className='text-2xl sm:text-[32px] lg:text-[34px] text-sec font-bold font-nunito'>Get started with easily register</p>
                <p className='text-sm sm:text-base lg:text-xl text-so font-nunito mt-3'>Free register and you can enjoy it</p>

                <div className='mt-[70px] flex flex-col lg:items-start'>

                  <div className='relative w-[90%] mx-auto lg:mx-0 lg:w-[370px] mb-12'>
                    <span className='bg-none top-[-25px] left-[0] absolute lg:top-[-15px] lg:left-[8%] lg:bg-w px-4 text-po text-sm font-semibold font-nunito'>Email Address</span>
                    <input onChange={emailChange} value={email} type="email" placeholder='Your Email' className='w-full border-[3px] bg-[rgba(255,255,255,0.3)] border-[#EAEAF1] rounded-lg py-2 px-4 lg:py-5 lg:px-12 placeholder:text-so placeholder:text-xs' />
                    <p className='absolute w-full text-center bottom-[-10px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{emailErr}</p>
                  </div>

                  <div className='relative w-[90%] mx-auto lg:mx-0 lg:w-[370px] mb-12'>
                    <span className='bg-none top-[-25px] left-[0] absolute lg:top-[-15px] lg:left-[8%] lg:bg-w px-4 text-po text-sm font-semibold font-nunito'>Full Name</span>
                    <input onChange={nameChange} value={name} type="text" placeholder='Your Full Name Here' className='w-full border-[3px] bg-[rgba(255,255,255,0.3)] border-[#EAEAF1] rounded-lg py-2 px-4 lg:py-5 lg:px-12 placeholder:text-so placeholder:text-xs' />
                    <p className='absolute w-full text-center bottom-[-10px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{nameErr}</p>
                  </div>

                  <div className='relative w-[90%] mx-auto lg:mx-0 lg:w-[370px] mb-12'>
                    <span className='bg-none top-[-25px] left-[0] absolute lg:top-[-15px] lg:left-[8%] lg:bg-w px-4 text-po text-sm font-semibold font-nunito'>Password</span>
                    <input onChange={passChange} value={password} type={ show == true ? `password` : `text`} placeholder='Set a password' className='w-full border-[3px] bg-[rgba(255,255,255,0.3)] border-[#EAEAF1] rounded-lg py-2 px-4 lg:py-5 lg:px-12 placeholder:text-so placeholder:text-xs' />
                    <span className='absolute top-[50%] right-[20px] translate-y-[-50%] cursor-pointer'>
                      { show == true ? <AiFillEye onClick={eyeClick} className='text-[20px] text-[#bbbbc2]' /> : <AiFillEyeInvisible onClick={eyeClick} className='text-[20px] text-[#bbbbc2]' />}
                    </span>
                    <p className='absolute w-full text-center bottom-[-10px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{passwordErr}</p>
                  </div>

                  <div className='w-[85%] h-10 mx-auto lg:mx-0 lg:w-[370px] lg:h-14 mb-4'>
                    <button onClick={submitClick} className='w-full h-full bg-primary rounded-[86px] text-base lg:text-xl text-w font-semibold font-nunito hover:bg-hover hover:text-w transition-all ease-linear'>Sign Up</button>
                  </div>

                  <div className='w-[90%] mx-auto lg:mx-0 lg:w-[370px] text-center'>
                    <p className='text-po text-xs lg:text-sm font-sans'>Already  have an account ?
                      <Link onClick={loginPage} className='text-hover font-bold hover:underline transition-all ease-linear'>Sign In</Link>
                    </p>
                  </div>

                </div>

              </div>
            </div>

            <div className='hidden lg:block w-full lg:w-[35%] xl:w-1/2 absolute top-0 left-0 z-[-1] after:absolute after:content-[""] after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(0,0,0,0.5)] lg:static lg:after:hidden'>
              <img src={registrationImg} alt="Registration Image" className='w-full h-screen object-cover' />
            </div>



            <ToastContainer 
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <div className={`${loderShow == true? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-full bg-[#0000007A] blur-[2px] flex justify-center items-center`}>
            <TailSpin
              height="100"
              width="100"
              color="#fff"
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

export default Registration