import Foto from "../assets/GameSnack imagens/logoGameSnack.png";
import "../styles/Cima.css";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
function Cima() {
  useEffect(() => {
    ScrollReveal().reveal(".cimE", {
      distance: "90px",
      duration: 2000,
      origin: "left",
    });
    ScrollReveal().reveal(".cimD", {
      distance: "100px",
      duration: 2000,
      origin: "rigth",
      delay: 500,
    });
  }, []);
  return (
    <div className="cim">
      <div className="cimE">
        <h1>
          Game<span>Snack</span>
        </h1>
        <p>Diversão e sabor em um só lugar.</p>
        <p>
          descubra os seus snacks e jogos favoritos que temos disponiveis pra si{" "}
          <span>hoje e agora</span>
        </p>
      </div>
      <div className="cimD">
        <img src={Foto} alt="" />
      </div>
    </div>
  );
}
export default Cima;
