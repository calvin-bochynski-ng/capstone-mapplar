import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes></Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
