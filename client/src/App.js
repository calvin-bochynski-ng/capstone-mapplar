import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <h1>This is the header</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        totam cumque consequuntur, repudiandae quaerat praesentium obcaecati eum
        sequi, est necessitatibus commodi non deleniti. Magni, ducimus impedit.
        At porro quo inventore.
      </p>
      <Routes></Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
