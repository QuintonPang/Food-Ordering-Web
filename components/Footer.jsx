import React from 'react'
import Image from 'next/image'

const Footer = () => {

  const addresses = [
    "15 Jln Loke Yew,\n55200 Kuala Lumpur",
    "62 Jln 15/18A Taman Mastiara,\n51200 Kuala Lumpur",
    "16-1 Jln Pjs 8/2 Dataran Mentari,\n46150 Petaling Jaya, 46510 Selangor",
  ]

  return (
    <div className="h-full bg-gray-900 flex flex-row gap-8 items-center">
      <div>
        <Image height={270} width={500} src="/img/footer.jpg" alt="footer"/>
      </div>
      <div className="uppercase italic text-white m-3 text-2xl">
        <p>Serving you with</p> 
        <p>the best pizza </p>
        <p>since 1957</p>
      </div>
      <div className="flex flex-col gap-3 justify-center text-sm">
        <div className="uppercase font-bold text-orange-400 tracking-widest">
          OUR CURRENT RESTAURANTS
        </div>
        <div className="flex flex-col justify-start">
          {addresses.map((address,i)=>
            <p key={i} className="text-white text-sm my-4">
              {address}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center text-sm">
        <div className="uppercase font-bold text-orange-400 tracking-widest">
            WORKING HOURS
        </div>
        <div className="flex flex-col justify-start">         
            <p className="text-white text-sm my-2"> 
              <p>
                MONDAY TO FRIDAY:
              </p>
              <p>
                8:00 - 20:00
              </p>         
            </p>
            <p className="text-white text-sm my-2"> 
              <p>
                SATURDAY & SUNDAY: 
              </p>
              <p>
                6:00 - 22:00         
              </p>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Footer