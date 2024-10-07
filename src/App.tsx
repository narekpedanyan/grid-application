import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ImageView from "./pages/ImageView/ImageView.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/view/:id" element={<ImageView />} />
            </Routes>
        </Router>
    </QueryClientProvider>
  )
}

export default App
