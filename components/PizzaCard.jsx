import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PizzaCard = ({pizza}) => {
  return (
    <Link href={`/product/${pizza._id}`}>
      <div className="flex flex-col items-center p-8 w-96 h-96 rounded overflow-hidden shadow-lg">
        <Image width={144} height={144} class="w-full" src="/img/pizza.png" alt={pizza.name}/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{pizza.name.charAt(0).toUpperCase()+pizza.name.slice(1)}</div>
            <p className="text-gray-700 text-base">
            {"$"+pizza.prices[0]}
            </p>
        </div>
      </div>
    </Link>

  
  )
}

export default PizzaCard