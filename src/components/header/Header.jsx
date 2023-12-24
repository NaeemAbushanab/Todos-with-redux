import React, { useState } from "react";
import "./Header.css";
import Todos from "../todos/Todos";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { todoAdded } from "../../features/todos/todosSlice";
function Header() {
  const [todoInput, setTodoInput] = useState("");
  const todosId = useSelector((state) => state.todos.map((todo) => todo.id), shallowEqual);
  const dispatch = useDispatch();
  const handleOnChnageTodoInput = (e) => {
    setTodoInput(e.target.value);
  };
  const handleOnSubmitTodoInput = (e) => {
    e.preventDefault();
    dispatch(todoAdded(todoInput));
  };
  return (
    <div className="container mt-5">
      <form className="px-5" onSubmit={handleOnSubmitTodoInput}>
        <input
          type="text"
          name="text"
          id="todoInput"
          placeholder="type anything"
          className="form-control rounded-pill bg-dark text-white p-3"
          value={todoInput}
          onChange={handleOnChnageTodoInput}
        />
      </form>
      <div className="mt-5 pb-5">
        {todosId.map((todoId, i) => (
          <Todos id={todoId} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Header;
