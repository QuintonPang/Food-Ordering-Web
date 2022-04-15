import React, { useState } from 'react'
import Image from 'next/image'
import { MdDone, MdError } from 'react-icons/md'

const Order = () => {

    const [status, setStatus] = useState(0)
    return (
        <div className="flex flex-row justify-evenly items-center">
            <table className="table-auto text-center my-20">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-16">
                            123456789
                        </td>
                        <td className="p-16">
                            Quinton Pang
                        </td>
                        <td className="p-16">
                            65, Taman Sentosa
                        </td>
                        <td className="p-16">
                            $20.00
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-col items-center gap-2">
                            Payment
                            {status>=0?<MdDone style={{color:"green"}}/>:<MdError style={{color:"red"}}/>}
                        </td>
                        <td className="flex flex-col items-center gap-2">
                            Preparing
                            {status>=1?<MdDone style={{color:"green"}}/>:<MdError style={{color:"red"}}/>}
                        </td>
                        <td className="flex flex-col items-center gap-2">
                            On the way
                            {status>=2?<MdDone style={{color:"green"}}/>:<MdError style={{color:"red"}}/>}
                        </td>
                        <td className="">
                            <div className="flex flex-col items-center gap-2">
                                Delivered
                                {status>=3?<MdDone style={{color:"green"}}/>:<MdError style={{color:"red"}}/>}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="p-8 flex flex-col gap-8 items-start justify-center bg-gray-700 rounded-md">
                <h2 className="uppercase text-white">
                    CART TOTAL
                </h2>
                <div className="flex flex-col text-white">
                    <p>
                        Subtotal: $40.00
                    </p>
                    <p>
                        Discount: $0.00
                    </p>
                    <p>
                        Total: $40.00
                    </p> 
                </div>
                <button className="p-4 text-blue-500 bg-white self-stretch uppercase">
                    PAID
                </button>
            </div>
        </div>
        )
}

export default Order