import { useDispatch, useSelector } from "react-redux";
import { todoActions, filterHandler } from "../../../Redux/todoSlice";
import "./Footer.scss";
const Footer = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const allList = useSelector((state) => state.todos.list);
  const list = useSelector(filterHandler);

  const radioFilter = (e) => {
    switch (e.target.value) {
      case "All":
        dispatch(todoActions.showAll());
        break;
      case "Active":
        dispatch(todoActions.showActive());
        break;
      case "Completed":
        dispatch(todoActions.showCompleted());
        break;
      default:
        return null;
    }
  };
  return (
    <div className={`footerContainer ${isDark ? "dark" : null}`}>
      <div className="radioDiv" onChange={radioFilter}>
        <div>
          <input type="radio" name="todo_radio" value="All" defaultChecked />
          <label htmlFor="html">All</label>
        </div>
        <div>
          <input type="radio" name="todo_radio" value="Active" />
          <label htmlFor="html">Active</label>
        </div>
        <div>
          <input type="radio" name="todo_radio" value="Completed" />
          <label htmlFor="html">Completed</label>
        </div>
      </div>
      <p>{list.length} items left</p>
      <button onClick={() => dispatch(todoActions.deleteOpen(allList))}>
        Clear Completed
      </button>
    </div>
  );
};

export default Footer;
