import { useEffect, useState } from "react";
import { getMovies } from "../api";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortByPopularity, setSortByPopularity] = useState("none");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavorites, setShowFavorites] = useState(false); // Estado para ver solo favoritos

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const filteredMovies = (showFavorites ? favorites : movies)
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((movie) => selectedGenre === "all" || movie.genre_ids.includes(Number(selectedGenre)))
    .sort((a, b) => {
      if (sortByPopularity === "asc") return a.popularity - b.popularity;
      if (sortByPopularity === "desc") return b.popularity - a.popularity;
      return 0;
    });

  return (
    <Container fluid className="p-5">
      <h1 className="text-center mb-4">T M D B 🎬</h1>

      {/* 🔎 Barra de búsqueda */}
      <Form.Control
        type="text"
        placeholder="Buscar película..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3 search-bar"
      />

      {/* 🎭 Filtros */}
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los Géneros</option>
            <option value="28">Acción</option>
            <option value="12">Aventura</option>
            <option value="16">Animación</option>
            <option value="35">Comedia</option>
            <option value="18">Drama</option>
            <option value="27">Terror</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
          <Form.Select
            value={sortByPopularity}
            onChange={(e) => setSortByPopularity(e.target.value)}
            className="filter-select"
          >
            <option value="none">Ordenar por</option>
            <option value="asc">Menos Popular</option>
            <option value="desc">Más Popular</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
          <Button
            variant={showFavorites ? "danger" : "primary"}
            onClick={() => setShowFavorites(!showFavorites)}
            className="w-100"
          >
            {showFavorites ? "Ver Todas 🎬" : "Ver Favoritos ⭐"}
          </Button>
        </Col>
      </Row>

      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="movie-card">
                <Link to={`/pelicula/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button
                    variant={favorites.some((fav) => fav.id === movie.id) ? "warning" : "outline-warning"}
                    onClick={() => toggleFavorite(movie)}
                  >
                    {favorites.some((fav) => fav.id === movie.id) ? "Quitar ⭐" : "Agregar ⭐"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No se encontraron películas.</p>
        )}
      </Row>
    </Container>
  );
}

export default Home;
