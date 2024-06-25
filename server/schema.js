const typeDefs = `#graphql
    type Game{
        id : ID!,
        title : String!,
        platform :  [String!]!
    }
    type Review{
        id : ID!,
        name : String!,
        content: String!
    }
    type Author{
        id : ID!,
        name : String!,
        verified : Boolean!
    } 
    type Address {
        street: String!
        suite: String!
        city: String!
        zipcode: String!
    }    
    type User{
        id : ID!,
        name : String!,
        username : String,
        address : Address
    }
    type Query{
        reviews : [Review]
        games : [Game],
        authors : [Author]
        users : [User]
    }
    `
module.exports = typeDefs
    // necessary to make