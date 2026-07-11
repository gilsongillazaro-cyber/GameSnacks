import "../styles/Contactos.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import ConteinerC from "../components/ConteinerC";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";
function Contactos() {
  useEffect(() => {
    ScrollReveal().reveal(".h1C", {
      duration: 2000,
      origin: "left",
      distance: "90px",
      reset: true,
    });
  }, []);
  return (
    <div className="contactos">
      <Header />
      <h1 className="h1C">
        quer <span>entrar em contacto ?</span>
      </h1>
      <ConteinerC />
      <Footer />
    </div>
  );
}

export default Contactos;
