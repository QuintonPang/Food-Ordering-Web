import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useRouter } from 'next/router'

const AddPizza = () => {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priceSmall, setPriceSmall] = useState(0)
    const [priceMedium, setPriceMedium] = useState(0)
    const [priceLarge, setPriceLarge] = useState(0)
    const [extraOptions, setExtraOptions] = useState([])
    const [extraOptionsQuantity, setExtraOptionsQuantity] = useState(1)

    const handleAdd = async() =>{
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","uploads") // must be same as upload preset name
        try{
            fetch("https://api.cloudinary.com/v1_1/quintonpyx/image/upload",{
                method:"POST",
                body:data,
            })
            .then(res=>{
                // console.log(res.json())
                return res.json()
            }).then(data=>{
                // console.log(data)
                fetch("http://localhost:3000/api/products",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        name,
                        description,
                        image: data.url,
                        prices:[
                            priceSmall,
                            priceMedium,
                            priceLarge
                        ],
                        extraOptions:[
                            ...extraOptions
                        ],
                    })
                })
                .then((res)=>{
                    alert("Product added successfully")
                    setOpen(false)
                    setName('')
                    setDescription('')
                    setPriceSmall(0)
                    setPriceMedium(0)
                    setPriceLarge(0)
                    setExtraOptions([])
                    setExtraOptionsQuantity(1)
                    router.push('/')
                })
                })

            
        }catch(err){
            console.log(err)
        }
    }

    const handleExtraOptions = (e,i) =>{
        if(e.type==="text") extraOptions[i].name=e.target.value
        else if(e.type==="number") extraOptions[i].price=e.target.value
    }

  return (
      <div>
        {open&&(
            <div className="fixed z-50 top-0 left-0 flex flex-col gap-4 justify-center items-center h-screen w-screen bg-gray-900/50">
            <div className="flex flex-col bg-white p-8 rounded-lg">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold">Add New Pizza</h1>
                    <AiFillCloseCircle onClick={()=>setOpen(false)} className="relative top-2"/>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="image">Image</label>
                        {/* e.target.value is file path, e.target.files[0] is the actual file*/}
                        <input className="w-full" type="file" id="image" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="name">Name</label>
                        <input className="outline w-full"  type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="description">Description</label>
                        <textarea className="outline w-full"  id="description" value={description} rows="5" onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Prices:</p>
                        <div className="flex flex-col gap-1 items-start">
                            <label htmlFor="price-small">Small</label>
                            <input className="outline w-full"  type="number" id="price-small" value={priceSmall} onChange={(e)=>setPriceSmall(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <label htmlFor="price-medium">Medium</label>
                            <input className="outline w-full"  type="number" id="price-medium" value={priceMedium} onChange={(e)=>setPriceMedium(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <label htmlFor="price-large">Large</label>
                            <input className="outline w-full"  type="number" id="price-large" value={priceLarge} onChange={(e)=>setPriceLarge(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        Extras
                        {Array(extraOptionsQuantity).fill().map((_,i)=>
                            <div key={i} className="flex flex-row gap-2 items-center">
                                <label htmlFor={`extra${i}`}>{i+1}.</label>
                                <input className="outline w-full"  id={`extra${i}`} type="text" onChange={(e)=>handleExtraOptions(e,i)} />
                                <input className="outline w-full"  id={`extra${i}`} type="number" onChange={(e)=>handleExtraOptions(e,i)} />
                            </div>
                        )}
                        <button className="bg-white text-black border-2 border-black border-solid w-40 self-center" onClick={()=>setExtraOptionsQuantity(extraOptionsQuantity<3?extraOptionsQuantity+1:extraOptionsQuantity)}>Add extra option</button>
                        <button className="bg-white text-black border-2 border-black border-solid w-40 self-center" onClick={()=>setExtraOptionsQuantity(extraOptionsQuantity>0?extraOptionsQuantity-1:extraOptionsQuantity)}>Remove extra option</button>
                    </div>
                    <button className="bg-red-500 p-4 text-white font-bold" onClick={handleAdd} >
                        ADD
                    </button>
                </div>
            </div>  
        </div>  
        )}
          <div>
              <button onClick={()=>setOpen(true)} className="bg-red-500 text-white p-4 m-12">
                  Add Pizza As Admin
              </button>
          </div>
      </div>
  )
}

export default AddPizza