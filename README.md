# Flight Deck API Dashboard

## Apresentacao rapida

Demo online: https://uso-de-api.onrender.com/

Dashboard full-stack desenvolvido para demonstrar integracao com API real, tratamento de dados no backend e entrega de uma interface moderna e responsiva no frontend.

### Destaques para recrutador

- API externa real (SpaceX v4) consumida no backend
- Node.js + TypeScript no servidor com agregacao e cache
- Frontend em JavaScript puro com visualizacao de metricas e historico
- Arquitetura simples, clara e pronta para evolucao

### O que este projeto evidencia

- Capacidade de transformar dados de API em visao executiva
- Separacao de responsabilidades entre backend e frontend
- Qualidade de entrega para portfolio tecnico (documentacao + deploy)

## Como foi construido

1. O backend consulta diferentes endpoints da API da SpaceX e normaliza os dados em um unico payload para o dashboard.
2. O servidor aplica uma camada de cache de 10 minutos para reduzir latencia e chamadas repetidas na API externa.
3. O frontend consome apenas um endpoint interno (`/api/dashboard`) e renderiza os blocos de interface com JavaScript puro.
4. O deploy foi configurado no Render para publicacao continua a partir do repositorio GitHub.

## Resultados do projeto

- Aplicacao online em ambiente publico: https://uso-de-api.onrender.com/
- Build de producao validado com TypeScript (`npm run build`)
- Endpoint principal validado em runtime (`/api/dashboard`)
- Estrutura pronta para evolucao (camada de dados no backend + camada de apresentacao no frontend)

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