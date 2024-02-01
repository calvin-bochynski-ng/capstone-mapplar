import "./App.scss";
import { ThemeProvider } from "@mui/material/styles";
import themeOptions from "./styles/theme";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SocialPage from "./pages/SocialPage/SocialPage";
import PlanningPage from "./pages/PlanningPage/PlanningPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const token = sessionStorage.getItem("token");
  // const navigate = useNavigate();

  const [isToken, setIsToken] = useState(false);

  return (
    <ThemeProvider theme={themeOptions}>
      <div className="app">
        <BrowserRouter>
          <Header isToken={token} setIsToken={setIsToken} />
          <Routes>
            {/* Non-User */}
            {!token ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="/login"
                  element={<LoginPage setIsToken={setIsToken} />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={<SocialPage setIsToken={setIsToken} />}
                />
                <Route
                  path="/social"
                  element={<SocialPage setIsToken={setIsToken} />}
                />
                <Route
                  path="/planning"
                  element={<PlanningPage setIsToken={setIsToken} />}
                />
                <Route
                  path="/profile"
                  element={<ProfilePage setIsToken={setIsToken} />}
                />
              </>
            )}
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
