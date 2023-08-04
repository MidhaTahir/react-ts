export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoAction =
    | { type: "ADD_TODO"; payload: string }
    | { type: "TOGGLE_TODO"; payload: number }
    | { type: "REMOVE_TODO"; payload: number }
    | { type: "INITIALIZE_TODOS"; payload: Todo[] };
  
export type TodoState = Todo[];
  
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
      case "ADD_TODO":
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false },
        ];
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
      case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.payload);
      case "INITIALIZE_TODOS":
        return action.payload;
      default:
        return state;
    }
  };

export default todoReducer;
