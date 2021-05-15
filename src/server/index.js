const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

// our mock database
const POSTS = [
	{ author: "John Doe", body: "Hello world" },
	{ author: "Jane Doe", body: "Hi, planet!" },
];


// `gql` notifies our IDE that the following is graphQL syntax;
// `buildASTSchema` creates a schema
// `Query` type is special, sets up what we can query
// all other types are created to our needs
const schema = buildASTSchema(gql`
	type Query {
		posts: [Post]
		post(id: ID!): Post
	}

	type Post {
		id: ID
		author: String
		body: String
	}
`);

// Actual query example in gQL
// query {
//   posts {
//     id
//     author
//     body
//   }
//   post(id:1) {
//   	id 
//     author
//     body
//   }
// }


const mapPost = (post, id) => post && { id, ...post };

const root = {
	posts: () => POSTS.map(mapPost),
	post: ({ id }) => mapPost(POSTS[id], id),
};

const app = express();
app.use(cors());
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true,
	})
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
