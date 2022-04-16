import React, { useState } from 'react'

const OrderDetails = ({subtotal,createOrder}) => {

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const handleOrder = async () =>{

        const data = await {
            customer:name,
            address:address,
            total:subtotal,
            method:1 // cash method is 0, paypal is 1
        }
        
        createOrder(data)
    }

    return (
        <div className="z-50 top-0 left-0 absolute flex flex-col gap-4 justify-center items-center h-screen w-screen bg-gray-900/50">
            <div className="flex flex-col bg-white p-8 rounded-lg">
                <h1 className="font-bold">You will pay ${subtotal} after delivery.</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="name">Name</label>
                        <input className="outline w-full" type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="phone-number">Phone number</label>
                        <input className="outline w-full"  type="text" id="phone-number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="address">Address</label>
                        <textarea className="outline w-full"  id="address" value={address} rows="5" onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <button className="bg-red-500 p-4 text-white font-bold" onClick={handleOrder}>
                        ORDER
                    </button>
                </div>
            </div>  
        </div>  
  )
}

export default OrderDetails