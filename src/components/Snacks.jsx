import "../styles/Snacks.css";
import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import api from "../services/api";
import { toast } from "react-toastify";
import DetalhesProdutos from "./DetalhesProdutos";
import { useContext } from "react";
import { CarrinhoContext } from "../CarrinhoContext";
function Snacks() {
  const [MonstrarDetalhes, SetMOnstrarDetalhes] = useState(false);
  const [ativo, setAtivo] = useState("todos");
  const [itens, setItens] = useState([]);
  const [Id, SetId] = useState();
  const [favoritos, setFavoritos] = useState([]);
  const [Item, setItem] = useState();
  const [Eu, setEu] = useState();
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
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
      SetId(MeuDados.data.perfil._id);
      setEu(MeuDados.data.perfil);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    yh();
  }, []);
  async function PegarTodos() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/produtos`,
      );
      setItens(response.data.produtos);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    if (Item) {
      const Certo = itens.find((it) => it._id === Item._id);
      if (Certo) {
        setItem(Certo);
      }
    }
  }, [itens]);
  useEffect(() => {
    ScrollReveal().reveal(".H11", {
      distance: "90px",
      origin: "left",
      duration: "2000",
    });
    ScrollReveal().reveal(".B", {
      distance: "90px",
      origin: "bottom",
      duration: "2000",
    });
    ScrollReveal().reveal(".li", {
      distance: "90px",
      origin: "bottom",
      duration: "2000",
      delay: 500,
      interval: 200,
    });
    PegarTodos();
  }, []);

  async function AdicionarEstrela(Id) {
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("Faça login pra adiconar Estrela", {
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
        toast.warning("Faça login pra remover Estrela", {
          position: "top-center",
        });
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

      PegarTodos();
      yh();
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
  return (
    <div className="snacks">
      {MonstrarDetalhes && (
        <DetalhesProdutos
          favoritos={favoritos}
          Item={Item}
          Id={Id}
          Eu={Eu}
          YH={yh}
          PegarTodos={PegarTodos}
          estado={SetMOnstrarDetalhes}
        />
      )}
      <h2 className="H11">
        todos os snacks / <p>{itens.length}</p>
      </h2>
      <h2>filtrar snacks</h2>
      <div className="B">
        <button
          className={ativo === "todos" ? "ativo" : ""}
          onClick={() => setAtivo("todos")}
        >
          todos snacks
        </button>
        <button
          className={ativo === "gelado gourmet" ? "ativo" : ""}
          onClick={() => setAtivo("gelado gourmet")}
        >
          gelados gourmet
        </button>
        <button
          className={ativo === "pipoca goumet" ? "ativo" : ""}
          onClick={() => setAtivo("pipoca goumet")}
        >
          pipocas gourmet
        </button>
        <button
          className={ativo === "bolo no pote" ? "ativo" : ""}
          onClick={() => setAtivo("bolo no pote")}
        >
          bolos no pote
        </button>
      </div>
      <ul>
        {ativo === "todos" ? (
          itens.filter((ite) => ite.categoriaGeral === "snacks").length > 0 ? (
            itens
              .filter((ite) => ite.categoriaGeral === "snacks")
              .slice()
              .reverse()
              .map((item) => (
                <li
                  className="li"
                  key={item._id}
                  onClick={(event) => {
                    if (
                      event.target.className === "imagem" ||
                      event.target.className === "conteudo" ||
                      event.target.className === "li" ||
                      event.target.className === "ig" ||
                      event.target.className === "interacoes"
                    ) {
                      SetMOnstrarDetalhes(true);
                      setItem(item);
                    }
                  }}
                >
                  <div className="imagem">
                    <img className="ig" src={item.foto} alt="" />
                  </div>
                  <div className="conteudo">
                    <h3>{item.nome}</h3>
                    <h2>
                      {item.preco.toLocaleString("pt-ao", {
                        style: "currency",
                        currency: "aoa",
                      })}
                    </h2>
                    <div className="interacoes">
                      <div className="dirr">
                        {item.quemEstrelou.some((user) => user.id === Id) ? (
                          <button
                            className="removerEstrela"
                            onClick={() => RemoverEstrela(item._id)}
                          >
                            <i class="bi bi-star-fill"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarEstrela(item._id)}>
                            <i class="bi bi-star"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        )}
                        <button>
                          <i class="bi bi-chat-square"></i>
                          <h3>{item.comentarios.length}</h3>
                        </button>
                      </div>
                      <div className="ess">
                        {favoritos.some((user) => user.id === item._id) ? (
                          <button
                            className="removerFavorito"
                            onClick={() => removerFav(item._id)}
                          >
                            <i class="bi bi-bookmark-fill"></i>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarFavorito(item._id)}>
                            <i class="bi bi-bookmark"></i>
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
            <h3 className="sem">sem produtos disponiveis</h3>
          )
        ) : ativo === "gelado gourmet" ? (
          itens.filter(
            (ite) =>
              ite.categoriaGeral === "snacks" &&
              ite.categoriaEspecifica === "gelado gourmet",
          ).length > 0 ? (
            itens
              .filter(
                (ite) =>
                  ite.categoriaGeral === "snacks" &&
                  ite.categoriaEspecifica === "gelado gourmet",
              )
              .slice()
              .reverse()
              .map((item) => (
                <li
                  className="li"
                  key={item._id}
                  onClick={(event) => {
                    if (
                      event.target.className === "imagem" ||
                      event.target.className === "conteudo" ||
                      event.target.className === "li" ||
                      event.target.className === "ig" ||
                      event.target.className === "interacoes"
                    ) {
                      SetMOnstrarDetalhes(true);
                      setItem(item);
                    }
                  }}
                >
                  <div className="imagem">
                    <img className="ig" src={item.foto} alt="" />
                  </div>
                  <div className="conteudo">
                    <h3>{item.nome}</h3>
                    <h2>
                      {item.preco.toLocaleString("pt-ao", {
                        style: "currency",
                        currency: "aoa",
                      })}
                    </h2>
                    <div className="interacoes">
                      <div className="dirr">
                        {item.quemEstrelou.some((user) => user.id === Id) ? (
                          <button
                            className="removerEstrela"
                            onClick={() => RemoverEstrela(item._id)}
                          >
                            <i class="bi bi-star-fill"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarEstrela(item._id)}>
                            <i class="bi bi-star"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        )}
                        <button>
                          <i class="bi bi-chat-square"></i>
                          <h3>{item.comentarios.length}</h3>
                        </button>
                      </div>
                      <div className="ess">
                        {favoritos.some((user) => user.id === item._id) ? (
                          <button
                            className="removerFavorito"
                            onClick={() => removerFav(item._id)}
                          >
                            <i class="bi bi-bookmark-fill"></i>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarFavorito(item._id)}>
                            <i class="bi bi-bookmark"></i>
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
            <h3 className="sem">sem geldos disponiveis</h3>
          )
        ) : ativo === "pipoca goumet" ? (
          itens.filter(
            (ite) =>
              ite.categoriaGeral === "snacks" &&
              ite.categoriaEspecifica === "pipoca goumet",
          ).length > 0 ? (
            itens
              .filter(
                (ite) =>
                  ite.categoriaGeral === "snacks" &&
                  ite.categoriaEspecifica === "pipoca goumet",
              )
              .slice()
              .reverse()
              .map((item) => (
                <li
                  className="li"
                  key={item._id}
                  onClick={(event) => {
                    if (
                      event.target.className === "imagem" ||
                      event.target.className === "conteudo" ||
                      event.target.className === "li" ||
                      event.target.className === "ig" ||
                      event.target.className === "interacoes"
                    ) {
                      SetMOnstrarDetalhes(true);
                      setItem(item);
                    }
                  }}
                >
                  <div className="imagem">
                    <img className="ig" src={item.foto} alt="" />
                  </div>
                  <div className="conteudo">
                    <h3>{item.nome}</h3>
                    <h2>
                      {item.preco.toLocaleString("pt-ao", {
                        style: "currency",
                        currency: "aoa",
                      })}
                    </h2>
                    <div className="interacoes">
                      <div className="dirr">
                        {item.quemEstrelou.some((user) => user.id === Id) ? (
                          <button
                            className="removerEstrela"
                            onClick={() => RemoverEstrela(item._id)}
                          >
                            <i class="bi bi-star-fill"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarEstrela(item._id)}>
                            <i class="bi bi-star"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        )}
                        <button>
                          <i class="bi bi-chat-square"></i>
                          <h3>{item.comentarios.length}</h3>
                        </button>
                      </div>
                      <div className="ess">
                        {favoritos.some((user) => user.id === item._id) ? (
                          <button
                            className="removerFavorito"
                            onClick={() => removerFav(item._id)}
                          >
                            <i class="bi bi-bookmark-fill"></i>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarFavorito(item._id)}>
                            <i class="bi bi-bookmark"></i>
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
            <h3 className="sem">sem pipocas disponiveis</h3>
          )
        ) : ativo === "bolo no pote" ? (
          itens.filter(
            (ite) =>
              ite.categoriaGeral === "snacks" &&
              ite.categoriaEspecifica === "bolo no pote",
          ).length > 0 ? (
            itens
              .filter(
                (ite) =>
                  ite.categoriaGeral === "snacks" &&
                  ite.categoriaEspecifica === "bolo no pote",
              )
              .slice()
              .reverse()
              .map((item) => (
                <li
                  className="li"
                  key={item._id}
                  onClick={(event) => {
                    if (
                      event.target.className === "imagem" ||
                      event.target.className === "conteudo" ||
                      event.target.className === "li" ||
                      event.target.className === "ig" ||
                      event.target.className === "interacoes"
                    ) {
                      SetMOnstrarDetalhes(true);
                      setItem(item);
                    }
                  }}
                >
                  <div className="imagem">
                    <img className="ig" src={item.foto} alt="" />
                  </div>
                  <div className="conteudo">
                    <h3>{item.nome}</h3>
                    <h2>
                      {item.preco.toLocaleString("pt-ao", {
                        style: "currency",
                        currency: "aoa",
                      })}
                    </h2>
                    <div className="interacoes">
                      <div className="dirr">
                        {item.quemEstrelou.some((user) => user.id === Id) ? (
                          <button
                            className="removerEstrela"
                            onClick={() => RemoverEstrela(item._id)}
                          >
                            <i class="bi bi-star-fill"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarEstrela(item._id)}>
                            <i class="bi bi-star"></i>
                            <h3>{item.estrelas}</h3>
                          </button>
                        )}
                        <button>
                          <i class="bi bi-chat-square"></i>
                          <h3>{item.comentarios.length}</h3>
                        </button>
                      </div>
                      <div className="ess">
                        {favoritos.some((user) => user.id === item._id) ? (
                          <button
                            className="removerFavorito"
                            onClick={() => removerFav(item._id)}
                          >
                            <i class="bi bi-bookmark-fill"></i>
                          </button>
                        ) : (
                          <button onClick={() => AdicionarFavorito(item._id)}>
                            <i class="bi bi-bookmark"></i>
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
            <h3 className="sem">sem bolos disponiveis</h3>
          )
        ) : (
          <p>nao encontrado</p>
        )}
      </ul>
    </div>
  );
}

export default Snacks;
