import React,{useState,useEffect, createRef } from 'react'
import Image from 'next/image'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Featured = () => {

    const images = [
        '/img/featured.png',
        '/img/featured2.png',
        '/img/featured3.png',
    ]

    // const [elRefs, setElRefs] = useState([])
    const [index, setIndex] = useState(0)
    const [resetInterval, setResetInterval] = useState(false)
    const scrollRef = createRef()
    
    // useEffect(()=>{
    //     // Array.fill() with no arguments means filling the array with undefineds
    //     const refs= Array(images?.length).fill().map((_,i)=>elRefs[i]||createRef())
    //     setElRefs(refs)
    // },[images])

    useEffect(()=>{
        // elRefs[index%3]?.current?.scrollIntoView({behavior:"smooth",block:"start"})
        scrollRef?.current?.scroll({left:window.innerWidth*(index%3),top:0, behavior:"smooth"})
    },[index])

    useEffect(()=>{
        const scrollInterval = setInterval(()=>{
            setIndex(index++)
        },3000)

        return ()=> clearInterval(scrollInterval)
    },[resetInterval])

    const handleArrow = (direction) =>{
        if(direction==="left"){
            setIndex(index-1);
            setResetInterval(!resetInterval)
        }
        else if(direction==="right"){
            setIndex(index+1);
            setResetInterval(!resetInterval)
        }
    }

    return (
        <div className="w-screen bg-red-200">
            <div className="z-10 absolute" style={{top:"220px"}}>
                <button className="h-full w-full" onClick={()=>handleArrow("left")}>
                    <AiOutlineArrowLeft size={50} style={{color:"white"}}/>
                </button>       
            </div>
            <div className="h-96 overflow-x-hidden overflow-y-hidden" ref={scrollRef}>
                <div className="flex flex-row h-full" style={{width:"300vw"}}>
                    {images.map((img,i)=>
                        <div key={i} className="w-screen relative" >
                            <Image alt={img} src={img} layout="fill" objectFit="contain"/>
                        </div>)
                        }
                </div>
            </div>
            <div className="z-10 absolute right-10" style={{top:"220px"}}>
                <button className="h-full w-full" onClick={()=>handleArrow("right")}>
                    <AiOutlineArrowRight size={50} style={{color:"white"}}/>
                </button>       
            </div>
        </div>
    )
}

export default Featured