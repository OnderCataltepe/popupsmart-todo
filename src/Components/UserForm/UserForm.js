import { useEffect, useState } from "react";
import "./UserForm.scss";
import { todoActions } from "../../Redux/todoSlice";
import { useDispatch } from "react-redux";
import Loading from "../TodoApp/Body/Loading";
const UserForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [userError, setUserError] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const submitUser = (e) => {
    e.preventDefault();
    if (nameValue.trim().length > 0) {
      localStorage.setItem("username", JSON.stringify(nameValue));
      setNameValue("");
      setUserError(false);
      dispatch(
        todoActions.userLog(JSON.parse(localStorage.getItem("username")))
      );
    } else {
      setUserError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <div id="userform827x">
        <form onSubmit={submitUser}>
          <div>
            <label>Enter Username:</label>
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              maxLength={15}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {userError && <p>Please enter a username.</p>}
      </div>
    </div>
  );
};

export default UserForm;
