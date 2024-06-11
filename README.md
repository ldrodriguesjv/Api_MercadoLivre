# Desafio final:  
React faz com que a criação de UIs interativas seja uma tarefa fácil. Crie views simples para cada estado na sua aplicação, e o React irá atualizar e renderizar de forma eficiente apenas os componentes necessários na medida em que os dados mudam. 

A empresa `E-Commerce Ltda` deseja melhorar a experiência de seus clientes ao exibir suas ofertas diárias. Atualmente, os produtos em promoção não são facilmente acessíveis e a empresa acredita que uma interface amigável e intuitiva pode aumentar significativamente as vendas diárias. Eles decidiram criar uma página web que consome a API de ofertas diárias do Mercado Livre e exibe os produtos de forma organizada e atrativa.

Criar uma página web simples usando React que consome uma API de ofertas diárias (Mercado Livre), utiliza componentização e hooks (useState, useEffect), e exibe os dados das ofertas em uma interface amigável. A aplicação deve fazer uma requisição GET ao carregar a página tratando possíveis erros com try/catch.

## Sobre a API 
A API sugerida é [API do mercado livre](https://developers.mercadolivre.com.br/pt_br/ofertas-do-dia) contudo desde que sejam atendidos todos os os objetivos, outra API pode ser usada.

- Guia de Uso da API de Ofertas do Dia do Mercado Livre
  
Requisitos:

:warning: Access Token: Um token de acesso autorizado é necessário para fazer requisições à API.

~~~javascript 

// URL da API
const apiUrl = 'https://api.mercadolibre.com/seller-promotions/promotions/DOD-MLB1000/items?promotion_type=DOD&app_version=v2';

// Token de acesso
const accessToken = 'SEU_ACCESS_TOKEN';

export async function fetchOffers() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    // Implemeta o retorno dos dados das ofertas
  } catch (error) {
    //implementa o erro
  }
}

~~~

A resposta da API incluirá um objeto JSON com os detalhes das promoções, conforme mostrado abaixo:

~~~JSON

{
   "results": [
       {
           "id": "MLB3500438494",
           "start_date": "2023-04-20T00:00:00",
           "finish_date": "2023-04-20T23:59:59",
           "status": "candidate",
           "price": 3900,
           "original_price": 4000,
           "max_discounted_price": 3960,
           "min_discounted_price": 1200,
           "stock": {
                 "min": 1,
                 "max": 5
             }
       },
       {
           "id": "MLB833682552",
           "start_date": "2023-04-20T00:00:00",
           "finish_date": "2023-04-20T23:59:59",
           "status": "candidate",
           "price": 4900,
           "original_price": 5000,
           "max_discounted_price": 4960,
           "min_discounted_price": 2200,
           "stock": {
                 "min": 1,
                 "max": 5
             }
       },
       {
           "id": "MLB915917360",
           "start_date": "2023-04-20T00:00:00",
           "finish_date": "2023-04-20T23:59:59",
           "status": "candidate",
           "price": 5900,
           "original_price": 6000,
           "max_discounted_price": 5960,
           "min_discounted_price": 3200,
           "stock": {
                 "min": 1,
                 "max": 5
             }
       }
   ],
   "paging": {
       "offset": 0,
       "limit": 50,
       "total": 3
   }
}


~~~


##  :computer: Objetivos

- Aplicar conceitos sobre fazer uma requisição assíncrona: Utilizando fetch para realizar uma requisição GET assíncrona à API do Mercado Livre.
- Aplicar conceitos sobre tratamento de erros: Implementar um bloco try/catch para capturar e tratar possíveis erros durante a requisição.
- Aplicar conceitos sobre exibição de dados: Utilizar o estado do React (useState) para armazenar e exibir os dados das ofertas na página HTML.
- Aplicar conceitos sobre componentização: Criar componentes React reutilizáveis, como OfferList e OfferItem, para estruturar e exibir as ofertas de forma organizada.
- Aplicar conceitos sobre hooks do React: Utilizar useState para gerenciar o estado das ofertas e useEffect para realizar a requisição à API quando o componente for montado.
- Aplicar conceitos sobre renderização condicional: Utilizar a lógica de renderização condicional para exibir mensagens de carregamento e erros quando a requisição estiver em andamento ou quando ocorrer algum erro.
- Aplicar conceitos sobre manipulação de eventos: Utilizar o evento onClick em um botão para permitir ao usuário buscar novamente as ofertas manualmente.
- Aplicar conceitos sobre estilização com CSS: Utilizar arquivos CSS para estilizar os componentes, como OfferList e OfferItem, de forma a tornar a apresentação das ofertas mais agradável e intuitiva para o usuário.


##  :white_check_mark: Critérios de aceitação

Requisição Assíncrona

- [ ]   A aplicação deve fazer uma requisição assíncrona à API do Mercado Livre usando fetch.
A requisição deve ser do tipo GET para obter os dados das ofertas do dia.
Tratamento de Erros

- [ ] O código deve utilizar o bloco try/catch para capturar possíveis erros durante a requisição.
Caso ocorra um erro na requisição, a aplicação deve exibir uma mensagem amigável para o usuário informando o problema.
Exibição dos Dados

- [ ] Os dados das ofertas devem ser armazenados no estado do componente usando useState.
A aplicação deve exibir as ofertas em uma página HTML de forma organizada e legível para o usuário.
Componentização

- [ ] A aplicação deve ser estruturada em componentes React reutilizáveis e bem organizados.
Os componentes devem incluir pelo menos um componente para listar as ofertas (OfferList) e um componente para exibir cada oferta individualmente (OfferItem).
Hooks do React

- [ ] Os hooks do React, como useState e useEffect, devem ser utilizados para gerenciar o estado e efeitos colaterais no componente.
Renderização Condicional

- [ ] A aplicação deve utilizar lógica de renderização condicional para exibir mensagens de carregamento durante a requisição e mensagens de erro em caso de falha na requisição.
Manipulação de Eventos

- [ ] Utilizar arquivos CSS para estilizar os componentes e melhorar a apresentação visual das ofertas na página.
A estilização deve seguir boas práticas de design e tornar a experiência do usuário mais agradável.

- [ ] Um README que fornece instruções sobre como configurar e executar o projeto de exibição de ofertas do Mercado Livre utilizando React.

###  :rocket: Hacker edition:

Funcionalidades extras para quem deseja um desafio maior:

- Adicione opções de filtro na interface para permitir que o usuário filtre as ofertas por categoria. Por exemplo, categorias como eletrônicos, moda, casa e jardim, entre outras.
Implemente a lógica necessária para aplicar os filtros selecionados aos dados das ofertas e exibir apenas as ofertas que correspondem aos filtros escolhidos.


## Dicas de layout

O design do  [Figma](https://www.figma.com/design/SciqrAaQfF03m3HsZbzNLz/Clon-MercadoLibre---UI-Kit-%7C-Ema-Lozada-(Community)?node-id=0-1&t=pP4gGO2MVHbQ5nBO-1) é uma ótima fonte de inspiração para criar uma página web com um layout moderno e funcional. Aqui estão algumas dicas de layout e UI que você pode considerar ao elaborar sua página:

- Espaçamento Adequado: Garanta um espaçamento adequado entre os elementos para uma experiência visual confortável. Isso inclui espaçamento entre linhas de texto, margens ao redor de blocos de conteúdo e distância entre botões e outros elementos interativos.

- Tipografia Legível: Escolha fontes legíveis e em tamanhos apropriados para diferentes tipos de texto (títulos, parágrafos, botões). A consistência na tipografia ajuda na coesão visual da página.

- Cores Harmoniosas: Utilize uma paleta de cores harmoniosa que transmita a mensagem da sua marca e facilite a leitura e a navegação. Considere o contraste entre texto e fundo para garantir uma boa legibilidade.

- Ícones Significativos: Integre ícones relevantes que ajudem os usuários a entender rapidamente a função de diferentes elementos, como menus, botões de ação e links.

- Elementos Interativos: Torne os elementos interativos, como botões e links, visualmente distintos para que os usuários saibam que podem interagir com eles. Efeitos de hover e feedback visual ao clicar em botões podem melhorar a experiência do usuário.

- Responsividade: Certifique-se de que o layout seja responsivo, ou seja, que se adapte bem a diferentes tamanhos de tela, incluindo dispositivos móveis. Isso inclui o ajuste de tamanhos de fonte, reorganização de elementos e priorização de conteúdo importante.

- Navegação Intuitiva: Projete uma navegação intuitiva e fácil de usar, com menus claros e hierarquia de páginas que guie os usuários de forma eficiente pelo seu site.


Links:

[React](https://pt-br.legacy.reactjs.org/)
[Hooks](https://pt-br.legacy.reactjs.org/)
[Consumindo Api](https://www.devmedia.com.br/consumindo-uma-api-com-react-js-e-axios/42900)

Dicas: 

- Atente se aos Critérios de Aceitação: Antes de começar a projetar, atente-se claramente os critérios de aceitação do seu projeto. Priorize o MVP (Produto Mínimo Viável): Ao desenvolver sistema concentre-se nos elementos essenciais que proporcionam valor imediato aos usuários. Isso ajuda a evitar excessos e garante que seu MVP seja funcional e relevante.
- Revisite os projetos anteriores em React em que foram construídos para relemebrarconceitos como estados de componentes (por exemplo, estados hover, focus, active), manipulação de eventos (como onClick), propriedades (props) para personalização (por exemplo, tipo de botão, cor, tamanho), e a importância da acessibilidade na criação de botões interativos.


