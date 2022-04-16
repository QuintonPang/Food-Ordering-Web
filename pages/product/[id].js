import Image from 'next/image'
import React, { useState, useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({pizza}) => {
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [extraOptions, setExtraOptions] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [elRefs, setElRefs] = useState([])


  useEffect(()=>{
      // Array.fill() with no arguments means filling the array with undefineds
      const refs= Array(pizza?.extraOptions?.length).fill().map((_,i)=>elRefs[i]||createRef())
      setElRefs(refs)
  },[pizza?.extraOptions])

  useEffect(()=>{
    setTotalPrice((Number(price)+pizza.prices[size])*quantity)
  },[price,totalPrice,quantity])

  const dispatch = useDispatch()

  const handleExtraOption = (e) => {
    setPrice(e.target.checked?price+e.target.value:price-e.target.value)
    setExtraOptions([e.target.name,...extraOptions])
  }

  const handleAddToCart= async ()=>{
    dispatch(addProduct({...pizza,extraOptions,totalPrice,quantity}))
    alert("Added to cart")
    setQuantity(1)
    setSize(0)
    setPrice(0)
    elRefs.map(elRef=>{
      elRef.current.checked=false;
    })
    }

  // const pizza = {
  //   id:1,
  //   name: "Pepperoni",
  //   price: {
  //     small: "$10.0",
  //     medium: "$20.0",
  //     large: "$30.0",
  //   },
  //   image:"/img/pizza.png"
  // }

  return (
    <div className="m-10 flex flex-row gap-12 items-center justify-evenly">
      <div className="relative h-96 w-96">
        {/* contain means it rescales to fit inside parent element, cover means it preserves its ratio while being in parent element */}
        <Image layout="fill" objectFit="cover" src={pizza.image} alt={pizza.name}/>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="uppercase font-bold text-3xl">
          {pizza.name}
        </div>
        <div className="text-2xl">
          <p>{"$"+(Number(price)+pizza.prices[size])*quantity}</p>
        </div>
        <div className="text-md">
          {pizza.description}
        </div>
        <div className="text-lg font-bold">
          Choose your desired size:
        </div>
        <div className="flex flex-row items-start gap-20">
          <div onClick={()=>setSize(0)} className="flex flex-col items-center gap-2">
            <Image height={32} width={32} alt="small" src="/img/size.png"/>
            <small>Small</small>
          </div>
          <div onClick={()=>setSize(1)} className="flex flex-col items-center gap-2">
            <Image height={64} width={64} alt="medium" src="/img/size.png"/>
            <small>Medium</small>
          </div>
          <div onClick={()=>setSize(2)} className="flex flex-col items-center gap-2">
            <Image height={128} width={128} alt="large" src="/img/size.png"/>
            <small>Large</small>
          </div>
        </div>
        <div className="text-lg font-bold">
          Choose additional ingredients:
        </div>
        <div className="flex flex-row gap-8 items-center m-5">
          {pizza.extraOptions.map((extraOption,i)=>
            <div key={i} className="flex flex-row gap-2 justify-center items-center">
              <input ref={elRefs[i]} type="checkbox" id={extraOption.text} name={extraOption.text} value={extraOption.price} onClick={(e)=>handleExtraOption(e)}/>
              <label htmlFor={extraOption.text}>{extraOption.text} (${extraOption.price})</label>
            </div>
          )}
        </div>
        {/* <div className="flex flex-row gap-8 items-center m-5">
          <input type="checkbox" id="double-ingredients" value="double-ingredients"/>
            <label htmlFor="double-ingredients">Double Ingredients</label>
          <input type="checkbox" id="extra-cheese" value="extra-cheese"/>
            <label htmlFor="extra-cheese">Extra Cheese</label>
          <input type="checkbox" id="spicy-sauce" value="spicy-sauce"/>
            <label htmlFor="spicy-sauce">Spicy Sauce</label>
          <input type="checkbox" id="garlic-sauce" value="garlic-sauce"/>
            <label htmlFor="garlic-sauce">Garlic Sauce</label>
        </div> */}
        <div className="flex flex-row gap-4 items-center">
          <label htmlFor="quantity">Quantity: </label>
          <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="outline m-10" id="quantity" type="number"/>
          <button onClick={()=>handleAddToCart()}className="p-4 rounded-md h-16 bg-red-500 text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async({params}) =>{
  const pizza = await (await fetch(`http:localhost:3000/api/products/${params.id}`)).json()
  return{
    props:{
      pizza
    }
  }
}

export default Product