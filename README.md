# To‑Do App — Projeto em Grupo ( DEVCORE )

Uma lista de tarefas feita a muitas mãos, com foco em **simplicidade**, **rapidez** e um toque **ambiental**: cores inspiradas em natureza (verdes, céu, terra) e uma UX que evita desperdício (menos cliques, menos fricção).

> **Integrantes**  
> Catarine Formiga de Farias · Valmer Benedito Mariano · Cassia Deiro Brito Mota · Paola Pontes

---

## Stack & Cores das Tecnologias
**Linguagens/Frameworks usados** (com suas cores oficiais, para badges/temas):

- **TypeScript** — `#3178C6`  
- **React** — `#61DAFB`  
- **Vite** — primária `#646CFF`, acento `#FFD62E`  
- **Tailwind CSS** — `#06B6D4`  
- **TwinCSS / twin.macro** — sugerido `#DB2777` (magenta)  

Badges (opcionais) — cole no topo se quiser:

```md
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=0B1E2D)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![twin.macro](https://img.shields.io/badge/twin.macro-DB2777)
```

---

## Paleta do Projeto (tema natureza)
Use como referência em Tailwind/Twin:

- **Primário (Verde/Emerald)**: `#10B981` (`emerald-500`)  
- **Primário escuro (Mata)**: `#065F46` (`emerald-800`)  
- **Acento (Céu)**: `#0EA5E9` (`sky-500`)  
- **Aviso (Sol/Terra clara)**: `#F59E0B` (`amber-500`)  
- **Perigo (Fruto/Vermelho)**: `#DC2626` (`red-600`)  
- **Neutros (Rochas/Noite)**: `#0F172A` (`slate-900`), `#CBD5E1` (`slate-300`), `#F8FAFC` (`slate-50`)  

Exemplos rápidos (Tailwind/Twin):
```jsx
<button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 shadow">
  Salvar
</button>
<div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl" />
```

---

## O que o app faz
- Criar, editar, concluir e remover tarefas
- Filtro (todas | pendentes | concluídas)
- Persistência local (`localStorage`)
- Diálogos de confirmação **sem duplicar** (com locks)  
- Bloqueio de edição para tarefas concluídas

---

## Como baixar e rodar no VS Code

### 1) Pré‑requisitos
- **Node.js** LTS ≥ 18 (`node -v`)
- **Git** (`git --version`)
- **VS Code** instalado (recomendo extensões *ESLint*, *Tailwind CSS IntelliSense*)

### 2) Clonar o repositório
```bash
git clone <URL_DO_REPO>.git todo-app
cd todo-app
```
> Troque `<URL_DO_REPO>` pela URL real do seu projeto (GitHub/GitLab/Bitbucket).

### 3) Abrir no VS Code
```bash
code .
```

### 4) Instalar dependências
Use **pnpm** (recomendado) ou npm/yarn.
```bash
pnpm install
# ou
yarn install
# ou
npm install
```

### 5) Rodar em desenvolvimento (Vite)
```bash
pnpm dev
# ou yarn dev / npm run dev
```
Abra o navegador na URL exibida (geralmente `http://localhost:5173`).

### 6) Build e preview
```bash
pnpm build
pnpm preview
# ou yarn build/preview • npm run build/preview
```

---

## TwinCSS / Tailwind (dica rápida)
- Se usar **twin.macro**, mantenha babel/plugin configurado e importe `tw`/`css` conforme sua convenção.  
- Se usar **Tailwind puro**, garanta os *content paths* no `tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{ts,tsx}"],
```

---

## Estrutura sugerida
```
src/
 ├─ components/
 │   ├─ TaskInput.tsx
 │   ├─ TaskItem.tsx
 │   └─ TaskList.tsx
 ├─ utils/
 │   ├─ confirmAction.ts
 │   └─ date.ts
 ├─ types.ts
 ├─ App.tsx
 └─ main.tsx
```

---

## Notas de UX sustentável
- Um único modal de confirmação por ação (sem repetição)  
- Estados claros (rótulos, foco, Enter/Escape)  
- Visual limpo para reduzir “ruído” cognitivo  

Feito com carinho pelo grupo 💚. Se quiser, adicione capturas de tela com tema claro/escuro para mostrar a paleta em ação!

