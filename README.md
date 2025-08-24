# To‑Do App — Projeto em Grupo (Grupo 12 · DEVCORE)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=0B1E2D)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![twin.macro](https://img.shields.io/badge/twin.macro-DB2777)

> **Integrantes**  
> Catarine Formiga de Farias · Valmer Benedito Mariano · Cassia Deiro Brito Mota · Paola Pontes

---

## Stack & Tecnologias

- **TypeScript**
- **React**
- **Vite**
- **Tailwind CSS**
- **TwinCSS / twin.macro**

---

## Funcionalidades do App

- Criar, editar, concluir e remover tarefas
- Filtro de visualização (todas | pendentes | concluídas)
- Persistência local via `localStorage`
- Diálogos de confirmação com bloqueio para evitar duplicações
- Edição bloqueada para tarefas já concluídas

---

## Como rodar o projeto no VS Code

### 1) Pré‑requisitos

- Node.js LTS ≥ 18 (`node -v`)
- Git (`git --version`)
- VS Code (recomenda-se extensões *ESLint* e *Tailwind CSS IntelliSense*)

### 2) Clonar o repositório

```bash
git clone <https://github.com/valmmer/projeto-7/>.git todo-app
cd todo-app

3) Abrir no VS Code
code .

4) Instalar dependências

pnpm install
# ou
yarn install
# ou
npm install

5) Rodar em modo desenvolvimento

pnpm dev
# ou yarn dev / npm run dev

6) Build e preview
pnpm build
pnpm preview
# ou yarn build/preview • npm run build/preview

Estrutura sugerida

src/
 ├─ components/
 │   ├─ Counters.tsx
 │   ├─ Filters.tsx
 │   ├─ TaskInput.tsx
 │   ├─ TaskItem.tsx
 │   ├─ TaskList.tsx
 │   └─ ThemeToggle.tsx
 ├─ utils/
 │   ├─ confirmAction.ts
 │   └─ date.ts
 ├─ types.ts
 ├─ App.tsx
 └─ main.tsx

TwinCSS / Tailwind (dica rápida)
- Se usar twin.macro, mantenha o plugin Babel configurado e importe tw/css conforme sua convenção.
- Se usar Tailwind puro, garanta os content paths no tailwind.config.js:

Contribuição
Este projeto é colaborativo e aberto a melhorias. Sinta-se à vontade para abrir issues ou pull requests com sugestões, correções ou novas funcionalidades.

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
Feito com dedicação pelo Grupo 12 — DEVCORE 
