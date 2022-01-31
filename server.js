const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLString, 
  GraphQLList, 
  GraphQLInt, 
  GraphQLNonNull
} = require("graphql")
const app = express();
const {authors, books} = require("./data");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This is the representation of a book written by an author",
  fields: ()=>({
    id: {type: new GraphQLNonNull( GraphQLInt )},
    name: {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(GraphQLInt)}
  })
})

const rootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root query",
  fields: ()=>({
    books: {
      type: new GraphQLList(BookType),
      description: "All the books",
      resolve: ()=>books
    }
  })
})

const schema = new GraphQLSchema({
  query: rootQueryType
})

app.use("/graph", expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(5000, ()=>console.log("Server is running"));