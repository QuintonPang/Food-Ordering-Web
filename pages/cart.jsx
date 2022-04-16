import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { AiFillCloseCircle } from 'react-icons/ai'
import { useRouter } from 'next/router'
import OrderDetails from '../components/OrderDetails';
import { reset } from '../redux/cartSlice'

const Cart = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const cart = useSelector(state=>state.cart)
    const [openCash, setOpenCash] = useState(false)
    const [subtotal, setSubtotal] = useState(0.00)
    const [discount, setDiscount] = useState(0.00)
    const [openPaypal, setOpenPaypal] = useState(false)
    
    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    
    const createOrder = async (data) =>{
        try{
            fetch('http://localhost:3000/api/orders',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>res.json())
            .then((data)=>{
                router.push(`/order/${data._id}`)
                dispatch(reset())
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        setSubtotal(cart.products.map(product=>{
            setSubtotal(subtotal+=product.totalPrice)
        }))
    },[cart])
  return (
    <div className="flex flex-row justify-evenly items-center h-screen w-screen">
        <table className="table-auto text-center my-20">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            {cart.products.map(product=>(
                <tbody key={product._id}>
                <tr>
                    <td className="h-64 w-64 relative p-16">
                        <Image src={product.image} layout="fill" objectFit="cover" alt="pizza"/>
                    </td>
                    <td className="p-16">
                        {product.name} 
                    </td>
                    <td className="p-16">
                        {product.extraOptions.map((extraOption,i)=><ul key={i}>{extraOption}</ul>)}
                    </td>
                    <td className="p-16">
                        {product.totalPrice}
                    </td>
                    <td className="p-16">
                        {product.quantity}
                    </td>
                    <td className="p-16">
                        {product.totalPrice}
                    </td>
                </tr>
            </tbody>
            ))}
            
        </table>
        <div className="m-8 p-8 flex flex-col gap-8 items-start justify-center bg-gray-700 rounded-md">
            <h2 className="uppercase text-white">
                CART TOTAL
            </h2>
            <div className="flex flex-col text-white">
                <p>
                    Subtotal: ${cart.subtotal}
                </p>
                <p>
                    Discount: ${discount}
                </p>
                <p>
                    Total: ${cart.subtotal-discount}
                </p> 
            </div>
            {openPaypal?(
            <div className="flex flex-col items-start gap-3">
                {/* <AiFillCloseCircle onClick={()=>setOpenPaypal(false)}size={20}/> */}
                <button onClick={()=>setOpenCash(true)}className="p-4 bg-green-500 font-bold text-white self-stretch uppercase">
                    Pay By Cash
                </button>
                <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD",
                    // "disable-funding":"credit,card,p24", // disables credit card and other options
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    style={style}
                    amount={amount}
                />
			</PayPalScriptProvider>
            </div>):(
            <button onClick={()=>setOpenPaypal(true)}className="p-4 bg-red-500 font-bold text-white self-stretch uppercase">
                CLICK HERE TO CHECKOUT!
            </button>
            )}
        </div>
        {openCash&&( 
            <OrderDetails subtotal={cart.subtotal} createOrder={createOrder}/>    
            )}
      </div>
      )
}



const ButtonWrapper = ({ currency, showSpinner, style, amount }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // Your code here after capture the order
                        // console.log(details)
                        const shipping = details.purchase_unit[0].shipping
                        createOrder({
                            customer:shipping.name.full_name,
                            address:shipping.address_line_1,
                            total:cart.subtotal,
                            method:1 // cash method is 0, paypal is 1
                        })
                    });
                }}
            />
        </>
    );
}


export default Cart