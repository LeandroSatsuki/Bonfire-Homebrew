# Extracao bruta: anao

## 1. Fonte analisada

- HTML usado: `Temp/Raças/Anões.html`
- Pasta auxiliar localizada: `Temp/Raças/Anões_files/`
- Natureza da fonte: fonte bruta temporaria salva localmente para revisao humana
- Data da extracao: `2026-05-19`

## 2. Resumo geral da raca

- Nome da raca: `Anao`
- Descricao resumida:
  Anaos sao apresentados como seres forjados nas entranhas do mundo pelos Primeiros Deuses, ligados a pedra, ao metal, a memoria ancestral, aos clas e a tradicao. A pagina mistura lore, tracos raciais base, escolhas internas de linhagem ou essencia e uma progressao longa de talentos raciais.
- Temas principais:
  - pedra, metal e forja
  - memoria ancestral
  - resistencia fisica
  - honra, cla e dever
  - sociedades subterraneas
  - divergencia entre linhagens e essencias
  - evolucao racial por talentos

## 3. Texto/lore extraido

### Visao geral narrativa

O texto apresenta os anaoes como seres "esculpidos", nao nascidos de ventre, com almas acesas a partir de brasas do nucleo do mundo. Seus imperios subterraneos sao descritos como labirintos vivos, com maravilhas arquitetonicas e memoria gravada em metal e pedra.

Tambem sao descritos como Guardioes da Memoria, mineradores, ferreiros, historiadores guerreiros, leais aos seus clas e impetuosos como uma forja em brasa. A tradicao e tratada como fundamento moral e civilizatorio.

### Interpretando um anao

O bloco "Interpretando um Anao" traz orientacoes de tom e papel:

- honra e palavra irrevogavel
- morte como retorno a "Pedra-Mae"
- pragmatismo seco e humor cinico
- respeito ao trabalho bem feito
- teimosia lendaria
- lealdade dificil de conquistar, mas profunda

### Sociedade e cultura

O bloco "Sociedade e Cultura" destaca:

- o cla acima do individuo
- hierarquia rigida por merito, idade e contribuicao
- ostracismo como punicao maxima
- rituais ligados a terra, canto harmonico e espiritos elementais
- tres grandes bastioes:
  - `Drumhuldar`
  - `Khazrundel`
  - `Ferlanden`

### Caracteristicas fisicas

Trechos identificados na lateral da pagina:

- estrutura ossea densa, ombros largos e musculatura compacta
- maos e pes grandes e calejados
- barbas longas e elaboradas para homens
- trancas complexas e pelos faciais finos para mulheres
- adornos geometricos, runas e pedras lapidadas

### Variacoes visuais de linhagem

Linhagem da Montanha:

- pele em tons de terra, bronze ou cobre curtido
- olhos castanhos escuros, pretos ou verde musgo

Linhagem das Profundezas:

- pele palida como marmore, cinza granito ou tons violaceos
- olhos grandes adaptados a escuridao, como violeta, vermelho palido ou branco leitoso

### Separacao entre lore e regra mecanica

Lore identificado:

- origem mitica dos anaoes
- papel social do cla
- valores culturais
- descricao das cidades
- aparencia fisica
- perfil das linhagens

Regra mecanica identificada:

- tracos da raca base
- escolha entre linhagem e essencia
- talentos raciais por nivel
- prerequisitos, usos, bonus, resistencias e referencias a condicoes, magias e testes

## 4. Tracos raciais base identificados

### Visao no Escuro Superior

- Nome: `Visao no Escuro Superior`
- Texto extraido ou resumido fielmente:
  alcance de 36 metros [120 pes]; enxerga na penumbra como luz plena e na escuridao como penumbra; nao distingue cores na escuridao, apenas tons de cinza
- Classificacao sugerida: `feature racial base`
- Parece automatizavel no Foundry: `sim`
- Observacoes mecanicas:
  parece mapear para senses, com darkvision acima do padrao comum
- Duvidas:
  - confirmar se o sistema aceita 120 pes diretamente em `system.senses.darkvision`

### Vigor e Robustez Ana

- Nome: `Vigor e Robustez Ana`
- Texto extraido ou resumido fielmente:
  concede resistencia a dano de Veneno, vantagem em testes de resistencia para evitar ou encerrar a condicao Envenenado e aumento de 1 no PV maximo, com mais 1 por nivel
