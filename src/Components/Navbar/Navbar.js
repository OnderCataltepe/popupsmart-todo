import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux/";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { todoActions } from "../../Redux/todoSlice";
import { themeToggle } from "../../Redux/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const username = useSelector((state) => state.todos.username);

  const themeChange = (e) => {
    dispatch(themeToggle(e.target.checked));
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const logoutHandle = () => {
    localStorage.removeItem("username");
    setTimeout(() => {
      dispatch(todoActions.userLog(null));
    }, 500);
  };

  return (
    <>
      <nav id="nav-kl43j4983">
        <div className="toggleWrapper">
          {!isDark && <p>Light Mode</p>}
          {isDark && <p className="darkParagraph">Dark Mode</p>}
          <input
            onChange={themeChange}
            type="checkbox"
            className="dn"
            id="dn"
            checked={isDark}
          />
          <label htmlFor="dn" className="toggle">
            <span className="toggle__handler">
              <span className="crater crater--1"></span>
              <span className="crater crater--2"></span>
              <span className="crater crater--3"></span>
            </span>
            <span className="star star--1"></span>
            <span className="star star--2"></span>
            <span className="star star--3"></span>
            <span className="star star--4"></span>
            <span className="star star--5"></span>
            <span className="star star--6"></span>
          </label>
        </div>
        {username && (
          <div className="userDiv">
            <p>{username}</p>
            <button onClick={logoutHandle}>Logout</button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
