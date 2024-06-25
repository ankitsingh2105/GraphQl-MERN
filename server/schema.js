const typeDefs = `#graphql
    type Game{
        id : ID!,
        title : String!,
        platform :  [String!]!
        reviews : [Review!]
        game : [Game!]
    }
    type Review{
        id : ID!,
        name : String!,
        content: String!
        game : Game!,
        author : Author!
    }
    type Author{
        id : ID!,
        name : String!,
        verified : Boolean!
        reviews : [Review!]
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
        singleUser(id : ID!): User
        singleGame(id : ID!) : Game,
        singleAuthor(id : ID!) : Author 
    }
    type Mutation{
        deleteGame(id : ID!) : Game
        addGame (game : AddGameInput!) : Game
        editGame (id : ID! , edits : EditGameInput!) : Game
    }    
    input AddGameInput{
        title : String!,
        platform : [String!]!
    }
    input EditGameInput{
        title : String,
        platform : [String!]
    }
`
module.exports = typeDefs
    // necessary to make