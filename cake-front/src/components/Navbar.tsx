import { CgProfile } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { UserContext } from "../App";
import { useContext } from "react";

const Navbar = () => {

  
  const [dropdown, setDropdown] = useState(false);
  const [cartList, setCartList] = useState(false);

  const {addToCart, removeFromCart, cart, subTotal, clearCart, logout} = useContext(UserContext);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link to={'/'}><img src='../../myCake.png' width={50} height={50} alt="Company logo" /></Link>
          <span className="ml-3 text-xl text-purple-700" style={{fontFamily: 'cursive'}}>CakesOnTop</span>
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to={'/cakes/vanilla'} className={({ isActive, isPending }) =>isPending ? "text-red-700" : isActive ? "mr-5 text-purple-700 underline cursor-pointer font-bold" : "mr-5 hover:text-purple-700 cursor-pointer font-bold"}>Vanilla Cakes</NavLink>
          <NavLink to={'/cakes/pastry'} className={({ isActive, isPending }) =>isPending ? "text-red-700" : isActive ? "mr-5 text-purple-700 underline cursor-pointer font-bold" : "mr-5 hover:text-purple-700 cursor-pointer font-bold"}>Pastries</NavLink>
          <NavLink to={'/cakes/ice'} className={({ isActive, isPending }) =>isPending ? "text-red-700" : isActive ? "mr-5 text-purple-700 underline cursor-pointer font-bold" : "mr-5 hover:text-purple-700 cursor-pointer font-bold"}>Ice Cakes</NavLink>
          <NavLink to={'/cakes/cup'} className={({ isActive, isPending }) =>isPending ? "text-red-700" : isActive ? "mr-5 text-purple-700 underline cursor-pointer font-bold" : "mr-5 hover:text-purple-700 cursor-pointer font-bold"}>Cup Cakes</NavLink>
        </nav>
        <BsCart2 className="text-3xl hover:cursor-pointer hover:text-purple-700 mr-6" onMouseOver={()=>{setCartList(true)}} onMouseLeave={()=>{setCartList(false)}} />

        {cartList && <div className="custom_dropdown z-10 w-72 h-1/2 sideCart overflow-y-scroll absolute rounded-md top-16 right-3 bg-purple-100 border border-purple-400 px-8 py-10" onMouseOver={()=>{setCartList(true)}} onMouseLeave={()=>{setCartList(false)}}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
            {Object.keys(cart).map((k)=>{return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].category})</div>
                <div className='flex font-semibold items-center justify-center w-1/3 text-xl'><AiFillMinusCircle onClick={()=>(removeFromCart(k, 1))} className='cursor-pointer text-purple-600'/><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>(addToCart(k, cart[k].price, cart[k].name, cart[k].image_url, cart[k].desc, cart[k].category, 1))} className='cursor-pointer text-purple-600'/></div>
              </div>
            </li>})}
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
          <div className="flex justify-center">
            <Link to={'/checkout'}><button className="flex mr-2 text-white bg-purple-600 border-0 py-2 px-2 focus:outline-none hover:bg-purple-500 rounded text-sm"><BsFillBagCheckFill className='m-1'/>Checkout</button></Link>
            <button onClick={clearCart} className="flex mr-2 text-white bg-purple-600 border-0 py-2 px-2 focus:outline-none hover:bg-purple-500 rounded text-sm">Clear Cart</button>
          </div>
        </div>}

        <CgProfile className="text-3xl hover:cursor-pointer hover:text-purple-700 mr-4" onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} />
        {dropdown && <div className="absolute z-10 right-3 bg-purple-100 shadow-lg border border-purple-400 top-16 py-4 rounded-md px-4 w-32" onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
          <ul>
            <a href={'#'}><li className='py-1 hover:text-purple-700 text-sm font-bold'>Account</li></a>
            <a href={'#'}><li className='py-1 hover:text-purple-700 text-sm font-bold'>Orders</li></a>
            <li onClick={logout}  className='py-1 hover:text-purple-700 text-sm font-bold cursor-pointer'>Logout</li>
          </ul>
        </div>}
      </div>  
    </header>
  )
}

export default Navbar