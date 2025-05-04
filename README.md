## 🚀 Rodando o Frontend (Next.js) em Desenvolvimento

### ✅ Requisitos

- Node.js **v20+**
- NPM **v9+**
- Backend rodando localmente em `http://localhost:8000`

### ⚙️ Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

```bash
npm install

```bash
cp .env.example .env

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aqui

```bash
openssl rand -base64 32

```bash
npm run dev