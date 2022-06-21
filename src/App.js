import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
