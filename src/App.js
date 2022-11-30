import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={[<Header key="header" />, <Home key="home"/>]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
