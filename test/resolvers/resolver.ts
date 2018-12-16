import { assert } from 'chai';
import { ResolverTodo } from '../../src/resolvers/todo';
import { dbStub } from '../stubs/db';

let resolver;

describe('Resolvers', () => {
  beforeEach(() => {
    resolver = new ResolverTodo(dbStub);
  });

  afterEach(() => {
    dbStub.resetDB();
  });

  describe('#getTodo', () => {
    it('gets a todo as an array', async () => {
      const id = 1;
      const todo = await resolver.getTodo(id);

      assert.isArray(todo);
      assert.hasAllKeys(todo[0], ['id', 'content', 'done']);
    });

    it('throws if todo does not exist', async () => {
      const id = -1;
      let todo;
      try {
        todo = await resolver.getTodo(id);
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

    it('gets all todos if 3 todos', async () => {
      const todos = await resolver.listTodos();
      assert.isArray(todos);
      assert.lengthOf(todos, 3);
    });

    it('gets all todos if 8 todos', async () => {
      await Promise.all([
        resolver.createTodo({ content: 'todo 1' }),
        resolver.createTodo({ content: 'todo 2' }),
        resolver.createTodo({ content: 'todo 3' }),
        resolver.createTodo({ content: 'todo 4' }),
        resolver.createTodo({ content: 'todo 5' })
      ]);

      const todos = await resolver.listTodos();

      assert.isArray(todos);
      assert.lengthOf(todos, 8);
    });
  });

  describe('#createTodo', () => {
    it('creates a new todo', async () => {
      const todo = await resolver.createTodo('Hello world');
      assert.equal(todo[0].content, 'Hello world');
    });
  });

  describe('#completeTodo', () => {
    const id = 1;
    it('completes a todo', async () => {
      await resolver.completeTodo(id);
      const todo = await resolver.getTodo(id);
      assert.equal(todo[0].done, true);
    });

    it('throws if todo does not exist', async () => {
      let todo;
      try {
        await resolver.completeTodo(-1);
      } catch (err) {
        todo = err;
      }
      assert.instanceOf(todo, Error);
    });
  });

  describe('#deleteTodo', () => {
    const id = 1;
    it('deletes a todo', async () => {
      await resolver.deleteTodo(id);
      const todos = await resolver.listTodos();
      assert.notEqual(todos[0].id, 1);
    });
  });
});
