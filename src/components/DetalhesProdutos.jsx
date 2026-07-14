import "../styles/DEtalhesProdutos.css";
import { useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import api from "../services/api";
import { useContext } from "react";
import { CarrinhoContext } from "../CarrinhoContext";

dayjs.extend(relativeTime);
function DetalhesProdutos({ estado, Item, Id, favoritos, Eu, PegarTodos, YH }) {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  async function AdiconarCarrinho(foto, nome, preco, id) {
    const novo = {
      foto,
      nome,
      preco,
      id,
      quantidade: 1,
    };
    setCarrinho([...carrinho, novo]);
  }
  const Texto = useRef();
  function aumentar() {
    Texto.current.style.height = "auto";
    Texto.current.style.height = Texto.current.scrollHeight + "px";
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
   Preço: ${Preco}
   Cliente: ${Eu.nomeUsuario}
  ----------------
  Localização de entrega: 
   `;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blanck");
  }
  async function AdicionarEstrela(Id) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adicionar Estrela", {
          position: "top-center",
        });
        return;
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/estrela/${Id}`,
        {
          nome: Eu.nome,
          id: Eu._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      PegarTodos();
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
        toast.warning("Faça login pra remover Estrela");
        return;
      }
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/remover/estrela/${identi}`,
        {
          id: Eu._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      PegarTodos();
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
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/favorito/${Id}`,
        {
          id: Eu._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      PegarTodos();
      YH();
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
        toast.warning("acesso negado", {
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

      PegarTodos();
      YH();
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
          comentario: Texto.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      PegarTodos();
      Texto.current.value = "";
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
        toast.warning("Faça login pra remover aos comentario", {
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

      PegarTodos();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div
      className="DetalhesProdutos"
      onClick={(e) => {
        if (e.target.className === "DetalhesProdutos") {
          estado(false);
        }
      }}
    >
      <div className="conteiner">
        <div className="direita">
          <img src={Item.foto} alt="" />
        </div>
        <div className="Esquerda">
          <h3>{Item.nome}</h3>
          <div className="botooes">
            <div className="estyrelas">
              {Item.quemEstrelou.some((user) => user.id === Id) ? (
                <>
                  <button onClick={() => RemoverEstrela(Item._id)}>
                    <i className="bi bi-star-fill"></i>
                  </button>
                  <span>{Item.estrelas}</span>
                </>
              ) : (
                <>
                  <button onClick={() => AdicionarEstrela(Item._id)}>
                    <i className="bi bi-star"></i>
                  </button>
                  <span>{Item.estrelas}</span>
                </>
              )}
            </div>
            <div className="comentarios">
              <button>
                <i className="bi bi-chat-square"></i>{" "}
                <span>{Item.comentarios.length}</span>
              </button>
            </div>
            <div className="favoritos">
              {favoritos.some((user) => user.id === Item._id) ? (
                <button onClick={() => removerFav(Item._id)}>
                  <i className="bi bi-bookmark-fill"></i>
                </button>
              ) : (
                <button onClick={() => AdicionarFavorito(Item._id)}>
                  <i className="bi bi-bookmark"></i>
                </button>
              )}
            </div>
          </div>
          <p className="p">
            <strong>
              {Item.preco.toLocaleString("pt-ao", {
                style: "currency",
                currency: "aoa",
              })}
            </strong>
            {Item.descricao}
          </p>
          <div className="encoo">
            {carrinho.some((car) => car.id === Item._id) ? (
              <button className="Adicionado">
                <i className="bi bi-check2-circle"></i> adicionado ao carrinho
              </button>
            ) : (
              <button
                id="adiconarCarrinho"
                className="cari"
                onClick={() =>
                  AdiconarCarrinho(Item.foto, Item.nome, Item.preco, Item._id)
                }
              >
                <i className="bi bi-cart-plus-fill"></i> adicionar ao carrinho
              </button>
            )}
            <button
              className="whh"
              onClick={() => PedirWht(Item.nome, Item.preco)}
            >
              <i className="bi bi-whatsapp"></i> pedir no whatsapp
            </button>
          </div>
          <h3>comentarios dos nossos clientes</h3>
          <ul id="Ull">
            {Item.comentarios.length > 0 ? (
              Item.comentarios
                .slice()
                .reverse()
                .map((comen) => (
                  <>
                    <li className="LLLi" key={comen._id}>
                      <img src={comen.foto} alt="" />
                      <div>
                        <h3>{comen.nomeUsuario}</h3>
                        <p>{comen.comentario}</p>
                        <p className="tempo">
                          <span>
                            {dayjs(comen.quando).format("DD/MM/YYYY HH:mm")}
                          </span>{" "}
                          <span>{dayjs(comen.quando).fromNow()}</span>
                        </p>
                      </div>
                      {comen.id === Id && (
                        <button
                          onClick={() =>
                            RemoverComenmtario(Item._id, comen.id, comen._id)
                          }
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      )}
                    </li>
                  </>
                ))
            ) : (
              <h3 className="sem"> sem comentarios ainda </h3>
            )}
            <div className="eniar">
              <textarea
                ref={Texto}
                placeholder="digite seu comentario"
                onInput={aumentar}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    AdicionarComentario(Item._id);
                  }
                }}
              ></textarea>
              <button onClick={() => AdicionarComentario(Item._id)}>
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProdutos;
