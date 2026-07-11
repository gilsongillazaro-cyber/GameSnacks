import fotoPlay from "../assets/GameSnack imagens/PlayStation.png";
import fotoPlayLateral from "../assets/GameSnack imagens/jogosLateral.png";
import fotoGelado from "../assets/GameSnack imagens/geldosgourmet.png";
import fotoGeladoLateral from "../assets/GameSnack imagens/geladosGorumetLateraral.png";
import fotoBolo from "../assets/GameSnack imagens/bolocentral.png";
import fotoBoloLateral from "../assets/GameSnack imagens/boloLateral.png";
import fotoPipoca from "../assets/GameSnack imagens/pipoca.png";
import fotoPipocaLateral from "../assets/GameSnack imagens/pipocasLateral.png";
import "../styles/Topo.css";
import { useState, useEffect } from "react";

function Topo() {
  const [Contador, setContador] = useState(0);
  function avancar() {
    setContador((prev) => (prev + 1) % 4);
  }

  function recuar() {
    setContador((prev) => prev - 1);
    if (Contador <= 0) {
      setContador(3);
    }
  }

  useEffect(() => {
    const tempo = setInterval(avancar, 3000);
    return () => clearInterval(tempo);
  }, []);
  return (
    <div className="Topo">
      <main>
        <div
          className={`item ${Contador === 0 ? "ativo" : ""}`}
          style={{ "--fundo": "radial-gradient(pink,plum)" }}
        >
          <div className="texto">
            <h1>gelados gourmet</h1>
          </div>
          <div className="imgLateral">
            <img src={fotoGeladoLateral} alt="" />
          </div>
          <div className="imgCentral">
            <img src={fotoGelado} alt="" />
          </div>
        </div>

        <div
          className={`item ${Contador === 1 ? "ativo" : ""}`}
          style={{ "--fundo": "radial-gradient(dodgerblue,blue)" }}
        >
          <div className="texto">
            <h1>bolos no pote</h1>
          </div>
          <div className="imgLateral">
            <img src={fotoBoloLateral} alt="" />
          </div>
          <div className="imgCentral">
            <img src={fotoBolo} alt="" />
          </div>
        </div>
        <div
          className={`item ${Contador === 2 ? "ativo" : ""}`}
          style={{ "--fundo": "radial-gradient(#f0f0f0,#000)" }}
        >
          <div className="texto">
            <h1>jogos da play</h1>
          </div>
          <div className="imgLateral">
            <img src={fotoPlayLateral} alt="" />
          </div>
          <div className="imgCentral">
            <img src={fotoPlay} id="pl" alt="" />
          </div>
        </div>

        <div
          className={`item ${Contador === 3 ? "ativo" : ""}`}
          style={{ "--fundo": "radial-gradient(red,orange)" }}
        >
          <div className="texto">
            <h1>pipocas Gourmet</h1>
          </div>
          <div className="imgLateral">
            <img src={fotoPipocaLateral} alt="" />
          </div>
          <div className="imgCentral">
            <img src={fotoPipoca} alt="" />
          </div>
        </div>
        <div className="botoes">
          <button id="recuar" onClick={recuar}>
            <i class="bi bi-arrow-left-circle-fill"></i>
          </button>
          <button id="avancar" onClick={avancar}>
            <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Topo;
