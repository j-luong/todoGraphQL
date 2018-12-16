import * as FileHound from 'filehound';
import * as fs from 'fs';
import { buildSchema } from 'graphql';

function buildGraphQLSchema(): any {
  const schemaFiles = FileHound.create()
    .depth(`${__dirname}../src/schemas/`)
    .ext('gql')
    .findSync();

  const graphQLSchema = schemaFiles.reduce((acc, file) => {
    const query = fs.readFileSync(file).toString();
    return `${acc}${query}`;
  }, '');

  return buildSchema(graphQLSchema);
}

export const schema = buildGraphQLSchema();
