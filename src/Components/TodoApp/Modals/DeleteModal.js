import React from "react";
import ReactDOM from "react-dom";
import "./DeleteModal.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAsync,
  deleteCompletedAsync,
  todoActions,
} from "../../../Redux/todoSlice";

const DeleteModal = () => {
  const { deletedPortal, deletedItem, list } = useSelector(
    (state) => state.todos
  );
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(todoActions.cancel());
  };

  const confirmDeleteHandler = () => {
    if (Array.isArray(deletedItem)) {
      const completedList = list.filter((item) => item.isCompleted === true);
      dispatch(deleteCompletedAsync(completedList));
    } else {
      dispatch(deleteAsync(deletedItem));
    }
    dispatch(todoActions.cancel());
  };

  if (!deletedPortal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="bgContainer">
      <div className={`cardContainer ${isDark ? "dark" : null}`}>
        <h3>Delete Confirmation</h3>
        <p>
          Are you sure you want to delete{" "}
          <span>
            {Array.isArray(deletedItem)
              ? "all completed tasks?"
              : `"${deletedItem.content}" task?`}
          </span>
        </p>

        <div className="buttonDiv">
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={confirmDeleteHandler}>Yes</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;
