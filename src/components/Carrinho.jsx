import "../styles/Carrinho.css";
import { useContext, useRef } from "react";
import { CarrinhoContext } from "../CarrinhoContext";
import { toast } from "react-toastify";
import api from "../services/api";
function Carrinho({ fechar }) {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const load = useRef();
  const texto = useRef();
  function fech() {
    fechar(false);
  }
  function fech2(e) {
    if (e.target.className === "Carrinho") {
      fechar(false);
    }
  }
  async function FinalizarEncomenda() {
    load.current.style.display = "block";
    texto.current.style.display = "none";
    try {
      const token = localStorage.getItem("TokenGameSnack");
      if (!token) {
        toast.warning("faça login pra fazer encomenda", {
          position: "top-center",
        });
        load.current.style.display = "none";
        texto.current.style.display = "block";
        return;
      }
      const Eu = await api.get(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const foto = Eu.data.perfil.foto;
      const n = Eu.data.perfil.nome;
      const nome = Eu.data.perfil.nomeUsuario;
      const total = carrinho.reduce((acumulador, item) => {
        return acumulador + item.preco * item.quantidade;
      }, 0);
      const encomendas = carrinho;
      const response = await api.post(
        `${import.meta.env.VITE_MinhaApi_Rota_User}/encomendar`,
        {
          foto,
          nome,
          total,
          encomendas,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const numero = "244937490810";
      const mensagem = `Olá pessoal da GameSnack! sou o ${n} e...
      Gostaria de fazer uma encomenda dos seguintes produtos:
      
      Itens da encomenda: 
      ${encomendas.map(
        (car, index) => `${index + 1}° ${car.nome}
      Quantidade: ${car.quantidade}
      Preço:${car.preco.toLocaleString("pt-ao", { style: "currency", currency: "aoa" })}
      `,
      )}

      Total:${total.toLocaleString("pt-ao", {
        style: "currency",
        currency: "AOA",
      })}

      Aguardo a confirmação da disponibilidade dos produtos.

Obrigado!
      `;

      toast.success(response.data.mensagem, {
        position: "top-center",
      });
      load.current.style.display = "none";
      texto.current.style.display = "block";
      setCarrinho([]);
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
      window.location.href = url;
    } catch (erro) {
      load.current.style.display = "none";
      texto.current.style.display = "block";
      toast.error(erro.response.data.mensagem, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="Carrinho" onClick={fech2}>
      <button id="fechar2" onClick={fech}>
        <i class="bi bi-x"></i>
      </button>
      <div className="container">
        <h1>
          <i class="bi bi-cart-fill"></i> seu carrinho
        </h1>
        <h2>
          total acumulado:
          <span>
            {" "}
            <i class="bi bi-piggy-bank-fill"></i>
            {carrinho
              .reduce((acumulador, item) => {
                return acumulador + item.preco * item.quantidade;
              }, 0)
              .toLocaleString("pt-Ao", { style: "currency", currency: "aoa" })}
          </span>
        </h2>
        <p>
          total de itens no carrinho:{" "}
          <span className="iii">
            {" "}
            <i class="bi bi-sd-card-fill"></i>
            {carrinho.length}
          </span>
        </p>
        <div className="total">
          <button onClick={FinalizarEncomenda}>
            <p ref={texto}>finalizar encomenda</p>
            <h2 className="load" ref={load}>
              <i className="bi bi-arrow-repeat"></i>
            </h2>
          </button>
        </div>
        <ul>
          {carrinho.length > 0 ? (
            carrinho.map((item) => (
              <li key={item.id}>
                <img src={item.foto} alt="" />
                <div className="detalhes">
                  <p>
                    <span>nome</span>: {item.nome}
                  </p>
                  <p>
                    <span>preco</span>:{" "}
                    {item.preco.toLocaleString("pt-ao", {
                      style: "currency",
                      currency: "aoa",
                    })}
                  </p>
                  <p>
                    <span>subtotal</span>:
                    {(item.preco * item.quantidade).toLocaleString("pt-ao", {
                      style: "currency",
                      currency: "aoa",
                    })}
                  </p>
                </div>
                <div className="bo">
                  <button
                    onClick={() => {
                      setCarrinho(
                        carrinho
                          .map((car) =>
                            car.id === item.id
                              ? { ...car, quantidade: car.quantidade - 1 }
                              : car,
                          )
                          .filter((car) => car.quantidade > 0),
                      );
                    }}
                  >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <span className="quanti"> {item.quantidade}</span>
                  <button
                    onClick={() => {
                      setCarrinho(
                        carrinho.map((car) =>
                          car.id === item.id
                            ? {
                                ...car,
                                quantidade: car.quantidade + 1,
                              }
                            : car,
                        ),
                      );
                    }}
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
                <button
                  className="remover"
                  onClick={() => {
                    setCarrinho(carrinho.filter((car) => car.id !== item.id));
                  }}
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </li>
            ))
          ) : (
            <h3 className="sem">sem itens nos carrinho</h3>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Carrinho;
