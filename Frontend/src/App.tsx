import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DetectDisease from "./pages/detect-disease";
import PlantDatabase from "./pages/plant-database";
import Analytics from "./pages/analytics";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<DetectDisease />} />
          <Route path="/database" element={<PlantDatabase />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
