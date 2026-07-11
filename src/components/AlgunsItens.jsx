import "../styles/AlgunsItens.css";
import Detalhes from "./Detalhes";
import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { toast } from "react-toastify";
import api from "../services/api";
import { useContext } from "react";
import { CarrinhoContext } from "../CarrinhoContext";

function AlgunsItens({ itens, atualizar }) {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    if (itens.length > 0) {
      ScrollReveal().reveal(".lii", {
        distance: "90px",
        origin: "bottom",
        duration: 1000,
        interval: 100,
        reset: false,
      });
    }
  }, [itens]);

  const [Id, SetId] = useState();
  const [favoritos, setFavoritos] = useState([]);
  const [Item, setItem] = useState();
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
        toast.warning("Faça login pra remover Estrela");
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
        toast.warning("faça login pra melhor desempenho", {
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
      setFavoritos(MeuDados.data.perfil.favoritos);
      SetId(MeuDados.data.perfil._id);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
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

  useEffect(() => {
    yh();
  }, []);

  useEffect(() => {
    if (Item) {
      const produtoAtualizado = itens.find(
        (produto) => produto._id === Item._id,
      );

      if (produtoAtualizado) {
        setItem(produtoAtualizado);
      }
    }
  }, [itens]);
  const [MonstrarDetalhes, SetMOnstrarDetalhes] = useState(false);
  return (
    <div className="AlgunsItens">
      {MonstrarDetalhes && (
        <Detalhes
          item={Item}
          estado={SetMOnstrarDetalhes}
          atualizar={atualizar}
          Id={Id}
          favoritos={favoritos}
        />
      )}

      <h1 className="H">alguns dos nossos snacks mais recentes</h1>
      <ul className="ull">
        {itens.length > 0 ? (
          itens
            .filter((itens) => itens.categoriaGeral === "snacks")
            .slice(0, 12)
            .map((item) => (
              <li
                className="lii"
                key={item._id}
                onClick={(event) => {
                  if (
                    event.target.className === "imagem" ||
                    event.target.className === "conteudo" ||
                    event.target.className === "li" ||
                    event.target.className === "ig" ||
                    event.target.className === "interacoes" ||
                    event.target.className === "bi-chat-square"
                  ) {
                    SetMOnstrarDetalhes(true);
                    setItem(item);
                  }
                }}
              >
                <div className="imagem">
                  <img className="ig" src={item?.foto} alt="" />
                </div>
                <div className="conteudo">
                  <div className="bb">
                    <p id="ppp">{item?.nome}</p>
                    <h1>
                      {item?.preco.toLocaleString("pt-ao", {
                        style: "currency",
                        currency: "AOA",
                      })}
                    </h1>
                  </div>
                  <div className="interacoes">
                    <div className="dirr">
                      {item?.quemEstrelou?.some((user) => user.id === Id) ? (
                        <button
                          className="removerEstrela"
                          onClick={(e) => RemoverEstrela(e, item._id)}
                        >
                          {" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <h3>{item?.estrelas}</h3>{" "}
                        </button>
                      ) : (
                        <button onClick={(e) => AdicionarEstrela(e, item._id)}>
                          {" "}
                          <i className="bi bi-star"></i>{" "}
                          <h3>{item?.estrelas}</h3>{" "}
                        </button>
                      )}

                      <button>
                        <i class="bi bi-chat-square"></i>
                        <h3>{item?.comentarios?.length}</h3>
                      </button>
                    </div>

                    <div className="ess">
                      {favoritos?.some((fav) => fav.id === item?._id) ? (
                        <button
                          className="removerFavorito"
                          onClick={() => removerFav(item?._id)}
                        >
                          <i class="bi bi-bookmark-fill"></i>
                        </button>
                      ) : (
                        <button onClick={() => AdicionarFavorito(item?._id)}>
                          <i className="bi bi-bookmark"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {carrinho.some((car) => car.id === item._id) ? (
                  <button className="Adicionado">
                    <i class="bi bi-check2-circle"></i> adicionado ao carrinho
                  </button>
                ) : (
                  <button
                    id="adiconarCarrinho"
                    onClick={() =>
                      AdiconarCarrinho(
                        item.foto,
                        item.nome,
                        item.preco,
                        item._id,
                      )
                    }
                  >
                    <i class="bi bi-cart-plus-fill"></i> adicionar ao carrinho
                  </button>
                )}
              </li>
            ))
        ) : (
          <h3 className="sem">sem produtos no site</h3>
        )}
      </ul>
    </div>
  );
}

export default AlgunsItens;
