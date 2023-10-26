import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TilePage from "./pages/TilePage";
import TaskPage from "./pages/TaskPage";
import TileForm from "./components/TileForm";

export const API_URL = "http://127.0.0.1:8000";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TilePage />} />
          <Route path="/addTile/" element={<TileForm />} />
          {/* <Route path="/editTile/:id" element={<TileForm />} /> */}
          <Route path="/tile/:id" element={<TaskPage />} />
          {/* <Route path="/editTask/:id" element={< />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
