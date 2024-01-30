import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SocialPage from "./pages/SocialPage/SocialPage";
import PlanningPage from "./pages/PlanningPage/PlanningPage";
import ItineraryPage from "./pages/ItineraryPage/ItineraryPage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const token = sessionStorage.getItem("token");

  const [isToken, setIsToken] = useState(false);

  if (!isToken) {
    return (
      <div className="app">
        <BrowserRouter>
          <Header isToken={isToken} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/login"
              element={<LoginPage setIsToken={setIsToken} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header isToken={isToken} setIsToken={setIsToken} />
        <Routes>
          <Route path="/" element={<SocialPage setIsToken={setIsToken} />} />
          <Route
            path="/social"
            element={<SocialPage setIsToken={setIsToken} />}
          />
          <Route
            path="/planning"
            element={<PlanningPage setIsToken={setIsToken} />}
          />
          <Route
            path="/itinerary"
            element={<ItineraryPage setIsToken={setIsToken} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
