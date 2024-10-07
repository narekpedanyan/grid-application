import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ImageOverview from "./pages/ImageView/ImageOverview.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/images/:imageId" element={<ImageOverview />} />
            </Routes>
        </Router>
    </QueryClientProvider>
  )
}

export default App
