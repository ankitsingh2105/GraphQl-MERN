import { useEffect, useState } from 'react'
import './App.css'
import { useQuery, ApolloClient } from '@apollo/client';
import { gql, useLazyQuery } from '@apollo/client';


const query = gql`
query listGames{
  games {
    title
    platform
  }
}
`

function App() {
  const [count, setCount] = useState(0)
  const { data : gameData, loading, error } = useQuery(query)
  useEffect(() => {
    console.log("this is the gameData :: ", gameData);
  },[gameData])
  return (
    <>
      {
        !loading ?
          <>
            {
              gameData.games.map((e, index) => {
                return (
                  <>
                    <section key={index} >
                      <div key={index} >{e.id}</div>
                      <h2 >{e.title}</h2>
                      <div>
                        {
                          e.platform.map((ee, index) => {
                            return (
                              <div key={ee}>{ee}</div>
                            )
                          })
                        }
                      </div>
                      <br />
                    </section>
                  </>

                )
              })
            }
          </>
          :
          <>
            <div>loading........</div>
          </>
      }
    </>
  )
}

export default App
