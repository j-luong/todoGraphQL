export interface Todo {
  id: number;
  content: string;
  done: boolean;
}

export function createTodo(id: number, content: string, done: boolean = false): Todo {
  return {
    id,
    content,
    done
  };
}
