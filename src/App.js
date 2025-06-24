import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Services from "./pages/Services";
import SelfTest from "./pages/SelfTest";
import ResultPage from "./pages/ResultPage";
import ScoresPage from "./pages/ScoresPage";
import Toolkit from "./pages/Toolkit";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust path if needed


export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/test" element={<SelfTest />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/score-history" element={<ScoresPage />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage/>
              </ProtectedRoute>
            }
            />
        </Routes>
      </main>
    </div>
  );
}