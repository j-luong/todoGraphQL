import * as express from 'express';
import * as graphql from 'express-graphql';
import { schema } from './schemas/builder';
import { resolver } from './resolvers';
import bodyParser = require('body-parser');

const port = 3000;
const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello, World!'));
app.use('/graphql', graphql({
  schema,
  rootValue: resolver,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  })
}));

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
