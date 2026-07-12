import { Link } from "react-router-dom";
import "../styles/MeusDados.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function MeusDados({ monstrar, eu }) {
  const navigate = useNavigate();
  function fechar() {
    monstrar(false);
  }
  function fechar2(e) {
    if (e.target.className === "MeusDados") {
      monstrar(false);
    }
  }
  return (
    <div className="MeusDados" onClick={fechar2}>
      <button id="fechar" onClick={fechar}>
        <i class="bi bi-x"></i>
      </button>
      <div className="container">
        <div className="topo">
          <img src={eu?.foto} alt="" />
          <div>
            <h1 id="eu">
              <i class="bi bi-person-fill"></i> {eu?.nomeUsuario}
            </h1>
            <h2>
              <i class="bi bi-person-arms-up"></i>
              {eu?.nome}
            </h2>
            <p>
              <i class="bi bi-envelope-at-fill"></i> {eu?.email}
            </p>
          </div>
        </div>
        <div className="baixo">
          <h3>
            total dos seus itens favoritos{" "}
            <Link to={"/favoritos"}>
              {" "}
              <i class="bi bi-bookmark-check-fill"></i> {eu?.favoritos?.length}
            </Link>
          </h3>
          <button
            onClick={() => {
              const id = toast.loading("terminando sua sessão...", {
                position: "top-center",
              });
              setTimeout(() => {
                toast.dismiss(id);
                localStorage.removeItem("TokenGameSnack");
                navigate("/login");
              }, 3000);
            }}
          >
            <i class="bi bi-person-walking"></i> terminar sessão
          </button>
        </div>
      </div>
    </div>
  );
}
export default MeusDados;
