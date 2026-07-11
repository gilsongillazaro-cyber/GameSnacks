import "../styles/Favoritos.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import api from "../services/api";
import DetalhesJogosFavoritos from "../components/DetalhesJogosFavoritos";
import DetalhesSnacksFavoritos from "../components/DetalhesSnacksFavoritos";
import { useContext } from "react";
import { CarrinhoContext } from "../CarrinhoContext";
import { toast } from "react-toastify";
function Favoritos() {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const [Meusfav, setMeusFav] = useState([]);
  const [Id, SetId] = useState();
  const [MonstrarDetJogos, setMonstraDetJogos] = useState(false);
  const [MOnstrarDetSnacks, setMonstraDetSnacks] = useState(false);
  const [jogo, setJogo] = useState();
  const [snack, setSnack] = useState();
  const [Eu, setEu] = useState();
  const token = localStorage.getItem("TokenGameSnack");

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
  async function pegarFav() {
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

      setMeusFav(response.data.perfil.favoritos);
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
      pegarFav();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    ScrollReveal().reveal(".hh", {
      duration: 2000,
      origin: "left",
      distance: "90px",
      reset: true,
    });
    ScrollReveal().reveal(".li", {
      duration: 2000,
      origin: "bottom",
      distance: "90px",
      reset: true,
    });
    pegarFav();
  }, []);
  function pedirWhatsapp(nome, preco) {
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

    const url = `https://wa.me/937490810?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blanck");
  }

  return (
    <div className="Favoritos">
      {MonstrarDetJogos && (
        <DetalhesJogosFavoritos
          estado={setMonstraDetJogos}
          Id={Id}
          jogo={jogo}
          Eu={Eu}
        />
      )}
      {MOnstrarDetSnacks && (
        <DetalhesSnacksFavoritos
          estado={setMonstraDetSnacks}
          snack={snack}
          Id={Id}
          atualizar={pegarFav}
        />
      )}
      <Header />
      <div className="topoo">
        <h1>
          <i class="bi bi-bookmark-check-fill"></i> meus favoritos
        </h1>
        <div className="quantidade">
          <div>
            <h3>
              <i class="bi bi-grid"></i> todos:{" "}
              <span>{Meusfav?.length || 0}</span>
            </h3>
          </div>
          <div>
            <h3>
              <i class="bi bi-controller"></i> jogos:{" "}
              <span>
                {Meusfav?.filter((f) => f.categoriaGeral === "jogos")?.length ||
                  0}
              </span>
            </h3>
          </div>
          <div>
            <h3>
              <i class="bi bi-egg-fried"></i> snacks:{" "}
              <span>
                {Meusfav?.filter((f) => f.categoriaGeral === "snacks")
                  ?.length || 0}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <div className="i">
        <h1>meus jogos</h1>
        <ul id="UL">
          {!token ? (
            <h3 className="sem">faça login pra ver os seus jogos favoritos</h3>
          ) : Meusfav.length > 0 ? (
            Meusfav.filter((f) => f.categoriaGeral === "jogos").map((fav) => (
              <li
                className="JoGo"
                key={fav._id}
                onClick={(e) => {
                  if (
                    e.target.className === "JoGo" ||
                    e.target.className === "imJ" ||
                    e.target.className === "nOMEj" ||
                    e.target.className === "pEROj"
                  ) {
                    setMonstraDetJogos(true);
                    setJogo(fav);
                  }
                }}
              >
                <img src={fav.foto} className="imJ" alt="" />
                <p className="nOMEj">{fav.nome}</p>
                <h1 className="pEROj">
                  {fav.preco.toLocaleString("pt", {
                    style: "currency",
                    currency: "aoa",
                  })}
                </h1>
                <button onClick={() => removerFav(fav.id)}>
                  {" "}
                  <i class="bi bi-bookmark-dash-fill"></i> remover dos favoritos
                </button>
                <button
                  className="what"
                  onClick={() => pedirWhatsapp(fav.nome, fav.preco)}
                >
                  <i class="bi bi-whatsapp"></i> reservar no whatsapp
                </button>
              </li>
            ))
          ) : (
            <h3 className="sem">
              {" "}
              <i className="bi bi-bookmark-x-fill"></i> não tens itens favoritos
            </h3>
          )}
        </ul>
        <h1>meus snacks</h1>
        <ul id="UL">
          {!token ? (
            <h3 className="sem">faça login pra ver os seus snacks favoritos</h3>
          ) : Meusfav.length > 0 ? (
            Meusfav.filter((f) => f.categoriaGeral === "snacks").map((fav) => (
              <li
                key={fav._id}
                className="LiSn"
                onClick={(e) => {
                  if (
                    e.target.className === "LiSn" ||
                    e.target.className === "PSnc" ||
                    e.target.className === "ImSn"
                  ) {
                    setMonstraDetSnacks(true);
                    setSnack(fav);
                  }
                }}
              >
                <img src={fav.foto} className="ImSn" alt="" />
                <p className="PSnc">{fav.nome}</p>
                <h1>
                  {fav.preco.toLocaleString("pt", {
                    style: "currency",
                    currency: "aoa",
                  })}
                </h1>
                <button onClick={() => removerFav(fav.id)}>
                  {" "}
                  <i class="bi bi-bookmark-dash-fill"></i> remover dos favoritos
                </button>
                {carrinho.some((car) => car.id === fav._id) ? (
                  <button className="Adicionado">
                    <i class="bi bi-check2-circle"></i> adicionado ao carrinho
                  </button>
                ) : (
                  <button
                    id="adiconarCarrinho"
                    onClick={() =>
                      AdiconarCarrinho(fav.foto, fav.nome, fav.preco, fav._id)
                    }
                  >
                    <i class="bi bi-cart-plus-fill"></i> adicionar ao carrinho
                  </button>
                )}
              </li>
            ))
          ) : (
            <h3 className="sem">
              {" "}
              <i className="bi bi-bookmark-x-fill"></i> não tens itens favoritos
            </h3>
          )}
        </ul>
        <h1>todos os meus itens</h1>
        <ul id="UL">
          {!token ? (
            <h3 className="sem">faça login pra ver os seus itens favoritos</h3>
          ) : Meusfav.length > 0 ? (
            Meusfav.map((fav) => (
              <li key={fav._id}>
                <img src={fav.foto} alt="" />
                <p>{fav.nome}</p>
                <h1>
                  {fav.preco.toLocaleString("pt", {
                    style: "currency",
                    currency: "aoa",
                  })}
                </h1>
                <button onClick={() => removerFav(fav.id)}>
                  {" "}
                  <i class="bi bi-bookmark-dash-fill"></i> remover dos favoritos
                </button>
                {fav.categoriaGeral === "snacks" ? (
                  carrinho.some((car) => car.id === fav._id) ? (
                    <button className="Adicionado">
                      <i class="bi bi-check2-circle"></i> adicionado ao carrinho
                    </button>
                  ) : (
                    <button
                      id="adiconarCarrinho"
                      onClick={() =>
                        AdiconarCarrinho(fav.foto, fav.nome, fav.preco, fav._id)
                      }
                    >
                      <i class="bi bi-cart-plus-fill"></i> adicionar ao carrinho
                    </button>
                  )
                ) : (
                  <button
                    className="what"
                    onClick={() => pedirWhatsapp(fav.nome, fav.preco)}
                  >
                    <i class="bi bi-whatsapp"></i> reservar no whatsapp
                  </button>
                )}
              </li>
            ))
          ) : (
            <h3 className="sem">
              {" "}
              <i className="bi bi-bookmark-x-fill"></i> não tens itens favoritos
            </h3>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Favoritos;
