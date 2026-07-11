import "../styles/DireitaC.css";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
function DiritaC() {
  useEffect(() => {
    ScrollReveal().reveal(".DireitaC", {
      duration: 2000,
      origin: "left",
      distance: "90px",
      reset: true,
    });
  }, []);
  return (
    <div className="DireitaC">
      <ul>
        <li>
          <a href="tel:+244937490810">
            <div className="icone">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div className="conteudo">
              <h1>telefone</h1>
              <p>937490810</p>
            </div>
          </a>
        </li>
        <li>
          <a href="https://wa.me/244937490810" target="_blank">
            <div className="icone">
              <i class="bi bi-whatsapp"></i>
            </div>
            <div className="conteudo">
              <h1>whatsapp</h1>
              <p>937490810</p>
            </div>
          </a>
        </li>

        <li>
          <a href="https://www.instagram.com/gilson_gil7/" target="_blank">
            <div className="icone">
              <i class="bi bi-instagram"></i>
            </div>
            <div className="conteudo">
              <h1>instagram</h1>
              <p>@gamesnack</p>
            </div>
          </a>
        </li>

        <li>
          <a href="https://www.facebook.com/gilson.gil.886071" target="_blank">
            <div className="icone">
              <i class="bi bi-facebook"></i>
            </div>
            <div className="conteudo">
              <h1>facebook</h1>
              <p>@gamesnack</p>
            </div>
          </a>
        </li>
        <li>
          <a href="mailto:gamesnack@gmail.com" target="_blank">
            <div className="icone">
              <i class="bi bi-envelope-at-fill"></i>
            </div>
            <div className="conteudo">
              <h1>email</h1>
              <p>gamesnack@gmail.com</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
export default DiritaC;
