import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LogInPage from "./pages/LogInPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <SideBar />
      <Footer />
    </div>
  );
}
export default App;
