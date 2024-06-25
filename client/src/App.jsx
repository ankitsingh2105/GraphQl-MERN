import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, ApolloClient } from '@apollo/client';


const query = `
  query op{
  getUsers {
    name
    email
    website
  }
}
`

function App() {
  const [count, setCount] = useState(0)
  const { data, loading } = useQuery(query)
  useEffect(()=>{
    console.log("this is the data :: " , data);
  },[data])
  return (
    <>
    </>
  )
}

export default App
