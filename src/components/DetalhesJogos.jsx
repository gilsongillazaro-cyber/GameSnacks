import "../styles/DetalhesJogos.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt.js";
dayjs.locale("pt");
dayjs.extend(relativeTime);
function DetalhesJogos({ algum, jogo, Id, Eu, funcao }) {
  const textare = useRef();
  const [Fav, setFav] = useState([]);
  function aumentar() {
    textare.current.style.height = "auto";
    textare.current.style.height = textare.current.scrollHeight + "px";
  }

  function fecho(e) {
    if (e.target.className === "DetalhesJogos") {
      algum(false);
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
      funcao();
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
      funcao();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AdicionarFavorito(IdD) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adiconar aos favoritos", {
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
      const id = MeuDados.data.perfil._id;
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/favorito/${IdD}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      funcao();
      PegarFavoritos();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function removerFav(id) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adiconar aos favoritos", {
          position: "top-center",
        });
        return;
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/remover/favorito/${id}`,
        {
          id: Id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      PegarFavoritos();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function PegarFavoritos() {
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
      setFav(response.data.perfil.favoritos);
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

      funcao();
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

      funcao();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    PegarFavoritos();
  });
  return (
    <div className="DetalhesJogos" onClick={fecho}>
      <button
        id="fechar6"
        onClick={() => {
          algum(false);
        }}
      >
        <i className="bi bi-x"></i>
      </button>
      <div className="ConT">
        <div className="IMg">
          <img src={jogo.foto} alt="" />
        </div>
        <div className="ddd">
          <h1>{jogo.nome}</h1>
          <h2>
            {jogo?.preco?.toLocaleString("pt-ao", {
              style: "currency",
              currency: "aoa",
            })}
          </h2>
          <div className="int">
            <div className="estr">
              {jogo.quemEstrelou.some((user) => user.id === Id) ? (
                <>
                  <button onClick={() => RemoverEstrela(jogo._id)}>
                    <i className="bi bi-star-fill"></i>
                  </button>
                  <p>{jogo.estrelas}</p>
                  <p>
                    <i className="bi bi-chat-square-fill"></i>{" "}
                    {jogo.comentarios.length}
                  </p>
                </>
              ) : (
                <>
                  <button onClick={() => AdicionarEstrela(jogo._id)}>
                    <i className="bi bi-star"></i>
                  </button>
                  <p>{jogo.estrelas}</p>
                  <p>
                    <i className="bi bi-chat-square"></i>
                    {jogo.comentarios.length}
                  </p>
                </>
              )}
            </div>
            <div className="fv">
              {Fav.some((user) => user.id === jogo._id) ? (
                <button onClick={() => removerFav(jogo._id)}>
                  <i className="bi bi-bookmark-fill"></i>
                </button>
              ) : (
                <button onClick={() => AdicionarFavorito(jogo._id)}>
                  <i className="bi bi-bookmark"></i>
                </button>
              )}
            </div>
          </div>
          <p className="descri">{jogo.descricao}</p>

          <button
            id="reservarWhtas"
            onClick={() => PedirWthat(jogo.nome, jogo.preco)}
          >
            reservar lugar no whatsapp
          </button>
          <div id="ul">
            {jogo.comentarios.length > 0 ? (
              jogo.comentarios
                .slice()
                .reverse()
                .map((comentario) => (
                  <div id="Ll" key={comentario._id}>
                    <img src={comentario.foto} alt="" />
                    <div>
                      <h5>{comentario.nomeUsuario}</h5>
                      <p>{comentario.comentario}</p>
                      <p>
                        <span>
                          {dayjs(comentario.quando).format("DD/MM/YYYY HH:mm")}
                        </span>{" "}
                        <span>{dayjs(comentario.quando).fromNow()}</span>
                      </p>
                    </div>
                    {comentario.id === Eu?._id && (
                      <button
                        onClick={() =>
                          RemoverComenmtario(
                            jogo._id,
                            comentario.id,
                            comentario._id,
                          )
                        }
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    )}
                  </div>
                ))
            ) : (
              <h3 className="sem">
                ainda não há comentarios
                <i className="bi bi-chat-square"></i>
              </h3>
            )}
            <div className="envio">
              <textarea
                placeholder="adionar feedback sobre o jogo"
                ref={textare}
                onInput={aumentar}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    AdicionarComentario(jogo._id);
                  }
                }}
              ></textarea>
              <button onClick={() => AdicionarComentario(jogo._id)}>
                {" "}
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesJogos;