- Classificacao sugerida: `feature racial base`
- Parece automatizavel no Foundry: `parcial`
- Observacoes mecanicas:
  mistura resistencia, vantagem condicional e aumento recorrente de PV por nivel
- Duvidas:
  - como modelar o aumento de PV maximo por nivel de forma segura no `dnd5e`
  - confirmar se a vantagem contra Envenenado fica melhor como efeito ou apenas texto

### Senso da Pedra

- Nome: `Senso da Pedra`
- Texto extraido ou resumido fielmente:
  como Acao Bonus, ganha Sentido Sismico com alcance de 18 metros [60 pes] por 10 minutos; exige contato com superficie de pedra; detecta localizacao exata de criaturas ou objetos em contato com a mesma superficie, inclusive Invisivel ou em escuridao total; usa numero de vezes igual ao Bonus de Proficiencia; recupera em Descanso Longo
- Classificacao sugerida: `feature racial base`
- Parece automatizavel no Foundry: `parcial`
- Observacoes mecanicas:
  tem duracao, usos por proficiencia, condicao de terreno e efeito de deteccao
- Duvidas:
  - confirmar se Tremorsense temporario cabe em activities, uses e effects do sistema
  - confirmar se a restricao "tocando pedra" sera so texto ou se exige apoio manual

## 5. Escolhas internas da raca

### Escolha principal: Linhagem ou Essencia

- Nome: `Divergencia Ancestral`
- Texto extraido ou resumido fielmente:
  na criacao do personagem, o jogador deve escolher uma Linhagem ou uma Essencia
- Classificacao sugerida:
  escolha racial base mutuamente exclusiva
- Automacao provavel:
  `parcial`
- Duvidas:
  - confirmar se isso vira advancement, feature de escolha, ou apenas processo manual no Foundry

### Linhagem da Montanha

- Nome: `Linhagem da Montanha`
- Texto extraido ou resumido fielmente:
  guardioes das cupulas altas, guerreiros de armadura pesada que vigiam os portoes da superficie
- Classificacao sugerida:
  escolha interna de linhagem
- Automacao provavel:
  `parcial`
- Duvidas:
  - confirmar como armazenar a escolha da linhagem no fluxo final da species

Tracos internos desta linhagem:

- `Estabilidade da Montanha`
  - resumo fiel:
    vantagem para evitar ser Empurrado ou Derrubado; armadura pesada nao reduz deslocamento mesmo sem a Forca normalmente necessaria
  - classificacao sugerida:
    feature de linhagem
  - automacao provavel:
    `parcial`
  - duvidas:
    - como tratar a parte da armadura pesada no sistema

- `Passo Rochoso`
  - resumo fiel:
    ignora terreno dificil causado por escombros, rochas soltas ou pedra irregular; vantagem em Atletismo para escalar superficies rochosas naturais ou trabalhadas
  - classificacao sugerida:
    feature de linhagem
  - automacao provavel:
    `parcial`
  - duvidas:
    - se o terreno dificil especifico sera apenas texto ou efeito parcial

### Linhagem das Profundezas

- Nome: `Linhagem das Profundezas`
- Texto extraido ou resumido fielmente:
  exploradores do submundo profundo, de pele palida e sentidos aguçados, acostumados ao silencio e a escuridao absoluta
- Classificacao sugerida:
  escolha interna de linhagem
- Automacao provavel:
  `parcial`
- Duvidas:
  - confirmar se o bonus ambiental exige so texto

Tracos internos desta linhagem:

- `Sentinela das Galerias`
  - resumo fiel:
    enquanto no subterraneo ou em ambientes de pedra fechados, vantagem em Percepcao e Sobrevivencia para detectar armadilhas de pedra, perigos ambientais naturais e passagens secretas
  - classificacao sugerida:
    feature de linhagem
  - automacao provavel:
    `nao`
  - duvidas:
    - bonus altamente contextual; provavelmente texto

- `Memoria da Rocha`
  - resumo fiel:
    ganha proficiencia em Historia; se ja for proficiente, adiciona o dobro do Bonus de Proficiencia em testes de Historia ligados a pedra, arquitetura ana, genealogia de clas ou cidades subterraneas
  - classificacao sugerida:
    feature de linhagem
  - automacao provavel:
    `parcial`
  - duvidas:
    - confirmar como tratar a parte de expertise contextual

