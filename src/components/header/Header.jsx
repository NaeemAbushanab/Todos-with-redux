import React, { useState } from "react";
import "./Header.css";
import Todos from "../todos/Todos";
import { useDispatch, useSelector } from "react-redux";
import { selectTodosIdWithFiltering, todoAdded } from "../../features/todos/todosSlice";
import Loading from "react-loading";
function Header() {
  const [todoInput, setTodoInput] = useState("");
  const { entities, status } = useSelector(selectTodosIdWithFiltering);
  console.log(status);
  const dispatch = useDispatch();
  const handleOnChnageTodoInput = (e) => {
    setTodoInput(e.target.value);
  };
  const handleOnSubmitTodoInput = (e) => {
    e.preventDefault();
    dispatch(todoAdded(todoInput));
    setTodoInput("");
  };
  return (
    <>
      <div className="container mt-5">
        <form className="" onSubmit={handleOnSubmitTodoInput}>
          <div className="d-flex align-items-center border rounded-pill py-2 px-4">
            <input
              type="text"
              name="text"
              id="todoInput"
              placeholder="type anything"
              className="form-control bg-dark text-white border-0"
              value={todoInput}
              onChange={handleOnChnageTodoInput}
            />
            {status == "loading" && <Loading type="spin" height={30} width={30} color="#ffa3ff" />}
          </div>
        </form>
      </div>
      <div className="Todos">
        <div className="mt-5 pb-5 container">
          {entities.map((todoId, i) => (
            <Todos id={todoId} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
