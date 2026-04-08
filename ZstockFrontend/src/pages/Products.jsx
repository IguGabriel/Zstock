import { useEffect, useState } from "react";
import api from "../api/api";

function Products({ sidebarMode = false, mainMode = false }) {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    sku: "",
    category: "",
    storage_type: "",
    unit: "",
    minimum_stock: "",
    price: "",
    supplier_id: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setErrorMessage("");
    setSuccessMessage("");

    const productData = {
      code: formData.code,
      name: formData.name,
      description: formData.description || null,
      sku: formData.sku,
      category: formData.category,
      storage_type: formData.storage_type,
      unit: formData.unit,
      minimum_stock: Number(formData.minimum_stock),
      price: formData.price ? Number(formData.price) : null,
      supplier_id: formData.supplier_id ? Number(formData.supplier_id) : null
    };

    try {
      await api.post("/products/", productData);

      setSuccessMessage("Produto cadastrado com sucesso!");

      setFormData({
        code: "",
        name: "",
        description: "",
        sku: "",
        category: "",
        storage_type: "",
        unit: "",
        minimum_stock: "",
        price: "",
        supplier_id: ""
      });

      loadProducts();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);

      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage("Erro ao cadastrar produto.");
      }
    }
  }

  if (sidebarMode) {
    return (
      <div className="side-card">
        <h2 className="side-card-title">Cadastrar Produto</h2>

        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="storage_type"
            placeholder="Tipo de armazenamento"
            value={formData.storage_type}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="unit"
            placeholder="Unidade"
            value={formData.unit}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="minimum_stock"
            placeholder="Estoque mínimo"
            value={formData.minimum_stock}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="supplier_id"
            placeholder="ID do fornecedor"
            value={formData.supplier_id}
            onChange={handleChange}
          />

          <button type="submit" className="primary-button">
            Cadastrar
          </button>
        </form>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    );
  }

  if (mainMode) {
    const lowStockProducts = products.filter(
    (product) =>
      product.minimum_stock !== null &&
      product.current_stock < product.minimum_stock
      );

      const normalStockProducts = products.filter(
        (product) =>
          product.minimum_stock === null ||
          product.current_stock >= product.minimum_stock
      );

      return (
      <>
        <div className="page-header">
          <h1 className="page-title">Produtos</h1>
          <p className="page-description">
            Cadastre e gerencie os produtos do estoque.
          </p>
        </div>
        <div className="summary-grid">
          <div className="summary-card">
            <span className="summary-label">Total de produtos</span>
            <strong className="summary-value">{products.length}</strong>
          </div>

          <div className="summary-card alert">
            <span className="summary-label">Estoque baixo</span>
            <strong className="summary-value">{lowStockProducts.length}</strong>
          </div>

          <div className="summary-card success-card">
            <span className="summary-label">Estoque normal</span>
            <strong className="summary-value">{normalStockProducts.length}</strong>
          </div>
        </div>

        <div className="content-card">
          <h2 className="content-card-title">Lista de Produtos</h2>

          {products.length === 0 ? (
            <p className="empty-state">Nenhum produto cadastrado.</p>
          ) : (
            <div className="products-table">
              <div className="products-table-header">
                <span>Produto</span>
                <span>SKU</span>
                <span>Estoque</span>
              </div>

              {products.map((product) => {
                const isLowStock =
                  product.minimum_stock !== null &&
                  product.current_stock < product.minimum_stock;

                return (
                  <div
                    key={product.id}
                    className={`products-table-row ${
                      isLowStock ? "low-stock" : ""
                    }`}
                  >
                    <div className="product-main-info">
                      <strong>{product.name}</strong>
                      <p>SKU: {product.sku}</p>

                      {isLowStock && (
                        <span className="stock-badge">
                          ⚠ Estoque baixo (mín: {product.minimum_stock})
                        </span>
                      )}
                    </div>

                    <div className="product-sku-col">{product.sku}</div>

                    <div className="product-stock-col">
                      {product.current_stock}

                      {isLowStock && (
                        <span className="stock-warning-dot"></span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }

  return null;
}

export default Products;