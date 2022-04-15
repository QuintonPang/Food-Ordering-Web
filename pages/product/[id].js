import Image from 'next/image'
import React, { useState} from 'react'

const Product = () => {

  const pizza = {
    id:1,
    name: "Pepperoni",
    price: {
      small: "$10.0",
      medium: "$20.0",
      large: "$30.0",
    },
    image:"/img/pizza.png"
  }

  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="m-10 flex flex-row gap-12 items-center justify-evenly">
      <div>
        <Image width={960} height={960} src={pizza.image} alt={pizza.name}/>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="uppercase font-bold text-3xl">
          {pizza.name}
        </div>
        <div className="text-2xl">
          {size===0 && <p>{pizza.price.small}</p>}
          {size===1 && <p>{pizza.price.medium}</p>}
          {size===2 && <p> {pizza.price.large}</p>}
        </div>
        <div className="text-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="text-lg font-bold">
          Choose your desired size:
        </div>
        <div className="flex flex-row items-start gap-20">
          <div className="flex flex-col items-center gap-2">
            <Image height={32} width={32} alt="small" src="/img/size.png"/>
            <small>Small</small>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image height={64} width={64} alt="medium" src="/img/size.png"/>
            <small>Medium</small>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image height={128} width={128} alt="large" src="/img/size.png"/>
            <small>Large</small>
          </div>
        </div>
        <div className="text-lg font-bold">
          Choose additional ingredients:
        </div>
        <div className="flex flex-row gap-8 items-center m-5">
          <input type="checkbox" id="double-ingredients" value="double-ingredients"/>
            <label htmlFor="double-ingredients">Double Ingredients</label>
          <input type="checkbox" id="extra-cheese" value="extra-cheese"/>
            <label htmlFor="extra-cheese">Extra Cheese</label>
          <input type="checkbox" id="spicy-sauce" value="spicy-sauce"/>
            <label htmlFor="spicy-sauce">Spicy Sauce</label>
          <input type="checkbox" id="garlic-sauce" value="garlic-sauce"/>
            <label htmlFor="garlic-sauce">Garlic Sauce</label>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <label htmlFor="quantity">Quantity: </label>
          <input className="outline m-10" id="quantity" type="number"/>
          <button className="p-4 rounded-md h-16 bg-red-500 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product