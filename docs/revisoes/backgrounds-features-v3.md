# Backgrounds v3: Features e ItemGrant

## 1. Objetivo

Preparar a fase v3 dos Backgrounds para que a `Habilidade do Antecedente` deixe de viver apenas como texto limpo no item do background e passe a existir como `Feature` separada em compendium.

Fluxo previsto:

1. importar as `Features` das habilidades dos 30 backgrounds
2. resolver o `ItemGrant` do background por `UUID` real
3. conceder a `Feature` ao escolher o `Background`

## 2. Estrutura encontrada no sample

Sample analisado:

- `foundry-samples/teste-background-completo.json`

O sample confirma a presença de `ItemGrant` dentro de `system.advancement` com a seguinte estrutura observada:

- `type: "ItemGrant"`
- `title: "Contato Local"`
- `_id: "<id do advancement>"`
- `configuration.items: []` no export analisado
- `configuration.optional: false`
- `configuration.spell: null`
- `value: {}`
- `level: 0`
- `hint`: texto descritivo da habilidade concedida

Observacao importante:

- o export analisado confirma o tipo de avanço
- o export nao expõe o UUID do item concedido em `configuration.items`, porque essa lista veio vazia
- por isso, a v3 precisa resolver o UUID real localmente antes de escrever o `ItemGrant`

## 3. Features esperadas

Cada background deve gerar uma Feature com o nome:

- `Habilidade do Antecedente: Acolito`
- `Habilidade do Antecedente: Antropologista`
- `Habilidade do Antecedente: Arqueologista`
- `Habilidade do Antecedente: Artista`
- `Habilidade do Antecedente: Assombrado`
- `Habilidade do Antecedente: Astronomo`
- `Habilidade do Antecedente: Campeao`
- `Habilidade do Antecedente: Cavaleiro`
- `Habilidade do Antecedente: Charlatao`
- `Habilidade do Antecedente: Criminoso`
- `Habilidade do Antecedente: Detetive`
- `Habilidade do Antecedente: Espiao`
- `Habilidade do Antecedente: Espiritualista`
- `Habilidade do Antecedente: Estudante de Arcanofisica`
- `Habilidade do Antecedente: Estudante de Arqueomancia`
- `Habilidade do Antecedente: Estudante de Biomancia`
- `Habilidade do Antecedente: Estudante de Estequiomancia`
- `Habilidade do Antecedente: Estudante de Nanquinomancia`
- `Habilidade do Antecedente: Guardiao da Natureza`
- `Habilidade do Antecedente: Heroi`
- `Habilidade do Antecedente: Legionario`
- `Habilidade do Antecedente: Marcado Pelas Fadas`
- `Habilidade do Antecedente: Mercenario`
- `Habilidade do Antecedente: Mestre Artesao`
- `Habilidade do Antecedente: Nobre`
- `Habilidade do Antecedente: Pescador`
- `Habilidade do Antecedente: Pesquisador`
- `Habilidade do Antecedente: Soldado`
- `Habilidade do Antecedente: Viajante`
- `Habilidade do Antecedente: Viajante do Mar`

## 4. Riscos

- o `ItemGrant` do Foundry depende de `UUID` real, nao de nome solto
- se a `Feature` nao existir no pack `Features`, o background nao deve gravar grant falso
- a ordem de importacao importa: primeiro `Features`, depois `Backgrounds`
- o sample nao mostrou a referencia preenchida, entao a v3 precisa validar o pack localmente

## 5. Criterios de aceite

- [ ] rodar `scripts/import-background-features-v1.js`
- [ ] criar ou atualizar `30` Features no pack `Features`
- [ ] rodar a importacao v3 de Backgrounds
- [ ] resolver cada `ItemGrant` com `UUID` real da `Feature`
- [ ] nao criar `ItemGrant` falso quando a `Feature` estiver ausente
- [ ] arrastar `Artista` para ficha e receber `ASI`, `Traits`, `100 PO` e `Habilidade do Antecedente: Artista`
- [ ] manter a descricao do item limpa e oficial

## 6. Formatação visual das Habilidades do Antecedente

A partir desta etapa, o HTML final gerado pelos scripts aplica negrito apenas na renderização.

Regras adotadas:

- o texto oficial dos JSONs permanece intocado
- a formatacao acontece apenas na conversao para HTML
- `*texto*` existente vira `<strong>texto</strong>`
- termos oficiais importantes ganham destaque somente se ja estiverem no texto
- o processo preserva parágrafos e listas
- HTML continua escapado antes da inserção dos destaques

Critérios de aceite desta camada visual:

- `Habilidade do Antecedente: Acolito` mostra termos importantes em negrito
- `Background: Acolito` mostra a habilidade com os mesmos destaques
- o texto oficial não é reescrito
- o `ItemGrant` continua funcionando
- `node --check` passa nos dois scripts
