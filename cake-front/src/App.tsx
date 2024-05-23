import { useState, createContext, useEffect } from "react";
import './App.css'
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Forgotpass from './pages/forgotpass';
import Nopage from './pages/nopage';
import Home from './pages/home';
import Cakes from './pages/cakes';
import Readmore from './pages/readmore';
import Checkout from "./pages/checkout";
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export const UserContext = createContext(null!);

function App() {
  const router = useNavigate();
  const [modal, setModal] = useState(false)
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  const logout = () => {
    localStorage.removeItem('token');
    router('/login');
  }

  useEffect(() => {
    try {
      if(localStorage.getItem("cakes")){
        setCart(JSON.parse(localStorage.getItem("cakes")))
        saveCart(JSON.parse(localStorage.getItem("cakes")))
       }
     } catch (error) {
      console.error(error)
      localStorage.clear()
     }
  }, [])

  const saveCart = (myCart: any)=>{
    localStorage.setItem("cakes", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for(let i=0; i<keys.length; i++){
        subt += myCart[keys[i]]["price"] * myCart[keys[i]].qty;
    } 
    setSubTotal(subt)
  }

  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

  const addToCart = (
    sl:number,
    price:number,
    name:string,
    image_url:string,
    desc:string,
    category:string,
    qty:number,
) => {
    let newCart: any = cart;
    if(sl in cart) {
      newCart[sl].qty = cart[sl].qty + qty
    }
    else{
      newCart[sl] = {sl, price, name, image_url, desc, category, qty: 1}
    }
    setCart(newCart)
    // console.log(newCart);
    saveCart(newCart)
    setModal(false); 
}

const buyNow = (
  sl:number,
  price:number,
  name:string,
  image_url:string,
  desc:string,
  category:string,
  qty:number,
) => {
  console.log(sl,"check sl");
  
  let newCart = {[sl]: {sl, price, name, image_url, desc, category, qty: 1}};
  
  setCart(newCart)
  saveCart(newCart)
  setModal(false);
  router('/checkout')
}

const removeFromCart = (
  sl:number,
  qty:number
)=> {
  let newCart = JSON.parse(JSON.stringify(cart));
  if(sl in cart) {
    newCart[sl].qty = cart[sl].qty - qty
  }
  if(newCart[sl]["qty"]<=0){
    delete newCart[sl]
  }
  setCart(newCart)
  saveCart(newCart)
}
  

  return (
    <UserContext.Provider value={{addToCart:addToCart, buyNow:buyNow, removeFromCart:removeFromCart, clearCart:clearCart, cart:cart, subTotal:subTotal, logout:logout, setModal:setModal, modal:modal}}>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotpass" element={<Forgotpass />} />

        <Route element={<div> <Navbar/><Outlet/><Footer/></div>}>
          <Route index element={<Home />} />
          <Route path="cakes/:category" element={<Cakes />} />
          <Route path="readmore/:sl" element={<Readmore />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
