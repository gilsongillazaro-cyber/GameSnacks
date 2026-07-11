import "../styles/Jogos.css";
import DetalhesJogos from "./DetalhesJogos";
import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { toast } from "react-toastify";
import api from "../services/api";
function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [jogo, setJogo] = useState();
  const [Id, setId] = useState();
  const [Eu, setEu] = useState();
  async function meusDados() {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        return;
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setId(response.data.perfil._id);
      setEu(response.data.perfil);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  async function PegarJogos() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/produtos`,
      );

      setJogos(response.data.produtos);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    if (jogo) {
      const novo = jogos.find((joo) => joo._id === jogo._id);
      if (novo) {
        setJogo(novo);
      }
    }
  }, [jogos]);
  useEffect(() => {
    ScrollReveal().reveal(".t", {
      distance: "60px",
      duration: 2000,
      origin: "left",
      reset: true,
    });
    ScrollReveal().reveal(".LII", {
      distance: "60px",
      origin: "bottom",
      reset: true,
      duration: 2000,
    });
    PegarJogos();
    meusDados();
  }, []);
  const [MonstrarJogo, setMonstrarJogo] = useState(false);
  return (
    <div className="jogos">
      {MonstrarJogo && (
        <DetalhesJogos
          jogo={jogo}
          Eu={Eu}
          Id={Id}
          funcao={PegarJogos}
          algum={setMonstrarJogo}
        />
      )}
      <h1 className="t">todos os jogos</h1>
      <ul className="LII">
        {jogos.length > 0 ? (
          jogos
            .filter((jogos) => jogos.categoriaGeral === "jogos")
            .sort((a, b) => a?.preco - b?.preco)
            .map((jogo) => (
              <li
                key={jogo._id}
                onClick={() => {
                  setMonstrarJogo(true);
                  setJogo(jogo);
                }}
              >
                <div className="fo">
                  <img src={jogo?.foto} alt="" />
                </div>
                <div className="inf">
                  <h2>{jogo?.nome}</h2>
                  <h2 id="h2">
                    <span>
                      {jogo?.preco.toLocaleString("pt", {
                        style: "currency",
                        currency: "aoa",
                      })}
                    </span>
                    preco por 15min
                  </h2>
                </div>
              </li>
            ))
        ) : (
          <h3 className="sem">sem jogos disponiveis</h3>
        )}
      </ul>
    </div>
  );
}
export default Jogos;
