const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const typeDefs = require("./schema");

const { games, authors, reviews } = require("./db");


const resolvers = {
    // todo :: for nested queries we have to make a new obj
    // ! we cannot name this "Game" anything this have to be a type
    Game: {
        // todo::  this parent is the parent if the Game and is an entry point to the graph
        // ! this "reviews" have to match the "reviews in the schema"
        reviews: function (parent, args) {
            const { id } = parent;
            return reviews.filter((e) => {
                return e.gameId === id;
            })
        }
    },
    Author : {
        reviews : (parent)=>{
            const {id} = parent;    
            return reviews.filter((e)=>{
                return e.authorId === id; 
            })
        }
    },
    // todo :: these are resolvers for the entry point to the graph
    Query: {
        users: async function () {
            let response = await axios.get("https://jsonplaceholder.typicode.com/users/");
            return response.data;
        },

        games: function () {
            return games;
        },
        // todo :: for query varible
        singleUser: async function (parent, args) {
            const { id } = args;
            let response = await axios.get("https://jsonplaceholder.typicode.com/users/");
            const userArray = await response.data;
            let requiredUser = userArray.find((e) => {
                return e.id === parseInt(id);
            })
            return requiredUser;
        },
        singleGame: function (parent, args) {
            const { id } = args;
            return games.find((e) => e.id === id);
        },

        singleAuthor : function(parent , args){
            const {id} = args;
            return authors.find((e) => e.id === id);
        }
    },

    // todo :: resolver for mutation
    Mutation : {
        deleteGame : (parent , args)=>{
            const {id} = args;
            let updatedArray = games.filter((e)=>{
                return e.id !== id;
            })
            return updatedArray;
        }
    }
}

// query op($id : ID!){
//     singleUser(id : $id){
//       name
//     }
//   }

// ! for many query vairables ::
// query op($gameID :ID!, $authorID :ID!){
//     singleGame(id:$gameID) {
//       id,
//       platform,
//       reviews {
//         name
//         content
//       }
//     }
//     singleAuthor(id : $authorID){
//       name
//       verified
//       reviews {
//         name
//         content
//       }
//     }
//   }


const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started at http://localhost:8000");
    });
};

startServer();