import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginWrapper from "../utils/middleware";

const Signup = () => {
  const router = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = { phone, name, email, password };
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if(data.success){
        toast.success(data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setPhone('');
          setName('');
          setEmail('');
          setPassword('');
          setTimeout(() => {
            router('/login');
          }, 2000);
      } else {
        toast.warning(data.message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setPhone('');
          setName('');
          setEmail('');
          setPassword('');
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
  <LoginWrapper>
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <ToastContainer />
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="../../public/myCake.png" alt="Your Company" />
      <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
      <p className='mt-2 text-center text-sm text-gray-600'>
        Or
        <Link to={'/login'} className='font-medium text-purple-600 hover:text-purple-500'>Login</Link>
      </p>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          </div>
          <div className="mt-2">
            <input onChange={(e)=> setName(e.target.value)} id="name" name="name" type="text" value={name} required className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          </div>
          <div className="mt-2">
            <input onChange={(e)=> setEmail(e.target.value)} id="email" name="email" type="email" value={email} required className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Phone Number (User Id)</label>
          </div>
          <div className="mt-2">
            <input onChange={(e)=> setPhone(e.target.value)} id="phone" name="phone" value={phone} type="tel" pattern="[0-9]{10}" placeholder='e.x: 1234567890' required className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input onChange={(e)=> setPassword(e.target.value)} id="password" name="password" value={password} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign up</button>
        </div>
      </form>
    </div>
  </div>
  </LoginWrapper>
  )
}

export default Signup