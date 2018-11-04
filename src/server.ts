import * as express from 'express';
import * as graphql from 'express-graphql';
import * as schema from './schemas/schema';

const port = 3000;
const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => res.send('Hello, World!'));
app.use('/graphql', graphql({
  schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  })
}));

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
