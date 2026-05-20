# Teste tecnico: Backgrounds

## 1. Status

- `teste manual validado`
- ainda nao e dado real do sistema
- usa samples exportados do Foundry

## 2. Fonte do teste

- `foundry-samples/teste-background-completo.json`
- `foundry-samples/teste-talento-origem.json`
- resultado manual informado pelo autor: `funcionou perfeitamente`

## 3. Regras do Bonfire testadas

Com base nos JSONs exportados e no resultado manual informado:

- `+2/+1 atributos`:
  - confirmado no JSON do background por `system.advancement` com entrada `AbilityScoreImprovement`
  - configuracao encontrada: `points: 3` e `cap: 2`
- `2 pericias a escolha`:
  - confirmado no JSON do background por `system.advancement` com entrada `Trait`
  - configuracao encontrada: `choices.count: 2`
- `Comum fixo`:
  - confirmado no JSON do background por `Trait.configuration.grants`
  - valor encontrado: `languages:standard:common`
- `2 escolhas entre idiomas/ferramentas`:
  - confirmado no JSON do background por `Trait.configuration.choices`
  - configuracao encontrada: `count: 2` com `pool` contendo `languages:*` e `tool:*`
- `100 PO ou equipamento inicial`:
  - confirmado no JSON do background por `system.wealth: "100"`
  - `system.startingEquipment` existe, mas veio vazio no sample
- `habilidade do antecedente`:
  - confirmado no JSON do background por entrada `ItemGrant` com titulo `Contato Local`
  - a habilidade tambem aparece descrita em `system.description.value`
- `1 Talento de Origem`:
  - funcionou no teste manual, mas precisa ser confirmado no JSON
  - o sample do talento de origem existe como item separado em `foundry-samples/teste-talento-origem.json`
  - o sample do background nao trouxe uma referencia explicita ao talento de origem dentro de `system.advancement`

## 4. Estrutura encontrada no JSON do Background

Arquivo analisado: `foundry-samples/teste-background-completo.json`

- `type` real:
  - `background`
- campos `system` relevantes encontrados:
  - `advancement`
  - `description`
  - `identifier`
  - `source`
  - `startingEquipment`
  - `wealth`
- `advancements` encontrados:
  - `AbilityScoreImprovement`
  - `Trait`
  - `Trait`
  - `ItemGrant`
- detalhes observados:
  - `AbilityScoreImprovement`:
    - `configuration.points: 3`
    - `configuration.cap: 2`
    - `value.type: "asi"`
    - `level: 0`
  - primeiro `Trait`:
    - `title: "Background Proficiencies"`
    - `choices.count: 2`
    - `pool` com `skills:*`, `skills:acr`, `skills:ani`, `skills:arc`
  - segundo `Trait`:
    - `title: "Choose Languages"`
    - `grants` com `languages:standard:common`
    - `choices.count: 2`
    - `pool` com `languages:*` e `tool:*`
  - `ItemGrant`:
    - `title: "Contato Local"`
    - `configuration.items: []`
    - `optional: false`
    - `hint` descrevendo a habilidade do antecedente
- `startingEquipment`:
  - campo existe
  - veio como lista vazia: `[]`
- `wealth`:
  - veio como string `100`
- `description`:
  - `system.description.value` registra explicitamente o objetivo do teste e lista as regras testadas
  - menciona a habilidade `Contato Local`
- `source/rules`:
  - `system.source.revision: 1`
  - `system.source.rules: "2024"`

## 5. Estrutura encontrada no JSON do Talento de Origem

Arquivo analisado: `foundry-samples/teste-talento-origem.json`

- `type` real:
  - `feat`
- campos `system` relevantes encontrados:
  - `activities`
  - `uses`
  - `advancement`
  - `description`
  - `identifier`
  - `source`
  - `crewed`
  - `enchant`
  - `prerequisites`
  - `properties`
  - `requirements`
  - `type`
- `description`:
  - `system.description.value` informa que o item foi usado apenas para testar se um `Background` consegue conceder ou permitir escolher um `Talento de Origem`
- `prerequisites/requirements`:
  - `system.prerequisites.items: []`
  - `system.prerequisites.repeatable: false`
  - `system.prerequisites.level: null`
  - `system.requirements: ""`
- `activities/uses/effects`:
  - `system.activities: {}`
  - `system.uses.spent: 0`
  - `system.uses.recovery: []`
  - `system.uses.max: ""`
  - `effects: []`
- `source/rules`:
  - `system.source.revision: 1`
  - `system.source.rules: "2024"`

## 6. Conclusoes tecnicas

- `Backgrounds` sao viaveis no Foundry `dnd5e 5.2.4`
- a fase de `Backgrounds` pode usar item type `background`
- `Talento de Origem` pode ser representado como item type `feat`
- o teste manual informado pelo autor indica que o fluxo funcionou perfeitamente
- o sample de `background` confirma:
  - melhoria de atributo por `AbilityScoreImprovement`
  - proficiencias e escolhas por `Trait`
  - habilidade do antecedente por `ItemGrant`
  - `wealth: "100"`
- o sample do `Talento de Origem` confirma a viabilidade de item separado como `feat`
- a ligacao explicita entre o `Background` sample e o `Talento de Origem` sample nao apareceu no JSON exportado analisado
- ainda nao criar pack `Backgrounds` sem decisao explicita
- ainda nao converter backgrounds oficiais em `content/` ate autorizacao explicita

## 7. Pendencias

- decidir quando criar pack `Backgrounds` no `module.json`
- decidir como organizar `Talentos de Origem` no compendium `Features` ou em outro compendium futuro
- validar mais tarde se todos os `30` antecedentes seguem o mesmo padrao
- validar backgrounds com dependencias narrativas mais complexas, como `retentores`, `escudeiro`, `companheiro animal`, `panteao`, `reino de origem` e `veiculo aquatico`
- confirmar em novo export se a escolha ou concessao de `Talento de Origem` aparece com referencia explicita no `Background`

## 8. Criterios para liberar dados reais de Backgrounds

- [ ] teste tecnico documentado
- [ ] sample de background versionado
- [ ] sample de talento de origem versionado
- [ ] decisao sobre pack `Backgrounds` tomada
- [ ] decisao sobre organizacao dos `Talentos de Origem` tomada
- [ ] autorizacao explicita do autor para criar dados reais
