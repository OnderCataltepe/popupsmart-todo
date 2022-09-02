import "./Header.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { postAsync } from "../../../Redux/todoSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const [inputValue, setInputValue] = useState("");
  const [lenErr, setLenErr] = useState(false);
  const dispatch = useDispatch();

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim().length >= 3) {
      const newTodo = {
        content: inputValue.trim(),
        isCompleted: false,
      };
      dispatch(postAsync(newTodo));
      setLenErr(false);
      setInputValue("");
    } else {
      setLenErr(true);
    }
  };
  return (
    <div className={isDark ? "darkHeaderContainer" : "lightHeaderContainer"}>
      <h1>ToDo List</h1>
      <form onSubmit={addTodo}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {lenErr && <p>Todo name should contain at least 3 characters.</p>}
    </div>
  );
};

export default Header;
