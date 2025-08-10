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
import RegisterMentor from "./pages/RegisterMentot";
import InfoDesk from "./pages/InfoDesk";
// import OurTeam from "./pages/OurTeam";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./components/blogDetail";
import MentorDashboard from "./pages/MentorDashboard";


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
          {/* <Route path="/test" element={<SelfTest />} /> */}
          <Route path="/result" element={<ResultPage />} />
          
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="register-mentor" element={<RegisterMentor />} />
          <Route path="infodesk" element={<InfoDesk />} />
          {/* <Route path="team" element={<OurTeam />} /> */}
          <Route path="/faqs" element={<FAQPage/>} />
          <Route path="/blogs" element={<BlogPage/>}/>
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route
            path="/dashboard"
            element={
              <MentorDashboard/>
            }
            />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage/>
              </ProtectedRoute>
            }
            />
            <Route path="/score-history" element={
              <ProtectedRoute>
                <ScoresPage />
              </ProtectedRoute>
            } />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <SelfTest/>
              </ProtectedRoute>
            }
            />
        </Routes>
      </main>
    </div>
  );
}