const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
<<<<<<< HEAD
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const routes = require('./routes');
=======
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

>>>>>>> develop
const app = express();
const PORT = process.env.PORT || 3001;

// create new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

async function startApolloServer(typeDefs, resolvers) {
  await server.start();
  await server.applyMiddleware({
    app
  });
};



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
