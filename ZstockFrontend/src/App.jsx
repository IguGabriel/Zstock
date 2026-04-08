import { useState } from "react";

import Products from "./pages/Products.jsx";
import Movements from "./pages/Movements.jsx";
import History from "./pages/History.jsx";
import "./Style.css";

function App() {
  const [page, setPage] = useState("products");

  function renderPage() {
    if (page === "products") return <Products />;
    if (page === "movements") return <Movements />;
    if (page === "history") return <History />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-content">
          <p className="brand-tag">SISTEMA DE CONTROLE DE ESTOQUE</p>
          <h1 className="brand-title">📦 ZStock</h1>
          <p className="brand-subtitle">
            Gestão simples e eficiente de produtos e movimentações
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="page-layout">
          <aside className="left-column">
            <div className="side-card">
              <h2 className="side-card-title">Menu</h2>

              <button
                className={page === "products" ? "nav-button active" : "nav-button"}
                onClick={() => setPage("products")}
              >
                Produtos
              </button>

              <button
                className={page === "movements" ? "nav-button active" : "nav-button"}
                onClick={() => setPage("movements")}
              >
                Movimentações
              </button>

              <button
                className={page === "history" ? "nav-button active" : "nav-button"}
                onClick={() => setPage("history")}
              >
                Histórico
              </button>
            </div>

            {page === "products" && <Products sidebarMode />}
          </aside>

          <section className="center-column">
            {page !== "products" ? renderPage() : <Products mainMode />}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;