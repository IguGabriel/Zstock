import { useEffect, useState } from "react";
import api from "../api/api";

function History() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  async function loadMovements() {
    try {
      const response = await api.get("/stock-movements/");
      setMovements(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      setErrorMessage("Erro ao carregar histórico.");
    }
  }

  async function loadProducts() {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    loadMovements();
    loadProducts();
  }, []);

  function getProductName(productId) {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Produto não encontrado";
  }

  const filteredMovements = selectedProductId
    ? movements.filter((mov) => mov.product_id === Number(selectedProductId))
    : movements;

  const sortedMovements = [...filteredMovements].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Histórico</h1>
        <p className="page-description">
          Visualize o histórico completo das movimentações do estoque.
        </p>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Histórico de Movimentações</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="filter-box">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Todos os produtos</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {sortedMovements.length === 0 ? (
          <p className="empty-state">Nenhuma movimentação encontrada.</p>
        ) : (
          <div className="list">
            {sortedMovements.map((mov) => (
              <div key={mov.id} className="history-item">
                <div className="history-top">
                  <strong>{getProductName(mov.product_id)}</strong>
                  <span
                    className={
                      mov.movement_type === "ENTRY"
                        ? "badge badge-entry"
                        : "badge badge-exit"
                    }
                  >
                    {mov.movement_type === "ENTRY" ? "Entrada" : "Saída"}
                  </span>
                </div>

                <div className="history-details">
                  <p><strong>Quantidade:</strong> {mov.quantity}</p>
                  <p><strong>Motivo:</strong> {mov.reason}</p>
                  <p><strong>Data:</strong> {new Date(mov.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default History;