### Essencias

- Nome: `Essencias`
- Texto extraido ou resumido fielmente:
  se escolher Essencia, nao recebe as caracteristicas da Linhagem da Montanha ou das Profundezas; a pagina aponta para links externos com os poderes concedidos
- Classificacao sugerida:
  escolha racial base alternativa
- Automacao provavel:
  `nao`
- Duvidas:
  - os poderes das essencias nao estao detalhados nesta fonte
  - ha dependencia direta de outras paginas

Essencias listadas:

- `Essencia Bestial`
- `Essencia Draconica`
- `Essencia Celestial`
- `Essencia Elemental`
- `Essencia Feerica`
- `Essencia Infernal`
- `Essencia Onirica`
- `Essencia Vampirica`
- `Essencia do Vazio`

## 6. Talentos raciais identificados

### Nivel 1+

#### Educacao Enanica

- Nome: `Educacao Enanica`
- Nivel minimo: `1+`
- Pre-requisitos explicitos:
  `Anao, Nivel 1+`
- Texto extraido ou resumido fielmente:
  ganha proficiencia em dois kits de ferramentas diferentes a escolha
- Classificacao sugerida: `talento racial`
- Automacao provavel: `sim`
- Duvidas mecanicas:
  - confirmar como o sistema registra dois tool proficiencies escolhidos

#### Historia Ana

- Nome: `Historia Ana`
- Nivel minimo: `1+`
- Pre-requisitos explicitos:
  `Anao, Nivel 1+`
- Texto extraido ou resumido fielmente:
  torna-se treinado em Religiao e em um Kit de Ferramentas a escolha; vantagem em testes de Historia relacionados a origem de anaoes e suas cidades
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - vantagem contextual em Historia provavelmente fica em texto

#### Familiaridade em Armamento Enanico

- Nome: `Familiaridade em Armamento Enanico`
- Nivel minimo: `1+`
- Pre-requisitos explicitos:
  `Anao, Nivel 1+`
- Texto extraido ou resumido fielmente:
  recebe proficiencia em Machados de Batalha, Machados de Mao, Martelos Leves e Martelos de Combate
- Classificacao sugerida: `talento racial`
- Automacao provavel: `sim`
- Duvidas mecanicas:
  - confirmar nomes equivalentes no `dnd5e`

#### Ligas de Aco Enanico

- Nome: `Ligas de Aco Enanico`
- Nivel minimo: `1+`
- Pre-requisitos explicitos:
  `Anao, Nivel 1+`
- Texto extraido ou resumido fielmente:
  ignora a reducao na Velocidade causada por qualquer armadura; se for Anao da Montanha, recebe +1,5 metros [+5 pes] de deslocamento de caminhada
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - como modelar a excecao para Anao da Montanha

#### Olhar para Tesouros

- Nome: `Olhar para Tesouros`
- Nivel minimo: `1+`
- Pre-requisitos explicitos:
  `Anao, Nivel 1+`
- Texto extraido ou resumido fielmente:
  pode gastar 1 minuto avaliando um objeto para descobrir valor monetario exato e se e de origem ana; vantagem em testes de Inteligencia para avaliar gemas e obras de arte
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - efeito essencialmente narrativo e adjudicavel

### Nivel 5+

#### Reforco Anao

- Nome: `Reforco Anao`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+, Treinado em Ferramentas de Ferreiro`
- Texto extraido ou resumido fielmente:
  durante preparacoes diarias, reforca uma armadura ou escudo nao-magico; o item concede +1 na CA ate o proximo Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - confirmar se isso vira atividade, encantamento temporario ou texto manual

#### Punho Explosivo

- Nome: `Punho Explosivo`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+`
- Texto extraido ou resumido fielmente:
  ataques desarmados perdem a propriedade "Nao-Letal" e causam 1d4 de dano de Fogo adicional; ganha resistencia a Fogo contra seus proprios efeitos
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - confirmar como alterar ataque desarmado do ator

#### Vingue por Gloria

