import { useRouter } from 'next/router'
import React, { useState } from 'react'

const login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  const handleLogin = () =>{
    try{
      fetch('http://localhost:3000/api/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        username,
        password,
        })
      }).then(res=>{
        if(res.status===200) router.push('/admin')
        else setError(true)
      }) 
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="flex flex-col gap-16 items-center h-full w-full p-28 items-center justify-stretch">
      <h1 className="font-bold text-3xl">Login as administrator</h1>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-row gap-3 items-center">
          <label htmlFor="username">Username</label>
          <input className="outline" id="username" type="text" onChange={((e)=>setUsername(e.target.value))} value={username} />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <label htmlFor="username">Password</label>
          <input className="outline" id="password" type="password" onChange={((e)=>setPassword(e.target.value))} value={password}/>
        </div>
        <button className="bg-red-500 text-white p-4 rounded-lg border-red-900 border-solid border-2 h-16 w-32" onClick={handleLogin}>
          LOGIN
        </button>
        {error&&(
          <p className="text-xs text-red-600">Wrong credentials</p>
        )}
      </div>
    </div>
  )
}

export default login