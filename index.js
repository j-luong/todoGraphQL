const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./src/schemas/schema');

const app = express();

app.get('/', (req, res) => res.send("Hello world !"));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  })
}));

app.listen('3000', () => console.log('Server is listening on port 3000…'));
