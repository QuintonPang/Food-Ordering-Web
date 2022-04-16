import React, { useState } from 'react'
import Image from 'next/image'

const index = ({pizzas,orders}) => {

  const [orderList, setOrderList] = useState(orders)
  const [pizzaList, setPizzaList] = useState(pizzas)

  const handleDelete = (id) =>{
    try{
      fetch('http://localhost:3000/api/products/'+id,{
          method:'DELETE',
      })
      .then(res=>{
        res.json()
        setPizzaList([
          ...pizzaList.filter(pizza=>pizza._id!==id)
        ])   
      })

    }catch(err){
      console.log(err)
    }
  }
  const handleNextStage = (id, status) =>{

    const data = {
      status
    }
    try{
      fetch('http://localhost:3000/api/orders/'+id,{
          method:'PUT',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then((data)=>{
          setOrderList([
            data,
            ...orderList.filter(order=>order._id!==id)
          ])   
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="flex flex-row gap-4 w-screen h-full p-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Product</h1>
        <table className="table-auto text-center my-20">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            {pizzaList.map(pizza=>(
                <tbody key={pizza._id}>
                <tr>
                    <td className="h-32 w-32 relative p-6">
                        <Image src={pizza.image} layout="fill" objectFit="contain" alt="pizza"/>
                    </td>
                    <td className="p-6">
                        {pizza._id} 
                    </td>
                    <td className="p-6">
                        {pizza.name}
                    </td>
                    <td className="p-6">
                        {pizza.prices[0]}
                    </td>
                    <td className="flex flex-row gap-4 p-6">
                        <button className="bg-pink-500 text-white p-4 ">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white p-4" onClick={()=>handleDelete(pizza._id)}>
                          Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            ))}   
        </table>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Orders</h1>
        <table className="table-auto text-center my-20">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            {orderList.map(order=>(
                <tbody key={order._id}>
                <tr>
                    <td className="p-6">
                       {order._id}
                    </td>
                    <td className="p-6">
                        {order.customer} 
                    </td>
                    <td className="p-6">
                        {order.total}
                    </td>
                    <td className="p-6">
                        {order.status>=0?"Paid":"Unpaid"}
                    </td>
                    <td className="p-6">
                      {order.status===0&&"Paid"}
                      {order.status===1&&"Preparing"}
                      {order.status===2&&"On the way"}
                      {order.status===3&&"Delivered"}
                    </td>
                    <td className="p-6">
                      <button onClick={()=>handleNextStage(order._id,order.status+1)} className="p-2 bg-red-500 text-white">
                        Next stage
                      </button>
                    </td>
                </tr>
            </tbody>
            ))}   
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async(context) =>{
  
  const myCookie = context.req?.cookies.token || ''

  if(myCookie!==process.env.TOKEN)
    return{
      redirect:{
        destination:"/admin/login",
        permanent:false, // in same tab
      }
  }
  
  const orders = await (await fetch(`http:localhost:3000/api/orders`)).json()
  const pizzas = await (await fetch(`http:localhost:3000/api/products`)).json()
  
  return{
    props:{
      pizzas,
      orders
    }
  }
}

export default index