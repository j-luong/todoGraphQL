import { assert } from 'chai';
import { resolver }  from '../../src/resolvers/resolver';

let db = {};

describe('Resolver', () => {
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
  });

  afterEach(() => {
    db = {};
  });

  describe('#getTodo', () => {
    it('gets a todo as an array', () =>{
      const id = 1
      const todo = resolver.getTodo({ id });

      assert.isArray(todo);
      assert.deepEqual(todo[0], db[id]);
    });

    it('throws if todo does not exist', () => {
      const id = -1;
      let todo;
      try {
        todo = resolver.getTodo({ id });
      } catch (err) {
        todo = err;
      }
      assert.instanceOf(todo, Error);
    });
  });
});