- Nome: `Vingue por Gloria`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+`
- Texto extraido ou resumido fielmente:
  quando aliado a ate 9 metros [30 pes] cair a 0 PV, pode usar Reacao para ganhar os efeitos de Heroismo sem concentracao por 1 minuto; uso 1 vez por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - depende de gatilho reativo
  - referencia magia externa

#### Sifao de Arma

- Nome: `Sifao de Arma`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+`
- Texto extraido ou resumido fielmente:
  como Acao Bonus, carrega uma bomba ou alquimico na arma; o proximo acerto soma o dano da bomba ao ataque; se for arma de fogo, o dano explode em raio de 1,5m
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - depende de bombas, alquimicos e possivelmente sistema proprio de armas de fogo

#### Resiliencia Enanica

- Nome: `Resiliencia Enanica`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+`
- Texto extraido ou resumido fielmente:
  ao usar Esquivar em combate, pode gastar um Dado de Vida; rola o dado, soma o modificador de Constituicao e recupera esse valor em PV
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - confirmar acesso a dado de vida como recurso do ator

#### Escudo das Cupulas

- Nome: `Escudo das Cupulas`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+, Linhagem da Montanha`
- Texto extraido ou resumido fielmente:
  pode usar Reacao para fazer teste de resistencia de Constituicao no lugar de Destreza em efeitos que permitam metade do dano em save de Destreza
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - substituicao de atributo em save e altamente contextual

#### Cacador da Penumbra

- Nome: `Cacador da Penumbra`
- Nivel minimo: `5+`
- Pre-requisitos explicitos:
  `Anao, Nivel 5+, Linhagem das Profundezas`
- Texto extraido ou resumido fielmente:
  em penumbra ou escuridao, pode realizar Esconder-se como Acao Bonus
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - contexto de luz provavelmente fica em texto

### Nivel 9+

#### Forjador de Batalha

- Nome: `Forjador de Batalha`
- Nivel minimo: `9+`
- Pre-requisitos explicitos:
  `Anao, Nivel 9+, Talento Reforco Anao`
- Texto extraido ou resumido fielmente:
  funciona como Reforco Anao, mas para armas; arma nao-magica se torna magica e recebe +1 em ataque e dano ate o proximo Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - confirmar interacao com itens e ataque/dano temporarios

#### Ecos em Pedra

- Nome: `Ecos em Pedra`
- Nivel minimo: `9+`
- Pre-requisitos explicitos:
  `Anao, Nivel 9+, Caracteristica Senso da Pedra`
- Texto extraido ou resumido fielmente:
  ganha Tremorsense passivo com alcance de 6 metros [20 pes] enquanto estiver tocando pedra, sem gastar usos
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - confirmar se isso modifica ou complementa a feature base

#### Chamado dos Herois

- Nome: `Chamado dos Herois`
- Nivel minimo: `9+`
- Pre-requisitos explicitos:
  `Anao, Nivel 9+, Talento Vingue por Gloria`
- Texto extraido ou resumido fielmente:
  conjura Heroismo de 3o Circulo; se estiver com menos da metade dos PV maximos, recebe o dobro de PV temporarios; uso 1 vez por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - depende de magia externa e escalonamento especifico

#### Ossos de Pedra

- Nome: `Ossos de Pedra`
- Nivel minimo: `9+`
- Pre-requisitos explicitos:
  `Anao, Nivel 9+`
- Texto extraido ou resumido fielmente:
  ao sofrer Acerto Critico, pode usar Reacao para rolar d20 puro contra CD 17; com sucesso, transforma critico em acerto normal
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - gatilho reativo especifico e teste puro fora do padrao

#### Aptidao Explosiva

- Nome: `Aptidao Explosiva`
- Nivel minimo: `9+`
- Pre-requisitos explicitos:
  `Anao, Nivel 9+, Talento Sifao de Arma`
- Texto extraido ou resumido fielmente:
  voce e aliados ficam imunes a dano ou efeito em area causado por suas proprias armas de fogo, bombas ou explosivos alquimicos
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - depende de identificacao da fonte do efeito

### Nivel 13+

#### Resiliencia da Montanha

- Nome: `Resiliencia da Montanha`
- Nivel minimo: `13+`
- Pre-requisitos explicitos:
  `Anao, Nivel 13+`
- Texto extraido ou resumido fielmente:
  PV maximo aumenta em valor igual ao seu Nivel e +1 por nivel futuro; se possuir o talento Robusto, ganha vantagem em testes de resistencia contra a morte
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - referencia talento externo `Robusto`

#### Instinto do Artesao

