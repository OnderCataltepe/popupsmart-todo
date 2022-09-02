import Header from "./Header/Header";
import TodoList from "./Body/TodoList";
import Footer from "./Footer/Footer";
import UpdateModal from "./Modals/UpdateModal";
import DeleteModal from "./Modals/DeleteModal";
const TodoApp = () => {
  return (
    <div className="App">
      <Header />
      <TodoList />
      <Footer />
      <UpdateModal />
      <DeleteModal />
    </div>
  );
};

export default TodoApp;
