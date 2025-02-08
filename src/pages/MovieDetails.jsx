import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";



const API_KEY = "6dfb92a459e486e939df92f9e545e65f";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, language: "es-ES" },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error cargando los detalles de la película:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <h1 className="text-center mt-4">Cargando...</h1>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
          <p><strong>Descripción:</strong> {movie.overview}</p>
          <p><strong>Puntuación:</strong> ⭐ {movie.vote_average}/10</p>
          <Button variant="primary" href="/">⬅ Volver a la Lista</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
