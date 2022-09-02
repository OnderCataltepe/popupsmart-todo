import ReactDOM from "react-dom";
import "./UpdateModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { putContentAsync, todoActions } from "../../../Redux/todoSlice";
import { useEffect, useState, useRef } from "react";
const UpdateModal = () => {
  const inputRef = useRef();
  const [lenErr, setLenErr] = useState(false);
  const { updatePortal, updateItem } = useSelector((state) => state.todos);
  const isDark = useSelector((state) => state.theme.isDark);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(todoActions.cancel());
    setLenErr(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim().length >= 3) {
      const newItem = {
        id: updateItem.id,
        content: inputValue,
        isCompleted: updateItem.isCompleted,
      };
      dispatch(putContentAsync(newItem));
      setLenErr(false);
      dispatch(todoActions.cancel());
    } else {
      setLenErr(true);
    }
  };
  useEffect(() => {
    if (updatePortal) {
      setInputValue(updateItem.content);
      inputRef.current.focus();
    }
  }, [updatePortal]);

  if (!updatePortal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="upBgContainer">
      <div className={`upCardContainer ${isDark ? "dark" : null}`}>
        <form onSubmit={submitHandler}>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="upButtonDiv">
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
        {lenErr && <p>Todo name should contain at least 3 characters.</p>}
      </div>
    </div>,
    document.body
  );
};

export default UpdateModal;
