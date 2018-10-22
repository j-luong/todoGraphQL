const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./src/schemas/schema');

const app = express();

app.get('/', (req, res) => res.send("Hello world !"));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen('3000', () => console.log('Server is listening on port 3000…'));
