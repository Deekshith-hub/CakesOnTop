import LoginWrapper from "../utils/middleware"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { json } from "react-router-dom";

class Data {
  userId: number = 0;
  id: number = 0;
  title: string ='';
  completed: boolean = true;
}

const Home = () => {
  const [list, setList] = useState<Data[]>([]); 
  const { logout } = useContext(UserContext);

  
   

  return (
    <>
    <LoginWrapper>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",}}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Waiting for the new announcements? <a href="#" className="font-semibold text-purple-600"><span className="absolute inset-0" aria-hidden="true"></span>Explore <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Feel the <span className="text-purple-500">Deliciousness</span> of different Cakes</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">Cake is the answer, no matter the question. There's always room for cake. you never know when it's coming, but you'd better eat it when it does!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start shoping</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Contact us <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        ></div>
      </div>
    </LoginWrapper>
    </>
  )
}

export default Home