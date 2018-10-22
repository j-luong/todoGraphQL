const graphQL = require('graphql');
const Todo = require('../models/todo');
const DB = {};

(() => {
  const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn functional programming'];

  todos.map(todo => {
    const newTodo = new Todo(todo);
    DB[newTodo.id] = newTodo;
  });
})();

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
      resolve: (_, { id }) => {
        if (id) return [DB[id]];
        return Object.values(DB);
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
      resolve: (_, { content }) => {
        const newTodo = new Todo(content);
        DB[newTodo.id] = newTodo;
        return Object.values(DB);
      }
    },
    completeTodo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        id: {
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLInt)
        }
      },
      resolve: (_, { id }) => {
        DB[id].done = true;
        return Object.values(DB);
      }
    },
    deleteTodo: {
      type: new graphQL.GraphQLList(TodoType),
      args: {
        id: {
          type: new graphQL.GraphQLNonNull(graphQL.GraphQLInt)
        }
      },
      resolve: (_, { id }) => {
        delete DB[id];
        return Object.values(DB);
      }
    }
  }
})

// create and export GQL schema
module.exports = new graphQL.GraphQLSchema({
  query,
  mutation
});
