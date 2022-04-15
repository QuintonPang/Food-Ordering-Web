import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'

const Home = ({pizzaList}) => {

  return (
    <div>
      <Featured/>
      <PizzaList pizzaList={pizzaList}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await (await fetch("http://localhost:3000/api/products")).json()
  
  return{
    props:{
      pizzaList:res,
    }
  }
}

export default Home