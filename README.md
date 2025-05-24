# 📘 FAQ Manager

Aplicação web para gerenciamento de perguntas frequentes (FAQ), com funcionalidades de **visualização**, **adição**, **edição** e **remoção** de perguntas. Desenvolvida com React e Material UI, utilizando **JSON Server** como backend mockado.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [JSON Server](https://github.com/typicode/json-server)

---

## ⚙️ Funcionalidades

- ✅ Visualizar lista de perguntas frequentes
- ➕ Adicionar novas perguntas
- ✏️ Editar perguntas existentes
- 🗑️ Deletar perguntas com confirmação
- 🔐 Altenticação obrigatória para editar e excluir
- 📱 Interface responsiva para dispositivos móveis

---

## 🔐 Autenticação

Para editar ou deletar perguntas, é necessário autenticar-se com as seguintes credenciais:

- **Login:** `admin`  
- **Senha:** `123`

A autenticação é realizada de forma simples no frontend (sem backend real).

---

## 📦 Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências do projeto

```bash
npm install
```

### 3. Inicie o JSON Server com os dados mockados

```bash
npx json-server --watch db.json --port 3001
```

> Isso iniciará a API mock em: http://localhost:3001

### 4. Inicie o servidor React

```bash
npm start
```

> Ou, se estiver usando Vite:

```bash
npm run dev
```

> A aplicação será executada em: http://localhost:3000

---

## 📦 Estrutura de Arquivos (simplificada)

```
📦 src
├── 📁 components
│   ├── Ask.jsx
│   └── Header.jsx
├── 📁 pages
│   ├── Home.jsx
│   ├── AddFaq.jsx
│   └── EditFaq.jsx
├── App.jsx
├── routes.jsx
└── ...
db.json
```

---

## 💡 Observações

- A autenticação é mockada no frontend e serve apenas para simulação.
- Os dados são armazenados localmente no arquivo `db.json`.
- Recomendado para prototipagem ou testes locais.
