# 📦 ZStock

Sistema web de controle de estoque com cadastro de produtos, movimentações e histórico, desenvolvido com FastAPI, React e PostgreSQL.

---

## 🧠 Sobre o projeto

O **ZStock** foi desenvolvido como projeto de portfólio com o objetivo de simular um sistema real de gestão de estoque.

A aplicação permite:
- cadastrar produtos
- registrar entradas e saídas
- acompanhar o estoque atual
- visualizar histórico de movimentações

Além disso, o sistema implementa regras de negócio e indicadores visuais para facilitar a tomada de decisão.

---

## 🖼️ Demonstração

### 📦 Gestão de Produtos
![Produtos](docsProdutos.png)

### 🔄 Movimentações de Estoque
![Movimentações](docs/Movements.png)

### 📊 Histórico de Movimentações
![Histórico](docs/Historico.png)

---

## ⚙️ Funcionalidades

- Cadastro de produtos
- Listagem com estoque atual
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

---

## 🧩 Estrutura do projeto

```bash
zstock/
├── backend/
├── ZstockFrontend/
└── docs/
🚀 Como executar
🔹 Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Crie um arquivo .env com base no .env.example.

🔹 Frontend
cd ZstockFrontend
npm install
npm run dev
🔐 Variáveis de ambiente

Crie um arquivo .env no backend:

DATABASE_URL=postgresql://usuario:senha@localhost:5432/zstock_db
📈 Melhorias futuras
Autenticação de usuários
Controle de permissões
Edição e exclusão de produtos
Dashboard com métricas mais completas
Deploy da aplicação
🎯 Objetivo

Demonstrar habilidades em desenvolvimento full stack, integração entre frontend e backend, modelagem de dados e aplicação de regras de negócio em um sistema de gestão.

👨‍💻 Autor

Desenvolvido por Igor Gabriel
