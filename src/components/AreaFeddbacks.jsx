import "../styles/AreaFeeddBacks.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
dayjs.extend(relativeTime);
function AreaFeedbacks() {
  const [feedbacks, setFeedBacks] = useState([]);
  const [User, setUSer] = useState();
  const feedback = useRef();
  const estrela = useRef();
  const texto = useRef();
  const load = useRef();
  const texto2 = useRef();
  const load2 = useRef();
  const novo = useRef();
  const [disabilitado, setDisabilitado] = useState(false);
  const [disabilitado2, setDisabilitado2] = useState(false);
  async function PegarFeedBacks() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/pegar/feedbacks`,
      );
      setFeedBacks(response.data.feedbacks);
    } catch (erro) {
      confirm.log(erro);
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function GetUser() {
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
      setUSer(MeuDados.data.perfil);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function AdicionarFeedBack(e) {
    e.preventDefault();
    load.current.style.display = "block";
    texto.current.style.display = "none";
    setDisabilitado(true);
    const token = localStorage.getItem("TokenGameSnack");
    if (!token) {
      load.current.style.display = "none";
      texto.current.style.display = "block";
      setDisabilitado(false);
      toast.info("faça login pra adicionar feedback");
      return;
    }
    try {
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/adicionar/feedbacks`,
        {
          foto: User.foto,
          nome: User.nomeUsuario,
          estrelas: Number(estrela.current.value),
          feedback: feedback.current.value,
          usuarioId: User._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      PegarFeedBacks();
      texto.current.style.display = "block";
      load.current.style.display = "none";
      setDisabilitado(false);
      feedback.current.value = "";
      estrela.current.value = "";
    } catch (erro) {
      setDisabilitado(false);
      texto.current.style.display = "block";
      load.current.style.display = "none";
      if (
        erro.response.data.mensagem ===
        "não podes adicionar mais de um feedback"
      ) {
        toast.info(erro.response.data.mensagem, {
          position: "top-center",
        });
      } else {
        toast.error(erro.response.data.mensagem, {
          position: "top-center",
        });
      }
    }
  }
  async function AtualizarFeedBack(e, IdFeedback, usuarioIdFeedBa) {
    e.preventDefault();

    load2.current.style.display = "block";
    texto2.current.style.display = "none";
    setDisabilitado2(true);
    const token = localStorage.getItem("TokenGameSnack");
    if (!token) {
      load2.current.style.display = "none";
      texto2.current.style.display = "block";
      setDisabilitado2(false);
      toast.info("faça login pra atualizar o seu feedback");
      return;
    }
    try {
      const response = await api.put(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/atualizar/feedbacks/${IdFeedback}`,
        {
          IdLogado: User._id,
          usuarioIdFeedBa,
          novoFeed: novo.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(response.data.mensagem, {
        position: "top-center",
      });

      PegarFeedBacks();
      texto2.current.style.display = "block";
      load2.current.style.display = "none";
      setDisabilitado2(false);
      novo.current.value = "";
    } catch (erro) {
      texto2.current.style.display = "block";
      load2.current.style.display = "none";
      setDisabilitado2(false);

      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  async function RemoverFeedBack(IdFeedback, usuarioIdFeedBa) {
    const token = localStorage.getItem("TokenGameSnack");
    if (!token) {
      toast.info("faça login pra eliminar o seu feedback");
      return;
    }
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/remover/feedbacks/${IdFeedback}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            IdLogado: User._id,
            usuarioIdFeedBa,
          },
        },
      );

      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      PegarFeedBacks();
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  function aumentar() {
    feedback.current.style.height = "auto";
    feedback.current.style.height = feedback.current.scrollHeight + "px";
  }

  useEffect(() => {
    PegarFeedBacks();
    GetUser();
  }, []);
  return (
    <div className="AreaFeedBacks">
      <h1>Sua opinião faz a diferença!</h1>
      <p>
        Compartilhe sua experiência com nossos produtos e com o site. Seu
        feedback ajuda outros clientes a fazerem a melhor escolha e nos permite
        melhorar cada vez mais. Leva apenas alguns minutos!
      </p>
      <p>
        Ajude-nos a melhorar! Avalie sua experiência no site com uma nota de 1 a
        5 estrelas. <i class="bi bi-star-fill"></i>
      </p>
      <ul>
        {feedbacks.length > 0 ? (
          feedbacks
            .slice()
            .reverse()
            .map((fee) => (
              <li>
                <div className="primieiro">
                  <img src={fee.foto} alt="" />
                  <h2>{fee.nome}</h2>
                  <h4>{dayjs(fee.updatedAt).fromNow()}</h4>
                </div>
                <div className="mensagem">
                  <div>
                    <p>{fee.feedback}</p>
                    <strong>
                      {Array.from({ length: fee.estrelas }, (index) => (
                        <i key={index} class="bi bi-star-fill"></i>
                      ))}
                    </strong>
                  </div>

                  {User && User._id === fee.usuarioId && (
                    <button
                      onClick={() => RemoverFeedBack(fee._id, fee.usuarioId)}
                    >
                      <i class="bi bi-trash2-fill"></i>
                    </button>
                  )}
                </div>
                {User && User._id === fee.usuarioId && (
                  <div className="editar">
                    <p>
                      <i class="bi bi-pen-fill"></i> atualize o seu feedback!
                    </p>
                    <form
                      onSubmit={(e) =>
                        AtualizarFeedBack(e, fee._id, fee.usuarioId)
                      }
                    >
                      <input
                        type="text"
                        ref={novo}
                        placeholder="adicione o novo feedback pra atualizarmos"
                      />
                      <button
                        disabled={disabilitado2}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            AtualizarFeedBack(e, fee._id, fee.usuarioId);
                          }
                        }}
                      >
                        <p ref={texto2}>
                          <i class="bi bi-send-fill"></i>
                        </p>
                        <h3 className="load" ref={load2}>
                          <i class="bi bi-arrow-repeat"></i>
                        </h3>
                      </button>
                    </form>
                  </div>
                )}
              </li>
            ))
        ) : (
          <h3 className="sem">ainda sem opniões dos clientes</h3>
        )}
      </ul>
      <form id="form" onSubmit={AdicionarFeedBack}>
        <textarea
          placeholder="digite o sua opinião sobre o site"
          ref={feedback}
          onInput={aumentar}
        ></textarea>
        <select ref={estrela}>
          <option value="">selecione a quantidade de estrelas</option>
          <option value="1">⭐ 1 Estrela</option>
          <option value={"2"}>⭐⭐ 2 Estrelas</option>
          <option value={"3"}>⭐⭐⭐ 3 Estrelas</option>
          <option value={"4"}>⭐⭐⭐⭐ 4 Estrelas</option>
          <option value={"5"}>⭐⭐⭐⭐⭐ 5 Estrelas</option>
        </select>
        <button disabled={disabilitado}>
          <p ref={texto}>
            <i class="bi bi-send-fill"></i>
          </p>
          <h3 className="load" ref={load}>
            <i class="bi bi-arrow-repeat"></i>
          </h3>
        </button>
      </form>
    </div>
  );
}

export default AreaFeedbacks;
