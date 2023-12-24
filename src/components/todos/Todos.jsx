import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoColor, todoCompleted, todoRemove } from "../../features/todos/todosSlice";
import { availableColors } from "../../consistent";
function Todos({ id }) {
  const dispatch = useDispatch();
  const { text, completed, color } = useSelector((state) =>
    state.todos.find((todoCurr) => id == todoCurr.id)
  );
  return (
    <div className="d-flex justify-content-between align-items-center border rounded-pill p-3 mb-3">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          name="isCom"
          id="isCom"
          className="me-3"
          checked={completed}
          onChange={() => dispatch(todoCompleted(id))}
        />
        <h2 className="p-0 m-0 d-inline text-white fs-4 ">{text}</h2>
      </div>
      <div className="d-flex align-items-center">
        <select
          name="color"
          id="color"
          defaultValue={color}
          onChange={(e) => dispatch(todoColor(id, e.target.value))}
          className="ps-2 fs-5 rounded-pill text-center"
          style={{ color: `${color == "" ? "white" : color}` }}
        >
          <option hidden>Select an Color</option>
          {availableColors.map((_color, i) => {
            return (
              <option
                name={_color}
                id={_color}
                key={i}
                value={_color}
                className="fs-5"
                style={{ color: `${_color} ` }}
              >
                {_color}
              </option>
            );
          })}
        </select>
        <span className="ms-3 pb-1" onClick={() => dispatch(todoRemove(id))}>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
            <path
              fill="#ffffff"
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default Todos;
