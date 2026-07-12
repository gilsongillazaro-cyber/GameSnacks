import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/Login.css";
import fundo from "../assets/GameSnack imagens/NovaPasta/fundo-login.webp";
function Login() {
  const email = useRef();
  const senha = useRef();
  const tex = useRef();
  const load = useRef();
  const navigate = useNavigate();
  const btnMons = useRef();
  const btnOcul = useRef();
  const [disabilitado, setDisabilitado] = useState(false);
  function monstrar() {
    btnMons.current.style.display = "none";
    btnOcul.current.style.display = "block";
    senha.current.type = "text";
  }
  function ocultar() {
    btnMons.current.style.display = "block";
    btnOcul.current.style.display = "none";
    senha.current.type = "password";
  }
  async function LoginContra(e) {
    setDisabilitado(true);
    e.preventDefault();
    tex.current.style.display = "none";
    load.current.style.display = "block";
    try {
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/login`,
        {
          email: email.current.value,
          senha: senha.current.value,
        },
      );

      localStorage.setItem("TokenGameSnack", response.data.token);
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      tex.current.style.display = "block";
      load.current.style.display = "none";
      setDisabilitado(false);
      navigate("/");
    } catch (erro) {
      setDisabilitado(false);
      tex.current.style.display = "block";
      load.current.style.display = "none";
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="Login" style={{ background: `url(${fundo})` }}>
      <form>
        <h1>
          <i className="bi bi-door-open-fill"></i> loga-<span>te</span>
        </h1>
        <div>
          {" "}
          <input type="email" placeholder="Seu Email" ref={email} />
        </div>
        <div>
          {" "}
          <input type="password" placeholder="Cria uma Senha" ref={senha} />
          <button id="monstrar" type="button" onClick={monstrar} ref={btnMons}>
            <i className="bi bi-eye-fill"></i>
          </button>
          <button id="ocultar" type="button" onClick={ocultar} ref={btnOcul}>
            <i className="bi bi-eye-slash-fill"></i>
          </button>
        </div>
        <button id="logar" onClick={LoginContra} disabled={disabilitado}>
          <p ref={tex}>logar</p>
          <h2 className="load" ref={load}>
            <i className="bi bi-arrow-repeat"></i>
          </h2>
        </button>
      </form>
      <p>
        não tem uma conta? <Link to={"/cadastro"}>cadastra-se</Link>
      </p>
    </div>
  );
}
export default Login;
