import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import todoReducer, { TodoAction, TodoState } from "./TodoReducer"; // Add TodoAction and TodoState types from TodoReducer

interface TodoContextType {
  todos: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType); // Provide the TodoContextType as a generic argument

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // Add React.FC type to indicate the component function
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const storedTodos = JSON.parse(localStorage.getItem("todos")!) || [];
  const [todos, dispatch] = useReducer(todoReducer, storedTodos);

  useEffect(() => {
    // Update localStorage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log({ todos });
  }, [todos]);

  // Add other necessary functions here...

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook
const useTodoContext = (): TodoContextType => { // Specify the return type for the custom hook
  return useContext(TodoContext);
};


// eslint-disable-next-line react-refresh/only-export-components
export { TodoProvider, useTodoContext };
