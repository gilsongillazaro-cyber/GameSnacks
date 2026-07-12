import "../styles/Sobre.css";
import BoloNoPote from "../assets/GameSnack imagens/NovaPasta/boloNoPote.webp";
import Jogos from "../assets/GameSnack imagens/NovaPasta/PlayStation.webp";
import pipoca from "../assets/GameSnack imagens/NovaPasta/pipoca.webp";
import gelado from "../assets/GameSnack imagens/NovaPasta/geldosgourmet.webp";
import logo from "../assets/GameSnack imagens/NovaPasta/logoGameSnack.webp";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";
import { toast } from "react-toastify";
function Sobre() {
  useEffect(() => {
    ScrollReveal().reveal(".direita", {
      origin: "left",
      distance: "40px",
      duration: 2000,
      reset: true,
    });
    ScrollReveal().reveal(".esquerda", {
      origin: "rigth",
      distance: "40px",
      duration: 2000,
      reset: true,
      delay: 500,
    });

    ScrollReveal().reveal(".h1P", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
    });

    ScrollReveal().reveal(".Pl", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
      delay: 700,
    });
    ScrollReveal().reveal(".Gg", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      delay: 900,
      reset: true,
    });
    ScrollReveal().reveal(".PG", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      delay: 1100,
      reset: true,
    });
    ScrollReveal().reveal(".Bp", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
      delay: 1300,
    });

    ScrollReveal().reveal(".qualidade", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
      delay: 700,
    });
    ScrollReveal().reveal(".honestidade", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      delay: 900,
      reset: true,
    });
    ScrollReveal().reveal(".respeito", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      delay: 1100,
      reset: true,
    });
    ScrollReveal().reveal(".compromisso", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
      delay: 1300,
    });
    ScrollReveal().reveal(".inovacao", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      delay: 1500,
      reset: true,
    });
    ScrollReveal().reveal(".excelencia", {
      origin: "bottom",
      distance: "90px",
      duration: 2000,
      reset: true,
      delay: 1700,
    });
  }, []);
  return (
    <div className="sobre">
      <div className="resumo">
        <div className="direita">
          <img src={logo} alt="" />
        </div>
        <div className="esquerda">
          <h1>Sobre a GameSnack</h1>
          <p>
            A GameSnack é um negócio dedicado a proporcionar momentos de
            diversão e sabor para todas as idades. Reunimos entretenimento e
            deliciosos produtos em um só lugar, oferecendo aluguel de jogos de
            PlayStation, gelados gourmet, pipocas gourmet e bolos no pote.
          </p>
          <p>
            Nossa missão é tornar cada momento mais especial, seja para relaxar
            com os amigos, animar uma festa ou simplesmente desfrutar de um
            lanche saboroso. Trabalhamos com produtos de qualidade e buscamos
            sempre oferecer um atendimento rápido, amigável e confiável.
          </p>
        </div>
      </div>
      <div className="ofertas">
        <h1 className="h1P">O que oferecemos</h1>
        <ul>
          <li className="Pl">
            <img src={Jogos} id="pla" alt="" />
            <h2>Jogos da PlayStation</h2>
          </li>

          <li className="Gg">
            <img src={gelado} alt="" />
            <h2>Gelados Gourmet</h2>
          </li>

          <li className="PG">
            <img src={pipoca} alt="" />
            <h2>Pipocas Gourmet</h2>
          </li>

          <li className="Bp">
            <img src={BoloNoPote} alt="" />
            <h2>Bolos no Pote</h2>
          </li>
        </ul>
      </div>
      <div className="valores">
        <h1 className="h1P">Nossos Valores</h1>
        <ul>
          <li
            className="qualidade"
            onClick={() => {
              toast.info(
                "Qualidade é o nosso compromisso em entregar produtos e serviços que atendam aos mais altos padrões, garantindo confiança, durabilidade e satisfação em cada detalhe.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-patch-check-fill"></i> <p>Qualidade</p>
          </li>
          <li
            className="honestidade"
            onClick={() => {
              toast.info(
                "Honestidade é a base de todas as nossas relações. Agimos com transparência, ética e integridade em cada decisão e atendimento.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-shield-fill-check"></i> <p>Honestidade</p>
          </li>
          <li
            className="respeito"
            onClick={() => {
              toast.info(
                "Respeito ao Cliente significa ouvir, compreender e valorizar cada cliente, oferecendo um atendimento cordial, justo e personalizado.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-person-hearts"></i> <p>Respeito ao cliente</p>
          </li>
          <li
            className="compromisso"
            onClick={() => {
              toast.info(
                "Compromisso representa a nossa dedicação em cumprir o que prometemos, assumindo responsabilidades e buscando sempre os melhores resultados.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-calendar2-event-fill"></i> <p>Compromisso</p>
          </li>
          <li
            className="inovacao"
            onClick={() => {
              toast.info(
                "Inovação é a busca constante por novas ideias, soluções e tecnologias para oferecer mais eficiência, qualidade e valor aos nossos clientes.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-lightbulb-fill"></i> <p>Inovação</p>
          </li>
          <li
            className="excelencia"
            onClick={() => {
              toast.info(
                "Excelência no Atendimento é atender com rapidez, simpatia e profissionalismo, proporcionando uma experiência positiva em cada contato.",
                {
                  position: "top-center",
                },
              );
            }}
          >
            <i class="bi bi-trophy-fill"></i> <p>Excelência no atendimento</p>
          </li>
        </ul>
      </div>

      <div className="maiss">
        <h1 className="h1P">Nossa Missão</h1>
        <p>
          Oferecer diversão e sabor com qualidade, praticidade e preços
          acessíveis.
        </p>
        <h1 className="h1P">Nossa Visão</h1>
        <p>
          Ser uma referência em entretenimento e snacks gourmet, conquistando a
          confiança e a satisfação dos nossos clientes.
        </p>
      </div>
    </div>
  );
}

export default Sobre;
