# Readable Project

O Readable é um projeto acadêmico desenvolvido no curso [Desenvolvedor React](https://br.udacity.com/course/react-nanodegree--nd019/) 
da [Udacity](https://br.udacity.com/). Esse projeto foi desenvolvido utilizando a metodologia de desenvolvimento TDD e a técnica de refatoração para gerar um código limpo e componentes reutilizáveis através do ReactJS.

## Visão geral do projeto
Aplicativo web de conteúdo e comentários. Permitirá que os usuários postem conteúdo em categorias pré-definidas, façam comentários em suas próprias postagens e nas de outros usuários e votem nas postagens e comentários. Os usuários poderão editar e excluir postagens e comentários usando o **Redux** para gerenciar o estado de seu aplicativo
<p align="center">
  <img src="https://raw.githubusercontent.com/brolam/reactnd-readable/master/docs/homepage-screen.png" width="900" />
</p>  

## Instalando e iniciando o servidor de testes
* Entrar na pasta api-server `cd api-server`
* Instalar as dependências `npm install`
* Iniciar o servidor `npm start`
* Manter a janela de comandos aberta.

## Instalando e iniciando o aplicativo Readable
* Abrir uma nova janela de comandos e entrar na pasta front-end `cd front-end`
* Instalar as dependências `npm install`
* Iniciar o aplicativo `npm start`
* Executando os casos de testes `npm test`
* Visualizando a cobertura dos testes `npm run test-coverage`

## Estutura do projeto
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md
├── package.json 
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    |── components # Organizar todos os componentes reutilizáveis do aplicativo;
    │   ├──__tests__ # Organizar todos os testes do aplicativo;
    ├── App.js # Componente principal do aplicativo;
    ├── ReadableAPI.js # API para fornecer as informações dos posts, comentários e categorias;
    ├── store # Gerenciar o estado do aplicativo utilizando o Redux
    │   ├── index.js # Fornecer uma instância da store configurada com os reduces e middlewares.
    │   ├── actions.js # Organizar todas as actions da store.
    │   ├── reducers.js # Organizar todos os reducers da store.
    │   └── middlewares.js # Realizar as requisições na ReadableAPI antes de executar os reducers.
    ├── jest.setup.js # Configurar o ambiente de testes e disponibilizar dados e mocks para todos os testes do aplicativo.
    ├── routes.js # Organizar as funcionalidades de tratamentos das rotas conforme as URL válidas para o aplicativo.
    └── index.js
```

## Relatório de cobertura dos testes.
<p align="center">
  <img src="https://raw.githubusercontent.com/brolam/reactnd-readable/master/docs/report-coverage-test.png" width="900" />
</p>  

## Por que este projeto?
Esta estrutura de conteúdo e comentários é comum em um grande número de sites, desde sites de notícias até blogs, passando por agregadores, como o Hacker News e o Reddit. Construindo este projeto, você compreenderá como o **Redux** pode funcionar em um tipo muito comum de aplicativo.