import { assert } from 'chai';
import { ResolverTodo }  from '../../src/resolvers/todoresolver';

let db = {};
let resolver;

describe('Resolvers', () => {
  beforeEach(() => {
    ((): void => {
      const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn functional programming'];
    
      todos.forEach((todo, index) => {
        const count = index + 1;
        db[count] = {
          id: count,
          content: todo,
          done: false
        };
      });
    })();
    resolver = new ResolverTodo(db);
  });

  afterEach(() => {
    db = {};
  });

  describe('#getTodo', () => {
    it('gets a todo as an array', () => {
      const id = 1
      const todo = resolver.getTodo(id);

      assert.isArray(todo);
      assert.deepEqual(todo[0], db[id]);
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
    it('gets all todos', () =>{
      const todos = resolver.listTodos();
      const dbTodos = Object.keys(db);

      assert.isArray(todos);
      assert.equal(todos.length, dbTodos.length);
    });
  });

  describe('#createTodo', () => {
    it('creates a new todo', () => {
      const todo = resolver.createTodo("Hello world");
      assert.equal(todo[0].content, "Hello world");
    });
  });

  describe('#completeTodo', () => {
    it('completes a todo', () => {
      resolver.completeTodo(1);
      const todo = resolver.getTodo(1);
      assert.equal(todo[0].done, true);
    });

    it('throws if todo does not exist', () => {
      let todo;
      try {
        resolver.completeTodo(919420148);
      } catch (err) {
        todo = err;
      }
      assert.instanceOf(todo, Error);
    })
  });

  xdescribe('#deleteTodo', () => {
    it('deletes a todo', () => {
      resolver.deleteTodo(1);
      // assert.notExists(db[0]);
    });
  });
});
