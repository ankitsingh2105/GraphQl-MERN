const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const typeDefs = require("./schema");
const { games, authors, reviews } = require("./db");
console.log(games ,authors , reviews);
const resolvers = {
    Query: {
        
        users : async function (){
            let response = await axios.get("https://jsonplaceholder.typicode.com/users/");
            return response.data;
        },

        games : function(){
            return games;
        }

    }
}
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
