import { Link, NavLink } from "react-router-dom";
import logo from "../assets/GameSnack imagens/logoGameSnack.png";
import "../styles/header.css";
import MeusDados from "./MeusDados";
import Carrinho from "./Carrinho";
import Detalhes from "./Detalhes";
import { useRef, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { CarrinhoContext } from "../CarrinhoContext";
function Header() {
  const { carrinho } = useContext(CarrinhoContext);
  const ul = useRef();
  const nav = useRef();
  const foo = useRef();
  const foo2 = useRef();
  const bTer = useRef();
  const bTer2 = useRef();

  const [MonstrarDados, setMonstrarDados] = useState(false);
  const [MonstrarCarrinho, setMonstrarCarrinho] = useState(false);
  const [MonstrarDetalhes, SetMOnstrarDetalhes] = useState(false);
  const [eu, setEu] = useState();
  const [botao, setBotao] = useState(null);
  function abrir(e) {
    const btn = e.currentTarget;
    setBotao(btn);
    if (!btn.classList.contains("aberto")) {
      botao.classList.add("aberto");
      nav.current.style.display = "block";
      setTimeout(() => {
        ul.current.style.width = "70%";
        ul.current.style.opacity = "1";
      }, 100);
    } else {
      btn.classList.remove("aberto");
      ul.current.style.width = "0";
      ul.current.style.opacity = "0";
      setTimeout(() => {
        nav.current.style.display = "none";
      }, 100);
    }
  }
  function fechar() {
    if (botao) {
      botao.classList.remove("aberto");
    }
    ul.current.style.width = "0";
    ul.current.style.opacity = "0";
    setTimeout(() => {
      nav.current.style.display = "none";
    }, 100);
  }
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
      setEu(response.data.perfil);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("TokenGameSnack");
    if (!token) {
      foo.current.style.display = "none";
      foo2.current.style.display = "none";
    } else {
      foo.current.style.display = "block";
      foo2.current.style.display = "block";
      bTer.current.style.display = "none";
      bTer2.current.style.display = "none";
    }
    meusDados();
  }, []);

  return (
    <header>
      {MonstrarDetalhes && <Detalhes estado={SetMOnstrarDetalhes} />}
      {MonstrarDados && <MeusDados monstrar={setMonstrarDados} eu={eu} />}
      {MonstrarCarrinho && <Carrinho fechar={setMonstrarCarrinho} />}
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="pc">
        <nav>
          <ul>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "ativo" : "")}
              >
                inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/produtos"}
                className={({ isActive }) => (isActive ? "ativo" : "")}
              >
                produtos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contactos"}
                className={({ isActive }) => (isActive ? "ativo" : "")}
              >
                contactos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/favoritos"}
                className={({ isActive }) => (isActive ? "ativo" : "")}
              >
                favoritos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="btns">
        <button
          id="car"
          onClick={() => {
            setMonstrarCarrinho(true);
          }}
        >
          <p className="QuantiDate">{carrinho.length}</p>
          <i class="bi bi-cart-fill"></i>
        </button>
        <button
          ref={foo}
          onClick={() => {
            setMonstrarDados(true);
          }}
        >
          <img src={eu?.foto} alt="" />
        </button>
        <button id="lo" ref={bTer}>
          <Link to={"/login"}>fazer login</Link>
        </button>
      </div>

      <div className="tel">
        <button
          id="carT"
          onClick={() => {
            setMonstrarCarrinho(true);
          }}
        >
          <p className="QuantiDate">{carrinho.length}</p>
          <i class="bi bi-cart-fill"></i>
        </button>
        <button
          ref={foo2}
          onClick={() => {
            setMonstrarDados(true);
          }}
        >
          <img src={eu?.foto} alt="" />
        </button>
        <button className="ab" onClick={abrir}>
          <span className="linha"></span>
          <span className="linha"></span>
          <span className="linha"></span>
        </button>
        <nav ref={nav} onClick={fechar}>
          <ul ref={ul}>
            <li>
              <Link to={"/"}>
                <i class="bi bi-house-fill"></i> inicio
              </Link>
            </li>
            <li>
              <Link to={"/produtos"}>
                <i class="bi bi-inboxes-fill"></i> produtos
              </Link>
            </li>
            <li>
              <Link to={"/contactos"}>
                <i class="bi bi-person-rolodex"></i> contactos
              </Link>
            </li>
            <li>
              <Link to={"/favoritos"}>
                <i class="bi bi-bookmark-fill"></i> favoritos
              </Link>
            </li>
            <button ref={bTer2}>
              <Link to={"/login"}>fazer login</Link>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
