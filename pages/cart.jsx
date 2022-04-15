import React from 'react'
import Image from 'next/image'

const Cart = () => {
  return (
    <div className="flex flex-row justify-evenly items-center">
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
            <tbody >
                <tr>
                    <td className="h-64 w-64 relative p-16">
                        <Image src="/img/pizza.png" layout="fill" objectFit="cover" alt="pizza"/>
                    </td>
                    <td className="p-16">
                        Pepperoni 
                    </td>
                    <td className="p-16">
                        Double ingredients
                    </td>
                    <td className="p-16">
                        $20.00
                    </td>
                    <td className="p-16">
                        2
                    </td>
                    <td className="p-16">
                        $40.0
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
            <button className="p-4 bg-red-500 self-stretch uppercase">
                CHECKOUT NOW!
            </button>
        </div>
      </div>
      )
}

export default Cart