- Nome: `Instinto do Artesao`
- Nivel minimo: `13+`
- Pre-requisitos explicitos:
  `Anao, Nivel 13+`
- Texto extraido ou resumido fielmente:
  ao errar um ataque com arma de fogo, ou misfire, pode usar Reacao para causar dano igual ao modificador de Destreza ou dano minimo da arma; nao aplica efeitos "ao acertar"
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - depende de arma de fogo e possivel regra propria de misfire

#### Mestre Artesao Enanico

- Nome: `Mestre Artesao Enanico`
- Nivel minimo: `13+`
- Pre-requisitos explicitos:
  `Anao, Nivel 13+, Forjador de Batalha ou Reforco Anao`
- Texto extraido ou resumido fielmente:
  ao usar Forjador de Batalha ou Reforco Anao, o bonus sobe para +2; pode aplicar em item magico existente para aumentar o bonus em +1 ate o limite de +3
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - interacao com itens magicos existentes precisa de validacao forte

#### Olhar Analitico

- Nome: `Olhar Analitico`
- Nivel minimo: `13+`
- Pre-requisitos explicitos:
  `Anao, Nivel 13+`
- Texto extraido ou resumido fielmente:
  vantagem em Intuicao para detectar mentiras e controle mental; vantagem em Percepcao e Investigacao para detectar disfarces de mortos-vivos e rastrea-los a ate 9m
- Classificacao sugerida: `talento racial`
- Automacao provavel: `nao`
- Duvidas mecanicas:
  - efeito amplamente contextual

#### Crescimento Titanico

- Nome: `Crescimento Titanico`
- Nivel minimo: `13+`
- Pre-requisitos explicitos:
  `Anao, Nivel 13+, Linhagem da Montanha`
- Texto extraido ou resumido fielmente:
  como Acao Bonus, aumenta para tamanho Grande por 1 minuto; enquanto Grande, tem vantagem em testes de Forca e ataques com arma causam 1d4 extra; uso 1 vez por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - tamanho Grande e dano extra exigem teste no Foundry

### Nivel 17+

#### Disparo Abencoado pela Forja

- Nome: `Disparo Abencoado pela Forja`
- Nivel minimo: `17+`
- Pre-requisitos explicitos:
  `Anao, Nivel 17+, Talento Aptidao Explosiva`
- Texto extraido ou resumido fielmente:
  como Acao Bonus, por 1 minuto imbui arma de ataque a distancia com calor sagrado; ataques causam dano extra de Fogo igual ao Bonus de Proficiencia; ignoram Invisivel, area fortemente obscurecida e todas as instancias de Cobertura exceto Total; uso 1 vez por Descanso Curto
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - modificadores de visibilidade e cobertura costumam exigir adjudicacao ou suporte especifico

#### Portao de Pedra e Ferro

- Nome: `Portao de Pedra e Ferro`
- Nivel minimo: `17+`
- Pre-requisitos explicitos:
  `Anao, Nivel 17+`
- Texto extraido ou resumido fielmente:
  pode conjurar Passagem (Passwall) sem gastar espaco de magia, atravessando pedra, terra ou metal nao-magicos; usos iguais ao Bonus de Proficiencia por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - referencia magia externa e restricao de material

#### Muralha de Pedra Viva

- Nome: `Muralha de Pedra Viva`
- Nivel minimo: `17+`
- Pre-requisitos explicitos:
  `Anao, Nivel 17+, Talento Resiliencia Enanica`
- Texto extraido ou resumido fielmente:
  ao sofrer dano, usa Reacao para ganhar 50 PV temporarios e ficar Petrificado ate o fim do proximo turno; se os PV temporarios acabarem, a petrificacao termina antes; uso 1 vez por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - interacao entre Petrificado, resistencia e PV temporarios precisa de validacao

#### Eco Perfeito

- Nome: `Eco Perfeito`
- Nivel minimo: `17+`
- Pre-requisitos explicitos:
  `Anao, Nivel 17+, Talento Ecos em Pedra`
- Texto extraido ou resumido fielmente:
  enquanto Senso da Pedra estiver ativo, conhece a posicao precisa de qualquer criatura tocando o solo num raio de 24 metros [80 pes]; ataques contra essas criaturas nao sofrem desvantagem por Invisivel ou Escondida; elas nao recebem meia cobertura ou tres quartos de cobertura vindos de pedra ou metal
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - depende de varios estados contextuais de combate

