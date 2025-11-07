# Cinesix - Proj - Projeto React MVU - Documentação de Arquitetura

## Objetivo

Este projeto implementa uma arquitetura MVU (Model–View–Update) usando React + Vite + Tailwind, com foco em:

- Componentização escalável
- Fluxo de dados unidirecional
- Modularidade e manutenção fácil
- Suporte a múltiplas “Scenes” interativas

## Project Schema and Architeture (MVU)

🧩 Padrões de Arquitetura

```md
📦 cinesix-proj/
├──node_modules/...
│
├── 📁 public/
│ └── assets/
│ └── videos/ # Vídeos em MP4, WebM etc.
│
├── 📁 src/
│ ├── 📁 app/ # Núcleo do app (entrada, providers, roteamento)
│ │ ├── main.tsx
│ │ ├── App.tsx
│ │ └── router.tsx
│ │
│ ├── 📁 model/ # MODEL → definição do estado + tipos
│ │ ├── video.model.ts
│ │ ├── user.model.ts
│ │ └── index.ts
│ │
│ ├── 📁 update/ # UPDATE → lógica de mutação de estado
│ │ ├── video.update.ts
│ │ ├── user.update.ts
│ │ └── index.ts
│ │
│ ├── 📁 store/ # Store global + integração com Zustand/Redux
│ │ ├── createStore.ts
│ │ └── useAppStore.ts
│ │
│ ├── 📁 view/ # VIEW → componentes puros baseados no estado
│ │ ├── VideoPlayer/
│ │ │ ├── index.tsx
│ │ │ └── style.css
│ │ ├── Controls/
│ │ │ ├── index.tsx
│ │ │ └── style.css
│ │ └── Layout/
│ │ └── index.tsx
│ │
│ ├── 📁 data/ # Dados estáticos e mapas de navegação
│ │ └── videoMap.json
│ │
│ ├── 📁 hooks/ # Hooks auxiliares, se necessários
│ │ └── useVideoLogic.ts
│ │
│ ├── 📁 utils/ # Funções puras e helpers
│ │ └── time.ts
│ │
│ ├── 📁 styles/ # Tailwind + estilos globais
│ │ └── index.css
│ │
│ └── types.d.ts # Tipos globais se necessário
│
├── README.md
├── eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 vite.config.ts
```

```md
🗂️ Estrutura de Pastas
src/
├─ scenes/ # Todas as cenas do app
│ ├─ index.ts # Barril público agregando todas as scenes
│ ├─ \_internal/ # Código interno das scenes
│ │ ├─ \_init.ts # Inicialização de estado
│ │ ├─ \_update.ts # Funções puras de update
│ │ ├─ \_types.ts # Tipos TypeScript da scene
│ │ └─ index.ts # Barril interno
│ ├─ Scene01/
│ │ └─ Scene01.tsx # View pura da Scene01
│ ├─ Scene02/
│ │ └─ Scene02.tsx
│ └─ Scene03/
│ └─ Scene03.tsx
├─ core/ # Núcleo do app MVU
│ ├─ model.ts # Modelo global
│ ├─ update.ts # Atualizações globais
│ ├─ view.ts # Views globais / Layout
│ └─ app.tsx # Entrypoint do React
└─ main.tsx # Bootstrap do Vite
```

# MVU

## MVU (Model–View–Update) é aplicado a cada Scene:

Model: estado local ou global da cena
View: função pura React que recebe model e dispatch
Update: função pura que recebe model + msg → retorna novo estado

Exemplo de fluxo:
model → view(model, dispatch) → dispatch(msg) → update(model, msg) → model

---

# Padrão de exportações

Exportações nomeadas (export) são preferidas para Scenes, types, update e init.

Maior previsibilidade

Tipagem estática forte

Facilita construção de mapas/dicionários de scenes

Exemplo de Scene01:

// Scene01.tsx
export function Scene01({ model, dispatch }: Props) { ... }

// \_update.ts
export const \_update = (model: Scene01Model, msg: Scene01Msg) => { ... }

// index.ts (API pública)
export { Scene01 } from "./Scene01"
export { \_update as update } from "./\_update"

---

# \_internal vs index.ts

\_internal/: código interno da scene (init, update, types)

index.ts: API pública que o resto do app consome

Permite separar camada pública e implementação interna, mantendo ordem visual e clareza

---

# Barris (index.ts e \_index.ts)

Barris internos (\_index.ts) agregam exports internos para uso dentro do módulo

Barris públicos (index.ts) expõem apenas a API que outros módulos devem usar

Evita imports profundos (../../../\_update) e facilita reorganização

---

# Convenção de nomenclatura de variáveis

Prefixo Uso
_ Variável interna ou não usada intencionalmente
Sem _ Variável pública ou que deve ser consumida pelo app
Exemplo \_update, \_init, \_internalCache

---

# Componentes e Scenes

Cada Scene tem sua própria pasta (Scene01/)

O arquivo principal é sempre SceneXX.tsx (ou index.tsx para simplificar importações)

View é uma função pura:

Recebe model e dispatch

Sem efeitos colaterais diretos (use hooks fora se necessário)

---

# Organização de pastas para vídeos interativos

Scenes podem representar etapas de interação

Components reutilizáveis ficam em src/components/

Layouts globais em src/core/view.ts

Assets (vídeos, imagens) em src/assets/

---

# Convenções de importação

Sempre importar via barril, nunca via caminho profundo:

import { Scene01 } from "../scenes" // Correto
import { Scene01 } from "../scenes/Scene01/Scene01" // Evitar

Evita acoplamento e facilita refatoração

---

# Resumo de boas práticas

Nomear tudo de forma consistente

Separar API pública (index.ts) de implementação interna (\_internal/)

Usar export nomeado sempre que possível

Componentes React como funções puras

Scenes como unidades MVU isoladas

Pastas \_internal ou \_index.ts apenas para organização e encapsulamento

---

# Resultado esperado:

Código limpo, previsível e modular

Facilidade para adicionar novas scenes ou fluxos

Fluxo unidirecional de dados consistente

Escalabilidade e manutenibilidade garantida
