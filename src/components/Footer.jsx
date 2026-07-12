import "../styles/Footer.css";
import Logo from "../assets/GameSnack imagens/NovaPasta/logoGameSnack.webp";
function Footer() {
  return (
    <footer className="Footer">
      <div className="enCima">
        <div className="D">
          <img src={Logo} alt="" />
          <h1>Diversão e sabor em um só lugar.</h1>
        </div>
        <div className="E">
          <ul>
            <li
              style={{
                "--corFundo": "linear-gradient(45deg, white, red)",
              }}
            >
              <a href="mailto:gamesnack@gmail.com" target="_blank">
                <span className="Icone">
                  <i class="bi bi-envelope-at-fill"></i>
                </span>
                <span className="Texto">email</span>
              </a>
            </li>
            <li
              style={{
                "--corFundo": " linear-gradient(45deg, #1877f2, #42a5f5)",
              }}
            >
              <a
                href="https://www.facebook.com/gilson.gil.886071"
                target="_blank"
              >
                <span className="Icone">
                  <i class="bi bi-facebook"></i>
                </span>
                <span className="Texto">facebook</span>
              </a>
            </li>

            <li
              style={{
                "--corFundo":
                  " linear-gradient( 45deg,#f58529,#feda77,#dd2a7b,#8134af,#515bd4)",
              }}
            >
              <a href="https://www.instagram.com/gilson_gil7/" target="_blank">
                <span className="Icone">
                  <i class="bi bi-instagram"></i>
                </span>
                <span className="Texto">instagram</span>
              </a>
            </li>

            <li
              style={{
                "--corFundo": "linear-gradient(45deg, #25d366, #128c7e)",
              }}
            >
              <a href="https://wa.me/244937490810" target="_blank">
                <span className="Icone">
                  <i class="bi bi-whatsapp"></i>
                </span>
                <span className="Texto">whatsapp</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="enBaixo">
        <div className="funcionamento">
          <h2>horario de funcionamento</h2>
          <p>Segunda a Sexta: 08h00 - 18h00</p>
          <p>Sábado: 08h00 - 14h00</p>
          <p>Domingo: Fechado</p>
        </div>
        <div className="loc">
          <h2>nossa localização</h2>
          <p>Angola-Lunda/Gamek a direita</p>
        </div>
        <p>© 2026 GameSnack. Todos os direitos reservados.</p>
        <p className="por">
          site desenvolvido e criado por{" "}
          <a
            id="EUu"
            href="https://github.com/gilsongillazaro-cyber"
            target="_blank"
          >
            <i class="bi bi-github"></i> gilson gil
          </a>{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
