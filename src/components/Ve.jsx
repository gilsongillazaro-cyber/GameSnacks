import "../styles/Ve.css";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";

function Ve() {
  useEffect(() => {
    ScrollReveal().reveal(".vL", {
      origin: "bottom",
      duration: 2000,
      interval: 200,
      distance: "90px",
    });
  });
  return (
    <div className="ve">
      <ul>
        <li className="vL">
          <i class="bi bi-shield-fill-check"></i>
          <h1>pagamentos</h1>
          <p>100% seguros</p>
        </li>
        <li className="vL">
          <i class="bi bi-truck"></i>
          <h1>entregas rapidas</h1>
          <p>24h por dia</p>
        </li>
        <li className="vL">
          <i class="bi bi-fork-knife"></i>
          <h1>snacks originais</h1>
          <p>100% saborosos</p>
        </li>
      </ul>
    </div>
  );
}
export default Ve;
