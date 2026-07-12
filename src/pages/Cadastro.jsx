import { Link, useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";
import { useRef, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import fundo from "../assets/GameSnack imagens/NovaPasta/fundo-login.webp";
function Cadastro() {
  const senha = useRef();
  const nome = useRef();
  const navigate = useNavigate();
  const email = useRef();
  const verificador = useRef();
  const btnMons = useRef();
  const btnOcul = useRef();
  const load = useRef();
  const tex = useRef();
  const p = useRef();
  const [disabilitado, setDisabilitado] = useState(false);
  const [foto, setFoto] = useState("");

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
  const [eu, setEu] = useState();
  async function CriarConta(e) {
    e.preventDefault();
    tex.current.style.display = "none";
    load.current.style.display = "block";
    setDisabilitado(true);
    try {
      const formData = new FormData();
      formData.append("nome", nome.current.value);
      formData.append("email", email.current.value);
      formData.append("foto", foto);
      formData.append("verificador", verificador.current.value);
      formData.append("senha", senha.current.value);
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/cadastro`,
        formData,
      );
      setEu(response.data.usu);
      localStorage.setItem("TokenGameSnack", response.data.token);
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      tex.current.style.display = "block";
      load.current.style.display = "none";
      setDisabilitado(false);
      nome.current.value = "";
      email.current.value = "";
      verificador.current.value = "";
      senha.current.value = "";
      setFoto("");
      p.current.innerHTML = `<i className="bi bi-image-fill"></i> sua foto pra perfil`;
      p.current.style.color = "lightgrey";
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
    <div className="Cadastro" style={{ background: `url(${fundo})` }}>
      <form>
        <h1>
          <i class="bi bi-person-fill-add"></i> cadastra-<span>te</span>
        </h1>
        <div>
          {" "}
          <input type="text" placeholder="Seu Nome" ref={nome} />
        </div>
        <div>
          {" "}
          <input type="email" placeholder="Seu Email" ref={email} />
        </div>
        <div>
          {" "}
          <label htmlFor="foto2">
            <p ref={p}>sua foto pra perfil</p>
            <input
              type="file"
              id="foto2"
              accept="image/*"
              onChange={(e) => {
                setFoto(e.target.files[0]);
                p.current.innerHTML = `<i className="bi bi-image-fill"></i> foto selecionada`;
                p.current.style.color = "blue";
              }}
            />
          </label>
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
        <div>
          {" "}
          <input
            type="text"
            placeholder="Digite a senha novamente"
            ref={verificador}
          />
        </div>
        <button onClick={CriarConta} disabled={disabilitado}>
          <p ref={tex}>Cadastra-se</p>
          <h2 className="load" ref={load}>
            <i className="bi bi-arrow-repeat"></i>
          </h2>
        </button>
      </form>
      <p>
        já tem uma conta? <Link to={"/login"}>faça login</Link>
      </p>
    </div>
  );
}
export default Cadastro;
