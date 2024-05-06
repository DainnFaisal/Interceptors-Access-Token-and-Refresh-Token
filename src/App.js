import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from "./Components/Headers";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Headers />
          <Routes>
            <Route path="/Register" exact Component={Register} />
            <Route path="/Login" exact Component={Login} /> 
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