#### Terremoto Ancestral

- Nome: `Terremoto Ancestral`
- Nivel minimo: `17+`
- Pre-requisitos explicitos:
  `Anao, Nivel 17+`
- Texto extraido ou resumido fielmente:
  pode conjurar Terremoto (Earthquake) sem gastar espaco de magia; CD baseada na Constituicao; pode escolher numero de criaturas igual ao modificador de Sabedoria para serem imunes ao efeito; uso 1 vez por Descanso Longo
- Classificacao sugerida: `talento racial`
- Automacao provavel: `parcial`
- Duvidas mecanicas:
  - referencia magia externa e regra adicional de criaturas imunes

### Outros

- Niveis adicionais fora de `1+`, `5+`, `9+`, `13+` e `17+`:
  `nao identificado na fonte`

## 7. Links e dependencias externas

Dependencias de outras paginas:

- `Drumhuldar`
- `Khazrundel`
- `Ferlanden`
- `Essencia Bestial`
- `Essencia Draconica`
- `Essencia Celestial`
- `Essencia Elemental`
- `Essencia Feerica`
- `Essencia Infernal`
- `Essencia Onirica`
- `Essencia Vampirica`
- `Essencia do Vazio`

Referencias externas de regra, magia, condicao, equipamento ou sistema:

- `Heroismo`
- `Passagem (Passwall)`
- `Terremoto (Earthquake)`
- `Invisivel`
- `Envenenado`
- `Petrificado`
- `Cobertura`
- `Sentido Sismico (Tremorsense)`
- `bombas`
- `alquimicos`
- `armas de fogo`
- `misfire`
- `Ferramentas de Ferreiro`
- `Robusto`

Dependencias estruturais percebidas:

- poderes completos de Essencias dependem de paginas externas
- parte dos talentos depende de linhagem especifica
- parte dos talentos depende de outros talentos anteriores
- parte dos talentos depende de magias ou regras externas nao reproduzidas no HTML

## 8. Duvidas para o autor

- A species final vai exigir escolha obrigatoria entre Linhagem e Essencia no mesmo item base?
- Essencias serao tratadas como pagina externa apenas para referencia ou como conjunto real de escolhas futuras do projeto?
- O que deve virar feature racial base e o que deve virar feat racial separado?
- `Senso da Pedra` deve ser modelado como atividade com usos por proficiencia, como efeito, ou como texto com suporte parcial?
- `Vitalidade da Pedra` deve ficar no item base da species ou em alguma estrutura separada de HP por nivel?
- A parte "ignora reducao de velocidade por armadura" deve morar na linhagem da Montanha, em talento racial ou nos dois com excecao?
- Ha sistema proprio de armas de fogo, bombas e misfire que o modulo precisara respeitar?
- Os nomes de cidades, essencias e termos externos precisam entrar em outra extracao antes da modelagem?
- Existem tamanhos, deslocamentos base, idiomas iniciais e tipo de criatura definidos em outra fonte para o Anao? Nesta pagina isso nao ficou claramente identificado.
- Os talentos raciais devem ser modelados todos como feats separados ou alguns devem permanecer somente como referencia narrativa?

## 9. Sugestao de modelagem futura

Sem criar arquivos reais ainda, a divisao mais provavel parece ser:

- `race`
  - item base `Anao`
  - incluir apenas o nucleo comum e confirmado da species

- `features raciais`
  - `Visao no Escuro Superior`
  - `Vigor e Robustez Ana`
  - `Senso da Pedra`
  - possivelmente features de linhagem, caso a modelagem futura separe isso do item base

- `talentos raciais`
  - feats separados por nivel minimo
  - dependencias entre talentos preservadas

- `escolhas/linhagens`
  - `Linhagem da Montanha`
  - `Linhagem das Profundezas`
  - `Essencias` como ramo alternativo e dependente de outras paginas

- `pendencias`
  - confirmar idiomas iniciais
  - confirmar tamanho base
  - confirmar deslocamento base
  - confirmar tipo de criatura
  - confirmar como tratar essencias
  - confirmar como tratar talentos ligados a armas de fogo, bombas e misfire
  - confirmar quais partes entram como texto e quais recebem automacao parcial
