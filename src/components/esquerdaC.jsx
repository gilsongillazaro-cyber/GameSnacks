import "../styles/EsquerdaC.css";
import { useRef, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { toast } from "react-toastify";
import api from "../services/api";
function EsquerdaC() {
  useEffect(() => {
    ScrollReveal().reveal(".EsquerdaC", {
      duration: 2000,
      origin: "right",
      distance: "90px",
      reset: true,
      delay: 500,
    });
  }, []);
  const digitador = useRef();
  const numero = "244937490810";
  function aumentar() {
    digitador.current.style.height = "auto";
    digitador.current.style.height = digitador.current.scrollHeight + "px";
  }
  async function enviarDesejo(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("faça login pra fazer pedidos", {
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
      if (digitador.current.value === "") {
        toast.warning("digite o que deseja antes de enviar", {
          position: "top-center",
        });
        return;
      }
      const Data = new Date();
      const hora = Data.getHours();
      let comprimento = "";
      if (hora >= 0 && hora < 12) {
        comprimento = "bom dia";
      }
      if (hora >= 12 && hora <= 17) {
        comprimento = "boa tarde";
      }
      if (hora >= 18 && hora <= 23) {
        comprimento = "boa noite";
      }
      const mensagem = digitador.current.value;
      const Methorado = `Olá, equipa da GameSnack!
${comprimento}! Espero que estejam bem.
Vi os produtos do vosso site e
Gostaria de fazer este pedido:
----------------
 Pedido: ${mensagem}
 Cliente: ${MeuDados.data.perfil.nomeUsuario}
----------------
Localização de entrega:`;
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(Methorado)}`;
      window.open(url, "_blank");
      digitador.current.value = "";
    } catch (erro) {
      toast.error("erro ao mandar pedido", {
        position: "top-center",
      });
    }
  }
  function Enviar(e) {
    if (e.key === "Enter") {
      enviarDesejo(e);
    }
  }
  return (
    <form className="EsquerdaC">
      <h1>Faça já a sua encomenda!</h1>
      <textarea
        placeholder="Escreva os produtos que deseja ou deixe a sua mensagem..."
        onInput={aumentar}
        ref={digitador}
        onKeyDown={Enviar}
      ></textarea>
      <button onClick={enviarDesejo}>enviar</button>
    </form>
  );
}
export default EsquerdaC;
