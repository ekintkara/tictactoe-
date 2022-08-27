import "./App.css";
import { Route, Routes } from "react-router-dom";
import Tutorial from "./pages/Tutorial";
import Notfound from "./pages/Notfound";
import Game from "./pages/Game";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Tutorial />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/Game" element={<Game/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
