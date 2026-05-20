# Sistema de Features Raciais

- Status: `escopo/modelagem`
- Observacao: este documento ainda nao e dado real do Foundry. Ele registra a modelagem geral das features raciais do projeto.

## 1. Objetivo do sistema

Features raciais representam tracos concedidos por uma raca ou species, linhagem, essencia ou outra escolha racial.

Elas existem para descrever efeitos permanentes, condicionais ou progressivos que pertencem ao conjunto racial do personagem, sem assumir automaticamente o formato final do Foundry antes da validacao.

## 2. Base tecnica confirmada

- Foundry VTT `v13`
- sistema `dnd5e 5.2.4+`
- regra base `D&D 2024`
- raca/species usa type real `race`
- features e talentos usam type real `feat`
- `content/` e fonte autoral
- `packs/` nao devem ser editados manualmente

## 3. Tipos conceituais de feature racial

- `feature racial base`
- `feature de linhagem`
- `feature de essencia futura`
- `feature concedida por talento racial`
- `feature manual/contextual`

Observacao:

- essas categorias sao conceituais e servem para planejamento
- elas nao definem sozinhas o schema nativo do Foundry

## 4. Caso de referencia: Anao

Usando o `Anao` apenas como exemplo de escopo:

### Tracos base identificados

#### Visao no Escuro Superior

- Classificacao conceitual: `feature racial base`
- Automacao provavel: `sim`
- Pendencias tecnicas:
  - validar darkvision/senses no Foundry

#### Vigor e Robustez Ana

- Classificacao conceitual: `feature racial base`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar resistencia a veneno
  - validar vantagem contra `Envenenado`
  - validar bonus de HP por nivel

#### Senso da Pedra

- Classificacao conceitual: `feature racial base`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar tremorsense temporario
  - validar usos por proficiencia
  - validar restricao de tocar pedra
  - validar duracao

### Features de linhagem identificadas

#### Estabilidade da Montanha

- Classificacao conceitual: `feature de linhagem`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar como tratar empurrado/derrubado
  - validar como tratar armadura pesada sem penalidade de deslocamento

#### Passo Rochoso

- Classificacao conceitual: `feature de linhagem`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar ignorar terreno dificil especifico
  - validar vantagem contextual em escalada de rocha

#### Sentinela das Galerias

- Classificacao conceitual: `feature de linhagem`
- Automacao provavel: `nao`
- Pendencias tecnicas:
  - efeito amplamente contextual de ambiente subterraneo

#### Memoria da Rocha

- Classificacao conceitual: `feature de linhagem`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar proficiencia em Historia
  - validar parte contextual de expertise

## 5. Relacao com Linhagem OU Essencia

- features base pertencem a raca
- features de linhagem so devem ser concedidas se o personagem escolher uma linhagem
- se escolher essencia, nao recebe features de linhagem
- features de essencia ficam para fase futura
- nao assumir automacao da escolha sem teste no Foundry

## 6. Relacao com talentos raciais

- talentos raciais sao `feats separados`
- alguns talentos podem conceder ou alterar features
- alguns talentos podem melhorar features existentes, como `Senso da Pedra`
- essas relacoes devem ser registradas autoralmente antes de virar dado real

## 7. Automacao no Foundry

As features raciais podem ser separadas em tres categorias:

### Automatizavel

Exemplos conceituais:

- `darkvision` ou `senses`
- proficiencia simples

### Parcialmente automatizavel

Exemplos conceituais:

- resistencia a dano
- bonus de HP por nivel
- usos por proficiencia
- tremorsense temporario

### Manual ou contextual

Exemplos conceituais:

- vantagem contextual
- restricao ambiental
- verificacao de tocar pedra
- efeitos dependentes de cena ou arbitragem

Observacao:

- nao criar `Active Effects` reais nesta etapa

## 8. Formato autoral futuro

Sem criar arquivos reais agora, futuros arquivos em `content/features/` podem usar campos conceituais como:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `linkedSpecies`
- `featureCategory`
- `grantedBy`
- `description`
- `mechanicsSummary`
- `automation`
- `uses`
- `duration`
- `effects`
- `dependencies`
- `notes`

Observacao importante:

- isso e fonte autoral
- nao e schema nativo do Foundry

## 9. Pendencias

- validar como criar features raciais no Foundry `dnd5e 5.2.4`
- validar se serao itens `feat` com subtipo especifico
- validar como `race` concede features via `Advancement`
- validar como linhagem concede features
- validar como representar features dependentes de escolha exclusiva
- validar `Active Effects` apenas em exemplos manuais
- validar `Senso da Pedra`
- validar `Vigor e Robustez Ana`

## 10. Criterios para liberar dados reais

- [ ] sistema documentado
- [ ] features extraidas e revisadas
- [ ] relacao com raca/linhagem/essencia definida
- [ ] automacao classificada
- [ ] pendencias aceitas ou resolvidas
- [ ] abordagem testada manualmente no Foundry
- [ ] autorizacao explicita do autor para criar dados reais
