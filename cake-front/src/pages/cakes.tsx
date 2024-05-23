import LoginWrapper from "../utils/middleware"
import { useEffect, useState, useContext } from "react"
import Modal from "../components/Modal"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../App";

const Cakes = () => {
    const {category} = useParams();
    const [passId, setPassId] = useState(0) as any
    const {modal, setModal} = useContext(UserContext);
    const [cakes, setCakes] = useState<
    {
        sl:number;
        price:number;
        name:string;
        image_url:string;
        desc:string;
        category:string;
    }[]>([]);

    const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
        setPassId(e.currentTarget.getAttribute('data-id'));
        setModal(true);
    }
    

    const fetchData = async () => {
        try {
            let data = await fetch(`${import.meta.env.VITE_BASE_URL}/cakes/fetchCakes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({category: category}),
            })
            let response = await data.json();
            setCakes(response.data);
                        
        } catch (error) {
            console.log(error);    
        }
    }

    useEffect(() => {
       fetchData();
    }, [category])
    
  return (
    <LoginWrapper>
    <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-20 mx-auto">
            <div className="flex flex-wrap -m-4">
                { cakes.map((itm,index)=>(
                <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <a className="block relative h-48 rounded overflow-hidden">
                    <img onClick={(e)=>openModal(e)} data-id={itm.sl} alt="ecommerce" className="object-cover object-center w-full h-full block cursor-pointer" src={itm.image_url} />
                    </a>
                    <div className="grid grid-flow-col content-between">
                        <div className="mt-4">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 text-start">{itm.category}</h3>
                            <h2 className="text-gray-900 title-font text-lg font-medium text-start">{itm.name}</h2>
                            <p className="mt-1 text-start">₹{itm.price}</p>
                        </div>
                        <div className="mt-4">
                            <Link to={`/readmore/${itm.sl}`} className="text-md font-semibold leading-6 text-purple-700">Read more <span aria-hidden="true">→</span></Link>
                        </div>
                    </div>
                </div>  ))}
                {/* <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://sallysbakingaddiction.com/wp-content/uploads/2017/12/homemade-strawberry-cake-4-425x638.jpg" />
                    </a>
                    <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                    <p className="mt-1">$21.15</p>
                    </div>
                </div> */}
            </div>
        </div>
    </section>
    {modal && <Modal passId={passId}/>}
    </LoginWrapper>
  )
}

export default Cakes