import React from 'react'
import { useState } from 'react'
import LoginImg from '../assets/login-bg.png'
import googleLogo from '../assets/google-logo.png'
import facebookLogo from '../assets/facebook.png'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from  'react-loader-spinner'

const Login = () => {

  const auth = getAuth();
  let navigate = useNavigate()
  const GooProvider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();

  let [loginErr, setLoginErr] = useState('')

  let [show, setShow] = useState(true)
  let eyeClick = ()=>{
    setShow(!show);
  }

  let [loderShow, setLoderShow] = useState(false)

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let emailChange = (e)=>{
    setEmail(e.target.value);
    setEmailErr('')
    setLoginErr('')
  }
  let passChange = (e)=>{
    setPassword(e.target.value);
    setPasswordErr('')
    setLoginErr('')
  }

  let [emailErr, setEmailErr] = useState('')
  let [passwordErr, setPasswordErr] = useState('')

  let googleLogin = ()=>{
    setLoderShow(true)
    setTimeout(()=>{
      setLoderShow(false)
    },1000)
    setTimeout(()=>{
      signInWithPopup(auth, GooProvider)
      .then(() => {
        setLoderShow(true)
        setTimeout(()=>{navigate('/demo')}, 1000)
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
    }, 1000)
  }

  let facebookLogin = ()=>{
    setLoderShow(true)
    setTimeout(()=>{
      setLoderShow(false)
    },1000)
    setTimeout(()=>{
      signInWithPopup(auth, FbProvider)
      .then(() => {
        setLoderShow(true)
        setTimeout(()=>{navigate('/demo')}, 1000)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
    },1000)
  }

  let submitClick = ()=>{
    (()=>{

        (()=>{
            if(!email){
              setEmailErr('Email Required')
            } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
              setEmailErr('Enter Valid Email')
            } else{
              setEmailErr('')
            }
          }
        )();

        (()=>{
            if(!password){
              setPasswordErr('Password Required')
            } else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
              setPasswordErr('Enter Valid Password')
            }
          }
        )();


        (()=>{
            if(email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
              signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                  setLoderShow(true)
                  setTimeout(()=>{
                    toast('Login Successfull!!');
                    setEmail('')
                    setPassword('')
                  }, 200)
                  setTimeout(()=>{navigate('/demo')}, 2000)
                })
                .catch((error) => {
                  const errorCode = error.code;
                  console.log(errorCode);
                  if(errorCode.includes('auth/invalid-login-credentials')){
                    setEmailErr('Enter Proper Email!!')
                    setPasswordErr('Enter Proper Password!!')
                  }
              });
            } else{
              console.log('Problem');
            }
          }
        )();

      }
    )()
  }

  let registrationPage = ()=>{
    setLoderShow(true)
    setTimeout(()=>{
      navigate('/registration')
    }, 1000)
  }
  let forgotPage = ()=>{
    setLoderShow(true)
    setTimeout(()=>{
      navigate('/forgot-password')
    }, 1000)
  }


  return (
    <>
        <section className='flex items-center h-screen'>

            <div className='w-full lg:w-[65%] xl:w-1/2 flex justify-center lg:justify-end items-center'>
              <div className='text-center lg:text-left lg:mr-[100px] xl:mr-[190px]'>
                <p className='text-[28px] lg:text-[34px] text-sec font-bold font-nunito'>Login to your account!</p>

                <div className='flex flex-wrap flex-col sm:flex-row justify-between items-start mt-5 md:mt-0'>
                  <button onClick={googleLogin} className='py-2 lg:py-5 px-5 border-[2px] max-w-[250px] flex mt-2 sm:mt-7 rounded-xl mx-auto lg:ml-0 md:mr-2 group hover:bg-sec transition ease-linear'>
                    <img src={googleLogo} alt="Google Logo" className='w-[20px] h-[20px]' />
                    <p className='ml-[15px] text-xs md:text-sm text-sec font-semibold font-sans group-hover:text-w transition ease-linear'>Login with Google</p>
                  </button>
                  <button  onClick={facebookLogin} className='py-2 lg:py-5 px-5 border-[2px] max-w-[250px] flex mt-2 sm:mt-7 rounded-xl mx-auto lg:mx-0 group hover:bg-sec transition ease-linear'>
                    <img src={facebookLogo} alt="Google Logo" className='w-[20px] h-[20px] rounded' />
                    <p className='ml-[10px] text-xs md:text-sm text-sec font-semibold font-sans group-hover:text-w transition ease-linear'>Login with Facebook</p>
                  </button>
                </div>

                <div className='mt-[70px] flex flex-col'>

                  <div className='relative w-[90%] mx-auto lg:mx-0 lg:w-[370px] mb-16'>
                    <span className='absolute top-[-25px] lg:top-[-20px] left-[0] text-po text-sm font-sans'>Email Address</span>
                    <input onChange={emailChange} value={email} type="email" placeholder='Your email address' className='w-full bg-transparent lg:text-inherit border-b-[3px] border-ow py-2 pl-3 lg:pl-0 lg:py-5 placeholder:text-so placeholder:text-xs lg:placeholder:text-base focus-visible:outline-none focus-visible:border-primary' />
                    <p className='absolute w-full text-center bottom-[-15px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{emailErr}</p>
                  </div>

                  <div className='relative w-[90%] mx-auto lg:mx-0 lg:w-[370px] mb-10'>
                    <span className='absolute top-[-25px] lg:top-[-20px] left-[0] text-po text-sm font-sans'>Password</span>
                    <input onChange={passChange} value={password} type={ show == true ? `password` : `text`} placeholder='Enter your password' className='w-full bg-transparent pr-[50px] border-b-[3px] border-ow py-2 pl-3 lg:pl-0 lg:py-5 placeholder:text-so placeholder:text-xs lg:placeholder:text-base focus-visible:outline-none focus-visible:border-primary' />
                    <p className='absolute w-full text-center bottom-[-10px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{passwordErr}</p>
                    <span className='absolute top-[50%] right-[20px] translate-y-[-50%] cursor-pointer'>
                      { show == true ? <AiFillEye onClick={eyeClick} className='text-[20px] text-[#bbbbc2]' /> : <AiFillEyeInvisible onClick={eyeClick} className='text-[20px] text-[#bbbbc2]' />}
                    </span>
                  </div>

                  <p className='text-red-500 text-lg- font-medium font-pop text-center mb-4'>{loginErr}</p>

                  <div className='w-[70%] h-12 lg:w-[370px] mx-auto lg:mx-0 lg:h-14 mb-5'>
                    <button onClick={submitClick} className='w-full h-full bg-primary rounded-[10px] text-base lg:text-xl text-w font-semibold font-nunito hover:bg-hover hover:text-w transition-all ease-linear'>Login to Continue</button>
                  </div>

                  <div className='w-[90%] mx-auto lg:mx-0 lg:w-[370px] text-center'>
                    <p className='text-po text-sm font-sans'>Don’t have an account?
                      <Link onClick={registrationPage} className='text-hover font-bold hover:underline transition-all ease-linear'> Sign up</Link>
                    </p>
                  </div>
                  <div className='w-[90%] mx-auto lg:mx-0 lg:w-[370px] text-center mt-5'>
                    <p className='text-po text-sm font-sans'>
                      <Link onClick={forgotPage} className='text-primary font-bold hover:underline transition-all ease-linear'>Forgot Your Password?</Link>
                    </p>
                  </div>

                </div>

              </div>
            </div>

            <div className='hidden lg:block w-full lg:w-[35%] xl:w-1/2 absolute top-0 left-0 z-[-1] after:absolute after:content-[""] after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(0,0,0,0.5)] md:static md:after:hidden'>
              <img src={LoginImg} alt="Registration Image" className='w-full h-screen object-cover' />
            </div>



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

export default Login