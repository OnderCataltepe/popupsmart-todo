
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { todoActions, putAsync } from "../../../Redux/todoSlice";
import { useSelector, useDispatch } from "react-redux";
const Todo = ({ item }) => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const deleteTask = () => {
    dispatch(todoActions.deleteOpen(item));
  };

  const updateTask = () => {
    dispatch(todoActions.updateOpen(item));
  };
  const completedToggle = () => {
    dispatch(putAsync(item));
  };
  return (
    <li className={isDark ? "darkElement" : "lightElement"}>
      <div className="checkDiv" onClick={completedToggle}>
        {item.isCompleted && (
          <FontAwesomeIcon className="checkIcon" icon={faCheck} />
        )}
      </div>
      <p className={item.isCompleted ? "completedParag" : null}>
        {item.content}
      </p>
      <div className="iconDiv">
        <FontAwesomeIcon
          onClick={updateTask}
          className="editIcon"
          icon={faPenToSquare}
        />
        <FontAwesomeIcon
          onClick={deleteTask}
          className="closeIcon"
          icon={faTrashCan}
        />
      </div>
    </li>
  );
};
export default Todo;
