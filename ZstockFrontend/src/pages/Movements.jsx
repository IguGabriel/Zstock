import { useEffect, useState } from "react";
import api from "../api/api";

function Movements() {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    product_id: "",
    user_id: "",
    movement_type: "ENTRY",
    quantity: "",
    reason: "",
    notes: ""
  });

  async function loadProducts() {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setErrorMessage("Não foi possível carregar os produtos.");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const movementData = {
      product_id: Number(formData.product_id),
      user_id: Number(formData.user_id),
      movement_type: formData.movement_type,
      quantity: Number(formData.quantity),
      reason: formData.reason,
      notes: formData.notes || null
    };

    try {
      const response = await api.post("/stock-movements/", movementData);

      setSuccessMessage(response.data.message || "Movimentação realizada com sucesso.");

      setFormData({
        product_id: "",
        user_id: "",
        movement_type: "ENTRY",
        quantity: "",
        reason: "",
        notes: ""
      });

      loadProducts();
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);

      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Erro ao registrar movimentação.");
      }
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Movimentações</h1>
        <p className="page-description">
          Registre entradas e saídas de estoque com controle e rastreabilidade.
        </p>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h2 className="content-card-title">Registrar Movimentação</h2>

          <form onSubmit={handleSubmit} className="product-form">
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Estoque atual: {product.current_stock}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="user_id"
              placeholder="ID do usuário"
              value={formData.user_id}
              onChange={handleChange}
              required
            />

            <select
              name="movement_type"
              value={formData.movement_type}
              onChange={handleChange}
              required
            >
              <option value="ENTRY">Entrada</option>
              <option value="EXIT">Saída</option>
            </select>

            <input
              type="number"
              name="quantity"
              placeholder="Quantidade"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="reason"
              placeholder="Motivo"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="notes"
              placeholder="Observações"
              value={formData.notes}
              onChange={handleChange}
            />

            <button type="submit" className="primary-button">
              Registrar movimentação
            </button>
          </form>

          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="content-card">
          <h2 className="content-card-title">Estoque Atual</h2>

          {products.length === 0 ? (
            <p className="empty-state">Nenhum produto encontrado.</p>
          ) : (
            <div className="list">
              {products.map((product) => (
                <div key={product.id} className="list-item">
                  <strong>{product.name}</strong>
                  <p>SKU: {product.sku}</p>
                  <p>Estoque atual: {product.current_stock}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Movements;