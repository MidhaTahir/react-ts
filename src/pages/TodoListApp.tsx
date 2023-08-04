import { useState, useRef } from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "../components/TodoItem";

const TodoListApp = () => {
  const { todos, dispatch } = useTodoContext();
  const [inputText, setInputText] = useState<string>(""); // Add type annotation for inputText
  const inputRef = useRef<HTMLInputElement>(null); // Add type annotation for inputRef

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: inputText });
      setInputText("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos && todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoListApp;
