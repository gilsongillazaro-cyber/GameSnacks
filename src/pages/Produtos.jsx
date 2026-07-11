import "../styles/Produtos.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import Cima from "../components/Cima";
import Ve from "../components/Ve";
import Jogos from "../components/Jogos";
import Snacks from "../components/Snacks";
function Produtos() {
  return (
    <div className="Produtos">
      <Header />
      <Jogos />
      <Snacks />
      <Cima />
      <Ve />
      <Footer />
    </div>
  );
}

export default Produtos;
