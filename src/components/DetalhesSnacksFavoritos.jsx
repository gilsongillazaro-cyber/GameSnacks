import "../styles/DetalhesSnacksFavoritos.css";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
function DetalhesSnacksFavoritos({ estado, snack, atualizar, Id }) {
  const [fotoU, setFotoU] = useState();
  const [nomeU, setNomeU] = useState();

  const [favoritos, setFavoritos] = useState([]);
  const [item, setItem] = useState();
  const AreaDeEnvio = useRef();
  function aumentar() {
    AreaDeEnvio.current.style.height = "auto";
    AreaDeEnvio.current.style.height = AreaDeEnvio.current.scrollHeight + "px";
  }
  function fecharD() {
    estado(false);
    atualizar();
  }
  function del(e) {
    if (e.target.className === "DetalhesSnacksFavoritos") {
      estado(false);
      atualizar();
    }
  }
  async function PegarProduto() {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        return;
      }
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/produtos/especifico/${snack.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setItem(response.data.produto);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }

  async function AdicionarEstrela(e, Id) {
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
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/estrela/${Id}`,
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
      atualizar();
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function RemoverEstrela(e, identi) {
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
      atualizar();
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AdicionarFavorito(Id) {
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
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/favorito/${Id}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      yh();
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function yh() {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
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
      setFavoritos(MeuDados.data.perfil.favoritos);
      setFotoU(MeuDados.data.perfil.foto);
      setNomeU(MeuDados.data.perfil.nomeUsuario);
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
        toast.warning("Faça login pra remover aos favoritos", {
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

      yh();
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
          foto: fotoU,
          nomeUsuario: nomeU,
          id: Id,
          comentario: AreaDeEnvio.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      atualizar();
      PegarProduto();
      AreaDeEnvio.current.value = "";
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

      atualizar();
      PegarProduto();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  function PedirWht(nome, preco) {
    const token = localStorage.getItem("TokenGameSnack");
    if (!token) {
      toast.warning("faça login pra fazer encomenda", {
        position: "top-center",
      });
      return;
    }
    const hora = new Date().getHours();
    let cumprimento = "";

    if (hora >= 12 && hora < 18) {
      cumprimento = "boa tarde";
    } else if (hora >= 18 && hora <= 23) {
      cumprimento = "boa noite";
    } else {
      cumprimento = "bom dia";
    }
    const numero = "244937490810";
    const Preco = preco.toLocaleString("pt-ao", {
      style: "currency",
      currency: "aoa",
    });
    const texto = `Olá, equipa da GameSnack!
${cumprimento}! Espero que estejam bem.
Gostaria de encomendar este produto:
----------------
 Produto: ${nome}
 Preço: ${Preco}kz
 Cliente: ${nomeU}
----------------
Localização de entrega: 
 `;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blanck");
  }

  useEffect(() => {
    yh();
    PegarProduto();
  }, []);
  return (
    <div className="DetalhesSnacksFavoritos" onClick={del}>
      <button id="fechar5" onClick={fecharD}>
        <i className="bi bi-x"></i>
      </button>
      <div id="container">
        <div className="LateralEsquerda">
          <img src={item?.foto} alt="" />
        </div>
        <div className="LateralDireita">
          <div className="Deta">
            <h2>{item?.nome}</h2>
            <h1>
              {item?.preco.toLocaleString("pt-ao", {
                style: "currency",
                currency: "aoa",
              })}
            </h1>

            <div className="interacoes">
              <div className="dirr">
                {item?.quemEstrelou?.some((user) => user.id === Id) ? (
                  <button
                    className="removerEstrela"
                    onClick={(e) => RemoverEstrela(e, item._id)}
                  >
                    {" "}
                    <i className="bi bi-star-fill"></i>{" "}
                    <h6>{item?.estrelas}</h6>{" "}
                  </button>
                ) : (
                  <button onClick={(e) => AdicionarEstrela(e, item?._id)}>
                    {" "}
                    <i className="bi bi-star"></i>{" "}
                    <h6>{item?.estrelas}</h6>{" "}
                  </button>
                )}
              </div>
              <div className="ess">
                {favoritos?.some((fav) => fav.id === item?._id) ? (
                  <button
                    className="removerFavorito"
                    onClick={() => removerFav(item?._id)}
                  >
                    <i className="bi bi-bookmark-fill"></i>
                  </button>
                ) : (
                  <button onClick={() => AdicionarFavorito(item?._id)}>
                    <i className="bi bi-bookmark"></i>
                  </button>
                )}
              </div>
            </div>
            <p>{item?.descricao}</p>

            <h2>tipo de snack:{item?.categoriaEspecifica}</h2>

            <div className="Enco">
              <button id="wh" onClick={() => PedirWht(item?.nome, item?.preco)}>
                <i className="bi bi-whatsapp"></i> pedir no whatsapp
              </button>
            </div>
          </div>
          <div className="Comentarios">
            <h1>
              <i className="bi bi-chat-square"></i> Opiniões dos clientes
            </h1>
            <ul id="Conjunto">
              {item?.comentarios?.length > 0 ? (
                item?.comentarios
                  .slice()
                  .reverse()
                  .map((comentario) => (
                    <li className="comentario" key={comentario?._id}>
                      <img src={comentario.foto} alt="" />
                      <div>
                        <h3>{comentario.nomeUsuario}</h3>
                        <p>{comentario.comentario}</p>
                        <p className="tempo">
                          <span>
                            {dayjs(comentario.quando).format(
                              "DD/MM/YYYY HH:mm",
                            )}
                          </span>{" "}
                          <span> {dayjs(comentario.quando).fromNow()}</span>
                        </p>
                      </div>
                      {comentario?.id === Id && (
                        <button
                          className="RemoverComentario"
                          onClick={() =>
                            RemoverComenmtario(
                              item._id,
                              comentario.id,
                              comentario._id,
                            )
                          }
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      )}
                    </li>
                  ))
              ) : (
                <h3 className="sem">ainda sem comentarios</h3>
              )}
              <div className="adicionar">
                <textarea
                  placeholder="adicionar feedback"
                  ref={AreaDeEnvio}
                  onInput={aumentar}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      AdicionarComentario(item?._id);
                    }
                  }}
                ></textarea>
                <button onClick={() => AdicionarComentario(item?._id)}>
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesSnacksFavoritos;
