import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer"; // Importamos el Footer

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Botón para cambiar de modo */}
        <button onClick={() => setDarkMode(!darkMode)} style={styles.button}>
          {darkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>

        {/* Contenedor de rutas */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pelicula/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

const styles = {
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1a1a1a",
    color: "white",
    fontSize: "14px",
    margin: "10px",
  },
};

export default App;
