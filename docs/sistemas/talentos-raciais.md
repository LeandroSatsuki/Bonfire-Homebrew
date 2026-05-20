# Sistema de Talentos Raciais

- Status: `escopo/modelagem`
- Observacao: este documento ainda nao e dado real do Foundry. Ele registra a modelagem geral do sistema de talentos raciais do projeto.

## 1. Objetivo do sistema

Talentos raciais sao `feats separados`, vinculados autoralmente a uma raca ou species, usados para representar evolucao racial ao longo do progresso do personagem.

Eles nao devem ser tratados como extensao automatica da race base sem revisao. Cada talento racial precisa ser identificado, extraido, revisado e validado antes de virar dado real.

## 2. Base tecnica ja confirmada

- Foundry VTT `v13`
- sistema `dnd5e 5.2.4+`
- regra base `D&D 2024`
- tipo real de feat no Foundry: `feat`
- racas/species usam tipo real `race`
- `content/` e fonte autoral, nao schema nativo direto do Foundry
- `packs/` nao devem ser editados manualmente

## 3. Regra geral de talentos raciais

- cada talento racial sera um `feat separado`
- cada talento deve ter vinculo autoral com uma raca
- cada talento pode ter nivel minimo
- cada talento pode ter pre-requisitos adicionais
- alguns talentos podem exigir linhagem especifica
- alguns talentos podem exigir talentos raciais anteriores
- alguns talentos podem depender de regras externas, como magias, armas, bombas, essencias, condicoes ou sistemas proprios

Observacao:

- esse vinculo com a raca deve ser registrado primeiro na camada autoral
- nao assumir campo nativo do Foundry para isso sem validacao

## 4. Organizacao por nivel minimo

Usando a extracao do `Anao` como base de escopo, as faixas identificadas sao:

- `nivel 1+`
- `nivel 5+`
- `nivel 9+`
- `nivel 13+`
- `nivel 17+`

Essas faixas servem para organizar acesso e evolucao racial.

Cada talento individual ainda precisa ser validado antes de virar dado real:

- texto mecanico
- pre-requisitos
- dependencias externas
- automacao possivel

## 5. Pre-requisitos possiveis

Tipos de pre-requisito que o sistema deve aceitar no nivel de modelagem:

- raca/species
- nivel de personagem
- linhagem
- essencia
- talento racial anterior
- proficiencia
- ferramenta
- magia
- equipamento
- regra externa
- decisao narrativa/manual

## 6. Relacao com Linhagem e Essencia

- `Linhagem` e `Essencia` podem limitar acesso a certos talentos
- `Linhagem` e `Essencia` sao rotas mutuamente exclusivas quando a raca definir isso
- no caso do `Anao`, o jogador escolhe `Linhagem` OU `Essencia` no nivel 1
- `Essencias` sao fase futura e nao devem ser assumidas como implementadas agora

Consequencia de modelagem:

- talentos que dependem de `Essencia` precisam continuar marcados como pendencia futura
- talentos que dependem de `Linhagem` precisam manter essa dependencia explicita

## 7. Automacao no Foundry

Os talentos raciais podem ser separados em tres categorias de automacao:

### Automatizavel

Exemplos conceituais:

- proficiencia simples
- concessao direta de linguagem
- concessao direta de ferramenta

### Parcialmente automatizavel

Exemplos conceituais:

- bonus fixo
- resistencia
- sentidos
- usos por proficiencia
- recursos com descanso
- efeitos que dependem de escolha manual no momento do uso

### Manual ou contextual

Exemplos conceituais:

- regra dependente de ambiente
- gatilho narrativo
- cobertura
- invisibilidade
- `misfire`
- magia externa
- bombas
- armas de fogo
- efeitos que dependem de arbitragem de cena

## 8. Formato autoral futuro

Sem criar arquivo real agora, um futuro arquivo autoral em `content/racial-feats/` pode usar campos como:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `linkedSpecies`
- `minimumLevel`
- `prerequisites`
- `lineageRequirement`
- `essenceRequirement`
- `previousFeatRequirement`
- `description`
- `mechanicsSummary`
- `automation`
- `dependencies`
- `notes`

Observacao importante:

- isso e fonte autoral
- nao e schema nativo do Foundry
- qualquer mapeamento para item `feat` real deve ser validado depois

## 9. Criterios para liberar criacao de dados reais

- [ ] sistema documentado
- [ ] decisoes de raca registradas
- [ ] talentos extraidos e revisados
- [ ] pre-requisitos confirmados
- [ ] dependencias externas identificadas
- [ ] automacao classificada
- [ ] autorizacao explicita do autor para criar dados reais

## 10. Pendencias

- validar como pre-requisitos aparecem no `dnd5e 5.2.4`
- validar como feats raciais serao organizados no compendium `TalentosRaciais`
- validar como registrar vinculo com raca sem inventar campo nativo
- validar como tratar talentos que dependem de `Essencias` futuras
- validar como tratar talentos que dependem de armas de fogo, bombas e `misfire`
- validar se havera macro ou automacao apenas depois da criacao manual de exemplos
