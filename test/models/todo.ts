import { assert } from 'chai';
import { createTodo } from '../../src/models/todo';

describe('Todo', () => {
  it('creates a todo', () =>{
    const mockTodo = {
      id: 1,
      content: 'Hello world',
      done: false
    }

    const todo = createTodo(1, 'Hello world');
    assert.deepEqual(todo, mockTodo);
  })
});
