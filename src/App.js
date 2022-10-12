import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import List from "./pages/List";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <List />
    </div>
  );
}

export default App;
