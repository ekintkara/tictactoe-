import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Tutorial />} />
      </Routes>
    </div>
  );
}

export default App;
