# Flight Deck API Dashboard

Projeto de dashboard full-stack desenvolvido para demonstrar consumo de API externa, organizacao de dados no backend e experiencia visual no frontend.

## Visao geral

- Backend em Node.js com TypeScript e Express
- Frontend em JavaScript, HTML e CSS servidos pelo proprio servidor
- Consumo da API publica da SpaceX para exibir indicadores de operacao, proximos lancamentos e historico de missoes
- Interface responsiva, pronta para apresentacao em repositorio e avaliacao tecnica

## Stack

- Node.js
- TypeScript
- JavaScript
- Express
- API publica: https://api.spacexdata.com/v4

## Funcionalidades

- Cards com metricas principais da SpaceX
- Destaque para o proximo lancamento com contagem de tempo restante
- Grafico de lancamentos por ano
- Ranking de uso por foguete
- Lista dos ultimos lancamentos com status de sucesso ou falha
- Cache simples no backend para reduzir chamadas repetidas a API externa

## Como executar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Aplicacao disponivel em `http://localhost:3000`.

### 3. Gerar build de producao

```bash
npm run build
```

### 4. Iniciar build compilada

```bash
npm start
```

## Estrutura

```text
.
|-- public/
|   |-- app.js
|   |-- index.html
|   \-- styles.css
|-- src/
|   \-- server.ts
|-- .gitignore
|-- package.json
|-- README.md
\-- tsconfig.json
```

## Decisoes tecnicas

- O backend centraliza a comunicacao com a API externa e entrega ao frontend um payload pronto para renderizacao.
- O frontend foi mantido em JavaScript puro para mostrar dominio da base web sem depender de framework.
- O layout busca um visual mais forte e apresentavel para portfolio, sem abrir mao da leitura e da responsividade.

## Observacao para recrutadores

Este repositorio foi pensado para evidenciar:

- integracao com API real
- organizacao de projeto full-stack
- separacao entre camadas de dados e interface
- cuidado com apresentacao visual e documentacao