import "./TodoList.scss";
import { getAsync, filterHandler } from "../../../Redux/todoSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import Todo from "./Todo.js";
import Loading from "./Loading";
import Error from "./Error";
const TodoList = () => {
  const { isLoading, error, filtered } = useSelector((state) => state.todos);
  const list = useSelector(filterHandler);
  const dispatch = useDispatch();
  const noTaskErr = filtered.active ? "active" : "completed";
  useEffect(() => {
    dispatch(getAsync("https://630d0fa8b37c364eb7ff8583.mockapi.io/todos"));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="todoContainer">
        <Loading />;
      </div>
    );
  }
  if (error) {
    return (
      <div className="todoContainer">
        <Error errorMessage={error} />
      </div>
    );
  }
  return (
    <div className="todoContainer">
      {list.length === 0 && filtered.all && <p>There is no task!</p>}
      {list.length === 0 && !filtered.all && (
        <p>There is no {noTaskErr} task!</p>
      )}

      {list.map((item) => {
        return <Todo item={item} key={item.id} />;
      })}
    </div>
  );
};

export default TodoList;
