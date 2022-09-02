import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import UserForm from "./Components/UserForm/UserForm";
import TodoApp from "./Components/TodoApp/TodoApp";
function App() {
  const isDark = useSelector((state) => state.theme.isDark);
  const username = useSelector((state) => state.todos.username);

  return (
    <div className={isDark ? "darkAppContainer" : "lightAppContainer"}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={username ? <TodoApp /> : <UserForm />} />
          <Route path="*" element={username ? <TodoApp /> : <UserForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
