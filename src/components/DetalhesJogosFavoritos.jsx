import "../styles/DetalhesJogosFavoritos.css";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt.js";
dayjs.extend(relativeTime);
dayjs.locale("pt");
import api from "../services/api";
function DetalhesJogosFavoritos({ jogo, estado, Id, Eu }) {
  const [JOGO, setJOGO] = useState();
  const textare = useRef();
  async function PegarProduto() {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        return;
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/produtos/especifico/${jogo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setJOGO(response.data.produto);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AdicionarEstrela(iid) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adiconar Estrela", {
          position: "top-center",
        });
        return;
      }
      const MeuDados = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const nome = MeuDados.data.perfil.nome;
      const id = MeuDados.data.perfil._id;
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/estrela/${iid}`,
        {
          nome,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function RemoverEstrela(identi) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adiconar Estrela");
        return;
      }
      const MeuDados = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const id = MeuDados.data.perfil._id;
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/remover/estrela/${identi}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AdicionarComentario(identificador) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adicionar aos comentario", {
          position: "top-center",
        });
        return;
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/comentario/${identificador}`,
        {
          foto: Eu.foto,
          nomeUsuario: Eu.nomeUsuario,
          id: Id,
          comentario: textare.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      PegarProduto();
      textare.current.value = "";
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function RemoverComenmtario(identificador, id, Idcom) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adicionar aos comentario", {
          position: "top-center",
        });
        return;
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/remover/comentario/${identificador}`,
        {
          MeuId: Id,
          Idcom,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  function PedirWthat(nome, preco) {
    const numero = "244937490810";
    let cumprimento = "";
    const hora = new Date().getHours();
    if (hora >= 12 && hora < 18) {
      cumprimento = "boa tarde";
    } else if (hora >= 18 && hora <= 23) {
      cumprimento = "boa noite";
    } else {
      cumprimento = "bom dia";
    }
    const Preco = preco.toLocaleString("pt-ao", {
      style: "currency",
      currency: "aoa",
    });
    const texto = `olá equipe da GameSnack! ${cumprimento},
    Gostaria de rezervar o seguinte jogo:
    ${nome} de: ${Preco}
    
    podem confirmar a disponiblidade do jogo? obrigado!`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blanck");
  }

  useEffect(() => {
    PegarProduto();
  }, []);

  return (
    <div
      className="DetalhesJogosFavoritos"
      onClick={(e) => {
        if (e.target.className === "DetalhesJogosFavoritos") {
          estado(false);
        }
      }}
    >
      <div className="ConT">
        <div className="IMg">
          <img src={JOGO?.foto} alt="" />
        </div>
        <div className="ddd">
          <h1>{JOGO?.nome}</h1>
          <h2>
            {JOGO?.preco.toLocaleString("pt-ao", {
              style: "currency",
              currency: "aoa",
            })}
          </h2>
          <div className="int">
            <div className="estr">
              {JOGO?.quemEstrelou?.some((user) => user.id === Id) ? (
                <>
                  <button onClick={() => RemoverEstrela(JOGO._id)}>
                    <i class="bi bi-star-fill"></i>
                  </button>
                  <p>{JOGO?.estrelas}</p>
                  <p>
                    <i class="bi bi-chat-square-fill"></i>{" "}
                    {JOGO?.comentarios?.length}
                  </p>
                </>
              ) : (
                <>
                  <button onClick={() => AdicionarEstrela(JOGO._id)}>
                    <i class="bi bi-star"></i>
                  </button>
                  <p>{JOGO?.estrelas}</p>
                  <p>
                    <i class="bi bi-chat-square-fill"></i>{" "}
                    {JOGO?.comentarios?.length}
                  </p>
                </>
              )}
            </div>
            <div className="fv">
              <button>
                <i class="bi bi-bookmark-star-fill"></i>
              </button>
            </div>
          </div>
          <p>{JOGO?.descricao}</p>

          <button
            id="reservarWhtas"
            onClick={() => PedirWthat(JOGO?.nome, JOGO?.preco)}
          >
            reservar jogo no whatsapp
          </button>
          <div id="ul">
            {JOGO?.comentarios?.length > 0 ? (
              JOGO?.comentarios
                ?.slice()
                .reverse()
                .map((comentario) => (
                  <div id="Ll" key={comentario.id}>
                    <img src={comentario.foto} alt="" />
                    <div>
                      <h5>{comentario.nomeUsuario}</h5>
                      <p>{comentario.comentario}</p>
                      <p>
                        <span>
                          {dayjs(comentario.quando).format("DD/MM/YYYY HH:mm")}
                        </span>
                        <span>{dayjs(comentario.quando).fromNow()}</span>
                      </p>
                    </div>
                    {comentario.id === Eu._id && (
                      <button
                        onClick={() =>
                          RemoverComenmtario(
                            JOGO._id,
                            comentario.id,
                            comentario._id,
                          )
                        }
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    )}
                  </div>
                ))
            ) : (
              <h3 className="sem">
                ainda não há comentarios
                <i class="bi bi-chat-square"></i>
              </h3>
            )}
            <div className="envio">
              <textarea
                ref={textare}
                placeholder="adionar feedback sobre o jogo"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    AdicionarComentario(JOGO._id);
                  }
                }}
              ></textarea>
              <button onClick={() => AdicionarComentario(JOGO._id)}>
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesJogosFavoritos;
