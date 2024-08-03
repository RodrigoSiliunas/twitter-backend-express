# Twitter Simulado com Express.js

**Descrição:**

Este repositório contém o código de uma API feita com Node.js, desenvolvida com o framework Express.js, que simula um site de microblogging similar ao Twitter. A API oferece funcionalidades básicas como:

* **Cadastro de usuários:** Permite criar novos usuários.
* **Login de usuários:** Permite autenticar usuários existentes, com sistema JWT.
* **Publicação de tweets:** Permite que usuários publiquem seus próprios tweets.
* **Trending topics:** Retorna uma lista com os assuntos mais populares (trending topics) no momento.

**Tecnologias Utilizadas:**

* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js.
* **Sequelize.js:** Framework ORM para criação de modelos de dados e manipulação de banco.
* **SQLite3:** Banco de dados utilizado para armazenar informações.

**Observações:**

* **Conceitos REST:** A API utiliza alguns conceitos do REST, como a definição de rotas para diferentes recursos (usuários, tweets, etc.). No entanto, a implementação não é totalmente RESTful, deixei de lado tópicos importantes para entregar o trabalho com agilidade.
* **Response codes:** Os códigos de resposta HTTP não foram escolhidos de forma rigorosa para cada rota.
* **Funcionalidades básicas:** A API oferece um conjunto básico de funcionalidades para simulação um Twitter simplificado.

**Como Utilizar:**
1. **Clonar o repositório:**
  ```bash
  git clone https://github.com/RodrigoSiliunas/twitter-backend-express.git
  cd twitter-backend-express
  ```
2. **Instalar as dependências:**
  ```bash
  npm install
  node main.js
  ```
3. **Iniciar o servidor:**
  ```bash
  node main.js
  ```

**Estrutura do Projeto:**
* **routes:** Contém os arquivos de definição das rotas da API.
* **models:** Contém os modelos de dados (usuários, tweets, etc.).
* **controllers:** Contém a lógica de negócio da API.
