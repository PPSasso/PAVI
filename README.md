# Liquid Galaxy Breakout 

  O jogo Breakout foi desenvolvido pela Atari e lançado em 13 de maio de 1976, seus principais idealizadores foram a dupla Nolan Bushnell e Steve Bristow, que tiveram a ideia de seguir o sucesso do fenômeno Pong, porém com a experiência de apenas um jogador.  

![breakoutClassico](https://github.com/PPSasso/PAVI/blob/master/breakout_classico.jpg)

  A sua simplicidade é um dos principais motivos do jogo ser tão viciante. O jogo consiste em um retângulo controlado pelo jogador que rebate uma bolinha, que por sua vez quebra os blocos da tela ao acertá-los. Caso o jogador consiga quebrar todos os blocos, ele ganha. Caso a bolinha caia, ele perde.  
  
  O projeto atual tem como objetivo a criação de um jogo baseado no próprio Breakout, porém implementando a tecnologia multi-tela multi-usuário. A ideia é que o usuário a partir de uma tela inicial escolha entre duas opções de renderização, hospedar a tela do jogo em si ou se juntar a um jogo a partir de um dispositivo móvel com acesso ao controle responsável por mover o jogador. 
  
  A princípio a capacidade é de 2 jogadores simultâneos, cada um com sua respectiva bola compartilhando o mesmo objetivo de destruir o maior número de blocos. O jogador com maior pontuação vence. 
  
  Uma inspiração para o projeto é a tecnologia e os projetos desenvolvidos pelo Liquid Galaxy, que é um projeto de código aberto criado pela Google em 2008. 

  Para acompanhamento do histórico de commits do nipple e implementação do websocket consultar o repositorio: https://github.com/GabrielHammermeister/socket-server.

  ## Instalação:
Para a instalação do projeto serão utilizadas duas tecnologias que devem estar baixadas na sua máquina, Node.js (https://nodejs.org/en/download/), Git(https://git-scm.com/downloads).

  - Copiar a URL remota do repositório "https://github.com/PPSasso/PAVI.git"
  - Utilizando a linha de comando, navegar até o diretório onde deseja armazenar o projeto dentro de sua máquina e enviar o comando "git clone https://github.com/PPSasso/PAVI.git"
  - Com o projeto aberto retornar a linha de comando e digitar "npm install" para instalar todas a dependencias do projeto.
  - Em seguida digitar "npm install yarn --global" para habilitar gerenciador de pacotes yarn.
  - Digitar na linha de comando "yarn start-dev" para hospedar o projeto na porta Localhost:8000.
  - Dentro de seu navegador, utilizar a rota "http://localhost:8000/screen" para renderizar o jogo, ou utilizar a rota "http://localhost:8000/controller" para renderizar o controle.
  - Agora é só se divertir! :smile:

