## TechLive Hands-On - TypeScript, Apollo, MongoDB e Redis
Esse é o repositório com o código utilizando durante o hands-on da talk do dia 03/06 com a galera presente na live do TechLive.

### Estrutura da aplicação
O código fonte está em contigo `src` e os testes em [`__tests__`](/__tests__). Os arquivos `*.json` na raíz do projeto são de configuração do *JavaScript* (package.json), *TypeScript* (tsconfig.json) e um "código de conduta" para escrita de código (tslint.json). O arquivo auxiliar [`jest.config.js`](/jest.config.js) faz a integração do `jest` com o *TypeScript* e torna a elaboração e execução de testes mais fácil.

Por fim, [`.nvmrc`](/.nvmrc) define a versão do *NodeJS* utilizada enquanto o [`Makefile`](/Makefile) disponibiliza uma série de comandos úteis.

### Como usar
Para instalar o conjunto de dependências, utilize:
```
make install
```
Lembrando que o NodeJS deve estar instalado na máquina. Recomendo o uso do [nvm](https://github.com/nvm-sh/nvm) para isolar a instalação de diferentes versões do *NodeJS*.

Para rodar a bateria de testes, basta utilizar:
```
make test
```
e a cobertura de testes pode ser coletada executando
```
make coverage
```

Para verificar se o código está escrito conforme as regras definidas em `tslint.json`, utilize:
```
make lint
```

Para buildar a aplicação e gerar a pasta `dist` com o código fonte gerado, utilize:
```
make build
```

Por fim, para finalmente executar a aplicação, basta utilizar:
```
make start
```

A aplicação irá rodar na porta configurada padrão `127.0.0.0:5000` e o *playground* do Apollo GraphQL pode ser encontrado em `127.0.0.0:5000/graphql`.

### Configurações
As configurações da aplicação estão em arquivos no formato `.yaml` dentro da pasta `config`. Cada arquivo é utilizado em um ambiente que é controlado pela variável de ambiente `NODE_ENV` que pode assumir os valores de: "sandbox", "test", "production" ou "development".

Mais configurações podem ser livremente criadas nos arquivos e acessadas via uma chamada a `config.get(...)`.

Para setar uma determinada configuração via variável de ambiente, basta criar a variável correspondente em `custom-environment-variables`.

### MongoDB
A aplicação utiliza uma instância MongoDB que esteja rodando localmente na porta `27017` e cria a *collection* `graphql`.

Para os testes, uma instância diferente deve estar rodando na porta `27018`. Lembrando que ambas as configurações podem ser alteradas para o servidor de sua preferência nos [arquivos de configuração](/config).

Para visualizar as *collections* e documentos inseridos, basta utilizar o `Mongo Express`. É fácil de instalar e de usar.

### Redis
A aplicação utiliza uma instância Redis que esteja rodando localmente na porta `6379`.

Para os testes, a mesma instância é utilizada. As configurações também podem ser alteradas nos [arquivos de configuração](/config), inclusive podendo utilizar uma instância diferente para os testes.

> PS: recomendo utilizar o Docker tanto para o MongoDB quanto Redis. Basta acessar o site `docker hub` e procurar pelas imagens e como executar. Não esqueça de externalizar a porta do *container* para que ele seja acessível externamente.

### Desafios
Alguns desafios perfeitamente possíveis de serem executados e adicionados ao projeto:
- Criar esquema de autenticação - pode ser bem simples com token estático (fácil);
- Criar um *hook* para logar quaisquer erros do GraphQL. Dica: ao instaciar o ApolloServer tem como ser criado o *hook* (fácil);
- Aumentar o schema com mais *resolvers* e *types* (médio);
- Criar `decorator` de cache para os métodos (médio);
- Separar as responsabilidades dos resolvers e torná-los mais escaláveis (médio);
- Criar sua própria implementação de `datasource`, tirando a lógica de cache do provider e deixando-o como responsabilidade apenas o acesso a dados (difícil).

### Considerações finais
Agradeço a oportunidade de abrir espaço para essa conversa e fiquei muito feliz com o feedback. Espero que apreciem o conteúdo e sintam-se a vontade para efetuar alterações e até mesmo melhorar esse projeto.

Qualquer dúvida, basta abrir uma [`issue`](https://github.com/cavalcantigor/techlive-hands-on/issues) ou, se preferir, pode me contatar.

https://cavalcantigor.github.io/

**Links mostrados na apresentação**
- https://github.com/luizalabs/teresa - Ferramenta que facilita o deploy de aplicações para clusters Kubernetes.
- https://github.com/luizalabs/lasier - Implementação aberta de uma biblioteca de `circuit break` para python que funciona de maneira sícrona e assíncrona.
- https://medium.com/luizalabs - Medium do LuizaLabs onde são publicados os mais diversos textos com os mais diversos temas.
- https://medium.com/luizalabs/evolu%C3%A7%C3%A3o-covid-19-no-brasil-f44a58453914 - Texto que fala sobre como o LuizaLabs tem usado dados para se preparar frente à pandemia de Covid-19.
- https://www.cabecadelab.com.br/ - Podcast do LuizaLabs.
- http://carreiras.magazineluiza.com.br/ - Portal com oportunidades de trabalho no Magazine Luiza (incluindo o LuizaLabs).
- https://www.apollographql.com/docs/apollo-server/ - Documentação do Apollo Server.
- https://www.digite.com/swiftkanban/ - Ferramenta utilizada pelos times do LuizaLabs para gerenciar as squads.