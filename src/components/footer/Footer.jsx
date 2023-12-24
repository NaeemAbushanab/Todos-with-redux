import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosMarkAllCompleted, todosClearCompleted } from "../../features/todos/todosSlice";
import { availableColors } from "../../consistent";
import { filtersByColors, filtersByStatus } from "../../features/filters/filtersSlice";
function Footer() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const handleOnClickCheckBoxColors = (e) => {
    if (e.target.checked) dispatch(filtersByColors(e.target.name, "add"));
    else dispatch(filtersByColors(e.target.name, "remove"));
  };
  return (
    <div className="mt-5 border-0 border-top position-relative text-white">
      <h2 className="position-absolute top-0 start-50 translate-middle px-2 text-white fw-bold">
        Filtering
      </h2>
      <div className="container pt-5 text-center">
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column">
            <h3 className="fs-4">Actions</h3>
            <button
              onClick={() => dispatch(todosMarkAllCompleted())}
              className="btn btn-primary mt-2"
            >
              Mark All Completed
            </button>
            <button
              onClick={() => dispatch(todosClearCompleted())}
              className="btn btn-primary mt-3"
            >
              Clear All Completed
            </button>
          </div>
          <div>
            <h3 className="fs-4">Remaining Todos</h3>
            <span>
              {todos.length} item{todos.length > 1 ? "s" : ""} left
            </span>
          </div>
          <div className="d-flex flex-column row-gap-3">
            <h3 className="fs-4">Filter by Status</h3>
            <button
              className={`btn ${filters.status == "all" ? "btn-secondary" : "btn-primary"}`}
              onClick={() => dispatch(filtersByStatus("all"))}
            >
              All
            </button>
            <button
              className={`btn ${filters.status == "active" ? "btn-secondary" : "btn-primary"}`}
              onClick={() => dispatch(filtersByStatus("active"))}
            >
              Active
            </button>
            <button
              className={`btn ${filters.status == "completed" ? "btn-secondary" : "btn-primary"}`}
              onClick={() => dispatch(filtersByStatus("completed"))}
            >
              Completed
            </button>
          </div>
          <div className="d-flex flex-column">
            <h3 className="fs-4">Filter by Color</h3>
            <div className="d-flex flex-column align-items-start row-gap-2">
              {availableColors.map((color, i) => {
                return (
                  <div key={i} className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      name={color}
                      id={color}
                      onClick={handleOnClickCheckBoxColors}
                    />
                    <i
                      style={{
                        width: "25px",
                        height: "15px",
                        display: "inline-block",
                        background: `${color}`,
                      }}
                      className="rounded-1 ms-3"
                    ></i>
                    <span className="ms-3">{color}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
