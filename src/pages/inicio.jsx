import Header from "../components/header";
import Topo from "../components/Topo";
import Sobre from "../components/Sobre";
import AlgunsItens from "../components/AlgunsItens";
import AreaFeedbacks from "../components/AreaFeddbacks";
import Footer from "../components/Footer";
import api from "../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "../styles/inicio.css";
function Inicio() {
  const [itens, seItens] = useState([]);
  async function PegarItens() {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/produtos`,
      );

      seItens(response.data.produtos);
    } catch (erro) {
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    PegarItens();
  }, []);
  return (
    <div className="inicio">
      <Header />
      <Topo />
      <Sobre />
      <AlgunsItens itens={itens} atualizar={PegarItens} />
      <AreaFeedbacks />
      <Footer />
    </div>
  );
}

export default Inicio;
