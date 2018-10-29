const graphQL = require('graphql');
const _ = require('lodash');
const Todo = require('../models/todo');
const db = require('../db/db');

(() => {
  let count = 1;
  _.times(1, async () => {
    const newTodo = new Todo({id: count, body: `Todo numero ${count}` });
    count = ++count;
    await db.setAsync(newTodo.id.toString(), JSON.stringify(newTodo));
  })
})();

db.countItems(0).then(res => console.log(res.length));

// Todo type for GQL
const TodoType = new graphQL.GraphQLObjectType({
  name: 'todo',
  description: 'a todo item',
  fields: {
    id: { type: graphQL.GraphQLInt },
    content: { type: graphQL.GraphQLString },
    done: { type: graphQL.GraphQLBoolean }
  }
})

// Todo GQL queries and resolvers
const query = new graphQL.GraphQLObjectType({
  name: 'TodoQuery',
  fields: {
    todo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        id: {
          type: graphQL.GraphQLInt
        }
      },
      resolve: async (_, { id }) => {
        const todo = await db.getAsync(JSON.stringify(id));
        if (todo) return [JSON.parse(todo)];
        throw new Error('Invalid ID')
      }
    }
  }
})

// Todo GQL mutations and resolvers
const mutation = new graphQL.GraphQLObjectType({
  name: 'TodoMutation',
  fields: {
    createTodo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        content: {
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLString)
        }
      },
      resolve: async (_, { content }) => {
        const newTodo = new Todo(content);
        try {
          await db.setAsync(newTodo.id.toString(), JSON.stringify(newTodo));
          return [newTodo];
        } catch (err) {
          throw new Error(err.message);
        }
      }
    },
    completeTodo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        id: {
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLInt)
        }
      },
      resolve: async (_, { id }) => {
        try {
          const todo = await db.getAsync(id.toString());
          const parsedTodo = JSON.parse(todo);
          parsedTodo.done = true;
          await db.setAsync(id.toString(), JSON.stringify(parsedTodo));
          return [parsedTodo];
        } catch (err) {
          throw new Error(err.message);
        }
      }
    },
    deleteTodo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        id: {
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLInt)
        }
      },
      resolve: async (_, { id }) => {
        try {
          await db.delAsync(id.toString());
          return [];
        } catch (err) {
          throw new Error(err.message);
        }
      }
    }
  }
})

// create and export GQL schema
module.exports = new graphQL.GraphQLSchema({
  query,
  mutation
});
