/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/main.css";
import { ThemeContextProvider } from "./context/ThemeContext";

import Landing from "./views/Landing";
import Trip from "./views/Trip";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/trip:tripID" element={<Trip />} />
          </Routes>
        </Router>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
