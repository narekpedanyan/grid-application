import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ImageView from "./pages/ImageView/ImageView.tsx";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/view/:id" element={<ImageView />} />
      </Routes>
    </Router>
  )
}

export default App
