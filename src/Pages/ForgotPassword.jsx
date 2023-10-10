import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'

const ForgotPassword = () => {

    const auth = getAuth();
    let navigate = useNavigate()

    let [loderShow, setLoderShow] = useState(false)

    let [email, setEmail] = useState('')
    let [emailErr, setEmailErr] = useState('')

    let emailChange = (e)=>{
        setEmail(e.target.value);
        setEmailErr('')
        setLoginErr('')
    }

    let submitClick = ()=>{
        if(!email){
            setEmailErr('Email Required')
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            setEmailErr('Enter Valid Email')
        } else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setLoderShow(true)
                setEmail('')
                toast('Email Send, Go to your Email and Change your Password');
                setTimeout(()=>{
                    navigate('/login')
                },5000)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
        }
    }

    let loginPage = ()=>{
        setLoderShow(true)
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
    }

  return (
    <>
        <section className='flex flex-col justify-center items-center h-screen bg-slate-300'>

            <h1 className='text-sec text-xl md:text-[30px] font-bold font-nunito text-center'>Reset Your Password in Just 2 Simple Steps</h1>

            <div className='pt-[50px] pb-[30px] px-5 bg-w w-[300px] md:w-[500px] mx-auto mt-10 rounded-xl'>
                <div className='relative w-[90%] mx-auto mb-7'>
                    
                    <span className='absolute top-[-25px] lg:top-[-20px] left-[0] text-po text-sm font-sans'>Enter Your Email</span>

                    <input onChange={emailChange} value={email} type="email" placeholder='Your email address' className='w-full bg-transparen lg:text-inherit border-b-[3px] border-ow py-2 pl-3 lg:pl-0 lg:py-5 placeholder:text-so placeholder:text-xs lg:placeholder:text-xs focus-visible:outline-none focus-visible:border-primary' />

                    <p className='absolute w-full text-center bottom-[-15px] left-[50%] translate-x-[-50%] text-xs text-w font-pop bg-red-400 px-[20px] rounded-bl-lg rounded-br-lg' >{emailErr}</p>

                </div>

                <div className='w-[70%] h-12 lg:w-[370px] mx-auto lg:h-14'>
                    <button onClick={submitClick} className='w-full h-full bg-primary rounded-[10px] text-base lg:text-xl text-w font-semibold font-nunito hover:bg-hover hover:text-w transition-all ease-linear'>Get Email</button>
                </div>

            </div>

            <div className='mt-12'>
                <Link onClick={loginPage} className='py-4 px-8 bg-w rounded-xl text-primary text-lg font-bold font-nunito hover:bg-primary hover:text-w transition-all'>Go to Login</Link>
            </div>

            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
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

export default ForgotPassword