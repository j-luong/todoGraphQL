export const db = ((): void => {
  const todos = ['Finish todoGQL', 'Complete OKRs', 'Learn l programming'];

  todos.forEach((content, index) => {
    const id = index + 1;
    const newTodo = {
      id,
      content,
      done: false
    };
    db[id] = newTodo;
  });
})();
