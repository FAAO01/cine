const Footer = () => {
    return (
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} TMDB. Todos los derechos reservados.</p>
        <p>
          📧 Contacto: <a href="mailto:soporte@cineplus.com">fartola28@gmail.com</a>
        </p>
        <p>
          📍 Ubicación: Managua, Nicaragua
        </p>
      </footer>
    );
  };
  
  const styles = {
    footer: {
      textAlign: "center",
      padding: "20px",
      marginTop: "40px",
      backgroundColor: "#1a1a1a",
      color: "white",
      fontSize: "14px",
    },
  };
  
  export default Footer;
  