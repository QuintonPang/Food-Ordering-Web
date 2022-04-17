import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <div className="bg-red-500 w-full h-16 sticky top-0 z-50">
      <div className="text-white h-full flex flex-row gap-2 justify-evenly items-center">
        <div className="flex-1 flex flex-row items-center gap-3 justify-center">
          <div className="">
            <FiPhoneCall size={30} />
          </div>
          <div className="flex flex-col text-xs">
            <div>
              ORDER NOW:
            </div>
            <div>
              012 345 6789
            </div>
          </div>
        </div>
        <div className="flex-3 flex flex-row  items-center gap-3">
          {/* passHref forces href into children element */}
          <Link href="/" passHref>
            Homepage
          </Link>
          <div>
            Products
          </div>
          <div>
            Menu
          </div>
          <div className="font-bold text-4xl font-serif">
            PIZZA
          </div>
          <div>
            Events
          </div>
          <div>
            Blog
          </div>
          <div>
            Contact
          </div>
        </div> 
        <Link href="/cart" passHref>
          <div className="flex flex-1 flex-row justify-center gap-2">
            <AiOutlineShoppingCart size={30}/>
            <div className="relative top-1">{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar