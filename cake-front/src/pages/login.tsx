import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import LoginWrapper from "../utils/middleware"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any)=> {
    e.preventDefault();
    const data = {phone, password}
    let res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json();
    setPhone('');
    setPassword('');
    if(response.success)
    {
      localStorage.setItem('token', response.token);
      sessionStorage.setItem('name', response.name);
      sessionStorage.setItem('phone', response.phone);
      toast.success('Your are successfully logged in!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setTimeout(() => {
          router('/');
        }, 1000);
    } 
    else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  return (
    <LoginWrapper>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="../../public/myCake.png" alt="Your Company" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or
          <Link to={'/signup'} className='font-medium text-purple-600 hover:text-purple-500'>Signup</Link>
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Phone Number (User Id)</label>
            </div>
            <div className="mt-2">
              <input value={phone} onChange={(e)=> setPhone(e.target.value)} id="phone" name="phone" type="tel" pattern="[0-9]{10}" placeholder='e.x: 1234567890' autoComplete="number" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <Link to="/forgotpass" className="font-semibold text-purple-600 hover:text-purple-500">Forgot password?</Link>
              </div>
            </div>
            <div className="mt-2">
              <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign in</button>
          </div>
        </form>
      </div>
    </div>
    </LoginWrapper>
  )
}

export default Login