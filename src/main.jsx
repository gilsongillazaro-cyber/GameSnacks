import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CarrinhoProvider } from "./CarrinhoContext.jsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <CarrinhoProvider>
    <App />
    <Analytics />
  </CarrinhoProvider>,
);
