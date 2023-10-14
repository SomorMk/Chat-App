import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Demo = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let [verify, setVerify] = useState(false)
  let userData = useSelector((state)=>state.user.userInfo)

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
    }
  });

  useEffect(()=>{
    if(!userData){
      navigate('/login')
    }
  },[])

  return (
    <>
        <section className='flex justify-center items-center h-[100vh] bg-primary text-center'>
            {
              verify ? <h1 className='text-w text-xl md:text-[40px] font-bold font-nunito'>Thank You for Login</h1>
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