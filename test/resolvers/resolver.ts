import { assert } from 'chai';
import { dbStub } from '../stubs/db';
import { ResolverTodo }  from '../../src/resolvers/todo';

let resolver;

describe('Resolvers', () => {
  beforeEach(() => {
    resolver = new ResolverTodo(dbStub);
  });

  afterEach(() => {
    dbStub.resetDB();
  });

  describe('#getTodo', () => {
    it('gets a todo as an array', () => {
      const id = 1;
      const todo = resolver.getTodo(id);

      assert.isArray(todo);
      assert.hasAllKeys(todo[0], ['id', 'content', 'done'])
    });

    it('throws if todo does not exist', () => {
      const id = -1;
      let todo;
      try {
        todo = resolver.getTodo(id);
      } catch (err) {
        todo = err;
      }
      assert.instanceOf(todo, Error);
    });
  });
  
  describe('#listTodo', () => {
    beforeEach(() => {
      dbStub.resetDB();
      resolver = new ResolverTodo(dbStub);
    });

    it('gets all todos if 3 todos', () => {
      const todos = resolver.listTodos();
      assert.isArray(todos);
      assert.lengthOf(todos, 3);
    });

    it('gets all todos if 8 todos', () => {
      resolver.createTodo({ content: "todo 1" });
      resolver.createTodo({ content: "todo 2" });
      resolver.createTodo({ content: "todo 3" });
      resolver.createTodo({ content: "todo 4" });
      resolver.createTodo({ content: "todo 5" });

      const todos = resolver.listTodos();

      assert.isArray(todos);
      assert.lengthOf(todos, 8);
    });
  });

  describe('#createTodo', () => {
    it('creates a new todo', () => {
      const todo = resolver.createTodo("Hello world");
      assert.equal(todo[0].content, "Hello world");
    });
  });

  describe('#completeTodo', () => {
    const id = 1;
    it('completes a todo', () => {
      resolver.completeTodo(id);
      const todo = resolver.getTodo(id);
      assert.equal(todo[0].done, true);
    });

    it('throws if todo does not exist', () => {
      const id = -1;
      let todo;
      try {
        resolver.completeTodo(id);
      } catch (err) {
        todo = err;
      }
      assert.instanceOf(todo, Error);
    })
  });

  describe('#deleteTodo', () => {
    const id = 1;
    it('deletes a todo', () => {
      resolver.deleteTodo(id);
      const todos = resolver.listTodos();
      assert.notEqual(todos[0].id, 1);
    });
  });
});
