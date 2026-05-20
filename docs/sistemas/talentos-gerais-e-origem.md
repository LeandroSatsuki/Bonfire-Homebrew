# Sistema de Talentos Gerais e Talentos de Origem

- Status: `escopo/modelagem`
- Observacao: este documento ainda nao e dado real do Foundry. Ele registra apenas escopo, classificacao e pendencias para modelagem futura.

## 1. Objetivo do sistema

O projeto possui pelo menos duas categorias principais de talentos nao raciais:

- `Talentos de Origem`: escolhidos na criacao do personagem
- `Talentos Gerais / Feats`: escolhidos depois por progressao de nivel ou outra regra

Tambem ha uma referencia a `Talentos Epicos` no HTML local analisado, mas a extracao nao identificou blocos individuais suficientes para modelar essa categoria agora.

## 2. Base tecnica confirmada

- Foundry VTT `v13`
- sistema `dnd5e 5.2.4+`
- regra base `D&D 2024`
- tipo real de feat no Foundry: `feat`
- `content/` e fonte autoral, nao schema nativo direto do Foundry
- `packs/` nao devem ser editados manualmente

## 3. Talentos de Origem

- sao escolhidos na criacao do personagem
- podem se relacionar com `Backgrounds` futuramente
- podem conceder proficiencias, magias, sentidos, recursos, reacoes ou outras regras
- ainda nao devem virar dado real sem validacao

Base de referencia atual:

- `42` talentos de origem identificados
- extracao detalhada em [talentos-de-origem.md](C:/Users/lpsan/AppData/Local/FoundryVTT/Data/modules/bonfire-homebrew/docs/extracoes/talentos/talentos-de-origem.md:1)

## 4. Talentos Gerais / Feats

- sao talentos escolhidos posteriormente por progressao ou outra regra
- geralmente podem ter nivel minimo
- podem conceder aumento de atributo
- podem ter pre-requisitos de atributo, proficiencia, talento anterior, sistema proprio, magia, equipamento ou classe
- ainda nao devem virar dado real sem validacao

Base de referencia atual:

- `96` talentos/feats identificados
- extracao detalhada em [talentos-feat.md](C:/Users/lpsan/AppData/Local/FoundryVTT/Data/modules/bonfire-homebrew/docs/extracoes/talentos/talentos-feat.md:1)

## 5. Talentos Epicos

- o HTML local possui cabecalho de `Talentos Epicos`
- a extracao local nao encontrou blocos individuais modelaveis
- esta categoria fica pendente ate nova fonte ou HTML mais completo

## 6. Relacao com Backgrounds

- talentos de origem provavelmente terao relacao com a fase de `Backgrounds`
- ainda nao criar pack `Backgrounds`
- ainda nao alterar `module.json`
- a relacao exata entre `Background` e `Talento de Origem` precisa ser validada no Foundry

## 7. Relacao com Classes e progressao

- talentos gerais podem ser escolhidos por progressao de personagem
- a forma exata depende do fluxo do `dnd5e 5.2.4`
- ainda precisa validar como o Foundry representa pre-requisitos e escolha de feats

## 8. Pre-requisitos possiveis

- nivel minimo
- atributo minimo
- raca/species
- background
- classe
- proficiencia
- ferramenta
- talento anterior
- magia/conjuracao
- sistema proprio do cenario
- equipamento
- condicao narrativa/manual

## 9. Automacao no Foundry

Os talentos nao raciais podem ser separados em tres grupos de automacao:

### Automatizavel

Exemplos conceituais:

- proficiencia simples
- parte de magias concedidas
- alguns bonus fixos ou sentidos simples

### Parcialmente automatizavel

Exemplos conceituais:

- magia concedida com escolhas de atributo
- uso por bonus de proficiencia
- reacao
- bonus condicional
- resistencia ligada a contexto
- aumento de deslocamento com restricao
- escolhas com pre-requisitos encadeados

### Manual ou contextual

Exemplos conceituais:

- arma de fogo
- bomba
- `misfire`
- `Marca`
- `Hemomancia`
- ordens
- gatilho narrativo
- efeitos que dependem de interpretacao de cena, ambiente ou arbitragem da mesa

Observacao:

- nao criar `Active Effects` reais nesta etapa

## 10. Formato autoral futuro

Sem criar arquivos reais agora, futuros registros autorais em `content/features/` ou `content/feats/` podem usar campos como:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `featCategory`
- `minimumLevel`
- `abilityIncrease`
- `prerequisites`
- `grantedSpells`
- `grantedProficiencies`
- `mechanicsSummary`
- `automation`
- `dependencies`
- `notes`

Observacao importante:

- isso e fonte autoral
- nao e schema nativo do Foundry

## 11. Pendencias

- validar como pre-requisitos aparecem no `dnd5e 5.2.4`
- validar como talentos de origem se conectam a `Backgrounds`
- validar se sera necessario pack proprio para `Backgrounds` antes dessa fase
- validar como talentos gerais serao organizados no compendium `Features`
- validar talentos que concedem magia
- validar talentos com uso por bonus de proficiencia
- validar talentos com reacao
- validar talentos ligados a `Marcas`, `Hemomancia`, ordens, armas de fogo, bombas e `misfire`
- obter fonte completa de `Talentos Epicos`

## 12. Criterios para liberar dados reais

- [ ] sistema documentado
- [ ] extracao revisada
- [ ] categorias confirmadas
- [ ] relacao com `Backgrounds` definida
- [ ] pre-requisitos revisados
- [ ] dependencias externas identificadas
- [ ] automacao classificada
- [ ] autorizacao explicita do autor para criar dados reais
