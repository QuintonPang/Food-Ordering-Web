import Head from 'next/head'
import AddPizza from '../components/AddPizza'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'

const Home = ({pizzaList,admin}) => {

  return (
    <div className="flex flex-col items-center">
      <Featured/>
      <PizzaList pizzaList={pizzaList}/>
      {admin && 
        <AddPizza/>
      }
    </div>
  )
}

export const getServerSideProps = async (context) => {

  const myCookie = context.req?.cookies.token || ''
  const admin = myCookie===process.env.TOKEN?true:false
  
  const res = await (await fetch("http://localhost:3000/api/products")).json()

  return{
    props:{
      pizzaList:res,
      admin,
    }
  }
}

export default Home