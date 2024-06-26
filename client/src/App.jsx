import { useEffect, useRef, useState } from 'react'
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

const singleUserData = gql`
    query singleUser($userID : ID!){
    singleUser(id : $userID){
    id
    name
    username,
    address {
      city
      street
    }
  }
}
    `

function App() {
  const { data: gameData, loading, error } = useQuery(query)
  const [userID, setuserID] = useState("")

  // todo :: if we want to get data onClick
  // const {data : userData , loading : userLoading} = useQuery(singleUserData);
  const [
    fetchUser,
    { data: userData, loading: userLoading }
  ] = useLazyQuery(singleUserData);

  useEffect(() => {
    console.log("this is the user :: ", userData);
  }, [userData])


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
      <br />
      <input type="text" onChange={((e) => { setuserID(e.target.value) })} />
      <br />
      <br />
      <button onClick={() => {
        fetchUser({
          variables: {
            userID: userID
          }
        })
      }} >
        Fetch Users
      </button>
      <br />
      {
        userLoading ?
          <>
            <div>Loading the users</div>
          </>
          :
          <>
            {
              userData ?
                <>
                  <h3>{userData.singleUser.name}</h3>
                  <p>{userData.singleUser.username}</p>
                  <p>{userData.singleUser.address.city}, {userData.singleUser.address.street}</p>
                </>
                :
                <>
                </>
            }
          </>
      }
    </>
  )
}

export default App
