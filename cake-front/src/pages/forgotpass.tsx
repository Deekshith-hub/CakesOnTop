import React, { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../config/config';
import { toast, ToastContainer } from 'react-toastify'
import LoginWrapper from '../utils/middleware';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Forgotpass = () => {
  const router = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const auth = getAuth(app);

  const inputRef: any = useRef(false);

  const npass: any = useRef('');
  const cpass: any = useRef('');
  const validatePassword = () => {
    if(npass.current.value != cpass.current.value) {
      cpass.current.setCustomValidity("Passwords Don't Match!");
    } else {
      cpass.current.setCustomValidity('');
    }
  }

  const updateNewPass = async (e: any) => {
    e.preventDefault();
    const data = { phone:phoneNumber, password:confirmPass }
    let res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/changepass`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json();
    if(response.success){
      toast.success(response.message, { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
      setTimeout(() => {
        router('/login');
      }, 2000);
    } else {
      toast.error(response.message, { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
    }
  }


  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      'size': 'normal',
      'callback': (response: any) => {
      },
      'expired-callback': () => {
      }
    });
  }, [auth]);

  const handleSendOtp = async (e: any) => {
    e.preventDefault();

    const user = await fetch(`${import.meta.env.VITE_BASE_URL}/user/checkexistuser`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({phone: phoneNumber}),
    })
    const response = await user.json();

    if(response.success)
    {
      try {
        const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
        const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, (window as any).recaptchaVerifier);
  
        if (confirmation && confirmation.verificationId) {
          setConfirmationResult(confirmation as any);
          setOtpSent(true);
          inputRef.current.readOnly = true;
          // inputRef.current.required = false;
          toast.success('OTP has been sent!', { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
        } 
      } catch (error) {
        console.error(error)
        toast.error('Failed to send OTP!', { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
      }
    } else {
      toast.warning('You are not registered user!', { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});

    }
    
  };

  const handleOTPSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await (confirmationResult as any).confirm(otp);
      setOtp('');
      setValidOtp(true);
      toast.success('Verified successfully!', { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
    } 
    catch (error) {
      console.error(error);
      toast.error('Entered OTP is not correct', { position: "top-left", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,});
    }
  };

  return (
    <LoginWrapper>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="../../public/myCake.png" alt="Your Company" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or
          <Link to={'/login'} className='font-medium text-purple-600 hover:text-purple-500'>Login</Link>
        </p>
      </div>
    
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={otpSent ? handleOTPSubmit : handleSendOtp} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number (User Id)</label>
            </div>
            <div className="mt-2">
              <input value={phoneNumber} ref={inputRef} onChange={(e)=>setPhoneNumber(e.target.value)} id="phone" name="phone" type="tel" pattern="[0-9]{10}" placeholder='e.x: 1234567890' autoComplete="number" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>
    
          { (otpSent && !validOtp) && <div>
            <div className="flex items-center justify-between">
              <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">Enter OTP</label>
            </div>
            <div className="mt-2">
              <input value={otp} onChange={(e)=> setOtp(e.target.value)} id="otp" name="otp" type="text" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div> }

          {!otpSent && <div id="recaptcha-container"></div>}
    
          <div>
            {!validOtp && <button type="submit" className={`flex w-full justify-center rounded-md ${otpSent ? 'bg-green-600' : 'bg-purple-600'} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:${otpSent ? 'bg-green-500' : 'bg-purple-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}>{otpSent ? 'Submit OTP' : 'Send OTP'}</button>}
          </div>
        </form>

        {validOtp && <form onSubmit={updateNewPass} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="newPass" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
            </div>
            <div className="mt-2">
              <input value={newPass} ref={npass} onChange={(e)=>{setNewPass(e.target.value); validatePassword()}} id="newPass" type="password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>
    
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirmPass" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            </div>
            <div className="mt-2">
              <input value={confirmPass} ref={cpass} onChange={(e)=> setConfirmPass(e.target.value)} onKeyUp={()=>validatePassword()} id="confirmPass" type="password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>
    
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Submit Password</button>
          </div>
        </form> }
      </div>
    </div>
    </LoginWrapper>
  )
}

export default Forgotpass