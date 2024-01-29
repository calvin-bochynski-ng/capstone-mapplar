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

  if (token) {
    setIsToken(true);
  }

  return (
    <BrowserRouter>
      <Header isToken={isToken} />
      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        ) : (
          <>
            <Route path="/social" element={<SocialPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
          </>
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
