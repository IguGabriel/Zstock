# 📦 ZStock

Sistema web de controle de estoque desenvolvido para gerenciar produtos, registrar movimentações e visualizar histórico com foco em organização, regras de negócio e experiência de uso.

---

## 🧠 Sobre o projeto

O **ZStock** foi desenvolvido como um projeto de portfólio com o objetivo de simular um sistema real de gestão de estoque.

A aplicação permite:
- cadastrar produtos
- registrar entradas e saídas
- acompanhar o estoque atual
- visualizar o histórico de movimentações

Além disso, o sistema implementa regras de negócio importantes e apresenta indicadores visuais para facilitar a tomada de decisão.

---

## ⚙️ Funcionalidades

- Cadastro de produtos
- Listagem de produtos com estoque atual
- Registro de movimentações (entrada e saída)
- Histórico completo de movimentações
- Filtro por produto
- Dashboard com resumo do estoque
- Alerta visual para estoque baixo
- Validações no backend

---

## 📊 Regras de negócio

- Não permite movimentação sem motivo
- Não permite estoque negativo
- SKU e código do produto são únicos
- Saídas não podem exceder o estoque disponível
- Produtos abaixo do estoque mínimo são sinalizados automaticamente

---

## 🖥️ Tecnologias utilizadas

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Uvicorn

### Frontend
- React
- Vite
- Axios
- CSS
