const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");


const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Todo {
                id : ID!,
                title : String!,
                completed : Boolean,
                userId : ID!,
                user : Users
            },

            type Users{
                id : ID!,
                name : String,
                username : String,
                email : String,
                phone : String,
                website : String,
            }

            type Query {
                getTodos : [Todo]
                getUsers :[Users]
                getUser(id : ID!) : Users
                getPostAndUserInfo : [Todo]
            }

        `,
        resolvers: {
            Todo : {
                
            },
            Query: {
                getTodos: async()=> {
                    let response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
                    return response.data;
                },

                getUsers : async()=>{
                  let response = await axios.get("https://jsonplaceholder.typicode.com/users/");
                    return response.data;
                },

                getUser : async function(parent , {id}){
                    let response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                    return response.data;
                },

                getPostAndUserInfo : async function(){
                    let response  = await axios.get("https://jsonplaceholder.typicode.com/todos/")

                } 
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started at 8000");
    })
}

startServer();