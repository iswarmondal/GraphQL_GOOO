const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');
const {authors, books} = require('./data');

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents an author",
    fields: () => ({
        id:{
            type: new GraphQLNonNull(GraphQLInt),
        },
        name:{
            type: new GraphQLNonNull(GraphQLString),
        },
        books:{
            type: new GraphQLList(BookType),
            resolve: (author) => (books.filter(book => book.authorId === author.id ))
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: ()=>({
        id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        name:{
            type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        author: {
            type: AuthorType,
            resolve: (book)=>{
                return(
                    authors.find(author=> author.id === book.authorId)
                )
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
name: "Query",
description: "Root query",
fields: ()=>({
    books:{
        type: new GraphQLList(BookType),
        description: "List of all the books",
        resolve: () => books
    },
    authors:{
        type: new GraphQLList(AuthorType),
        description: "List of all the authors",
        resolve: () => authors
    },
    author:{
        type: AuthorType,
        description: "A single author",
        args: {
            id:{
                type: GraphQLInt
            }
        },
        resolve: (parent, args)=>{
            return(
                authors.find(author => author.id === args.id)
            )
        }
    }
})
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
                books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name }
                authors.push(author)
                return author
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

app.use("/graphql", expressGraphQL({
    schema,
    graphiql: true
}))


app.listen(4545, ()=> console.log('Server is running on port 4545'))