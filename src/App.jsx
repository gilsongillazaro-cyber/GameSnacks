import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Inicio from "./pages/inicio";
import Produtos from "./pages/Produtos";
import Contactos from "./pages/Contactos";
import Favoritos from "./pages/Favoritos";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import dayjs from "dayjs";
import "dayjs/locale/pt.js";
dayjs.locale("pt");
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/produtos" element={<Produtos />}></Route>
        <Route path="/contactos" element={<Contactos />}></Route>
        <Route path="/favoritos" element={<Favoritos />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
