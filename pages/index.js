import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'

const Home = () => {
  return (
    <div>
      <Featured/>
      <PizzaList/>
    </div>
  )
}

export default Home