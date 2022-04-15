import React from 'react'
import PizzaCard from './PizzaCard'

const PizzaList = () => {

    const pizzaList = [
        {
            name:"pepperoni",
            price:"$500",
        },
        {
            name:"beef",
            price:"$600",
        },
        {
            name:"pepperoni",
            price:"$500",
        },
        {
            name:"beef",
            price:"$600",
        },
        {
            name:"pepperoni",
            price:"$500",
        },
        {
            name:"beef",
            price:"$600",
        },
    ]

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
        <h1 className="font-bold italic text-3xl text-red-500">
            BEST PIZZA YOU WILL EVER TASTE
        </h1>
        <p className="text-sm px-40">
            {'\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"'}
        </p>
        <div className="flex flex-row flex-wrap gap-5 w-screen h-full justify-center mt-20">
            {pizzaList.map((pizza,i)=>(
                <PizzaCard key={i} pizza={pizza}/>
            ))}
        </div>
    </div>
  )
}

export default PizzaList