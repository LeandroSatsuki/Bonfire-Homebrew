# Mapeamento Foundry

Escopo: análise dos arquivos JSON em `foundry-samples/` para mapear o formato real de itens exportados pelo Foundry VTT v13 com `dnd5e` 5.2.4+.

Arquivos analisados:

- `foundry-samples/teste-race.json`
- `foundry-samples/teste-feat.json`
- `foundry-samples/teste-background.json`
- `foundry-samples/teste-class.json`
- `foundry-samples/teste-background-completo.json`
- `foundry-samples/teste-talento-origem.json`
- `foundry-samples/teste-feat-treinamento-moderado.json`
- `foundry-samples/teste-feat-perfurador.json`
- `foundry-samples/teste-feat-adepto-do-fogo-espiritual.json`
- `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`
- `foundry-samples/teste-feat-talento-origem-vinculo.json`
- `foundry-samples/teste-feat-habilidoso.json`

Observação:

- Este documento descreve apenas o que foi encontrado nas exportações reais.
- Nenhum campo foi inventado.
- O conteúdo abaixo não deve ser lido como schema completo do Foundry ou do `dnd5e`, e sim como mapeamento inicial baseado em amostras válidas.

## 1. Quais tipos de Item foram encontrados

Foram encontrados quatro tipos reais de `Item`:

- `race`
- `feat`
- `background`
- `class`

## 2. Qual type real foi usado para Race/Species

Para Race/Species, o tipo real encontrado foi:

```json
"type": "race"
```

Isso confirma que, na amostra exportada pelo `dnd5e` 5.2.4, species/race usa `Item.type = "race"`.

## 3. Qual type real foi usado para Feat

Para Feat, o tipo real encontrado foi:

```json
"type": "feat"
```

## 4. Qual type real foi usado para Background

Para Background, o tipo real encontrado foi:

```json
"type": "background"
```

## 5. Qual type real foi usado para Class

Para Class, o tipo real encontrado foi:

```json
"type": "class"
```

## 6. Quais campos parecem nativos do Foundry

Campos de topo presentes em todas as amostras e que parecem fazer parte da estrutura padrão exportada pelo Foundry:

- `name`
- `type`
- `_id`
- `img`
- `system`
- `effects`
- `folder`
- `sort`
- `ownership`
- `flags`
- `_stats`

Campos internos de `_stats` que parecem ser metadados de documento/exportação:

- `compendiumSource`
- `duplicateSource`
- `exportSource`
- `coreVersion`
- `systemId`
- `systemVersion`
- `createdTime`
- `modifiedTime`
- `lastModifiedBy`

Também parecem nativos ou de infraestrutura do documento:

- `ownership.default`
- `ownership.<userId>`

## 7. Quais campos parecem específicos do dnd5e

Campos comuns do bloco `system` encontrados em todas as amostras:

- `advancement`
- `description`
- `identifier`
- `source`

Campos específicos observados por tipo:

### `race`

- `system.movement`
- `system.senses`
- `system.type`
- `system.advancement` com avanço `Size`

### `feat`

- `system.activities`
- `system.uses`
- `system.crewed`
- `system.enchant`
- `system.prerequisites`
- `system.properties`
- `system.requirements`
- `system.type`

### `background`

- `system.startingEquipment`
- `system.advancement` com:
  - `AbilityScoreImprovement`
  - `Trait`
  - `ItemGrant`

### `class`

- `system.startingEquipment`
- `system.hd`
- `system.levels`
- `system.primaryAbility`
- `system.properties`
- `system.spellcasting`
- `system.advancement` com:
  - `HitPoints`
  - `Subclass`
  - `AbilityScoreImprovement`

Campos observados em `system.source`:

- `revision`
- `rules`

Na amostra, `system.source.rules` veio como `2024`, o que combina com a regra base definida para o projeto.

## 8. Quais campos não devem ser preenchidos manualmente

Com base nas amostras, estes campos não são bons candidatos para preenchimento manual em conteúdo autoral bruto:

- `_id`
- `_stats`
- `ownership`
- `sort`
- `folder`
- `flags`, exceto quando houver necessidade real e validada
- `effects`, exceto quando houver automação simples, segura e testada

Dentro de `_stats`, não preencher manualmente:

- `createdTime`
- `modifiedTime`
- `lastModifiedBy`
- `coreVersion`
- `systemVersion`
- `systemId`
- `compendiumSource`
- `duplicateSource`
- `exportSource`

Também pedem cuidado forte:

- `system.advancement`
- `system.activities`
- `system.spellcasting`
- `system.primaryAbility`
- `system.hd`
- `system.startingEquipment`

Esses campos parecem válidos e importantes, mas são estruturados demais para serem preenchidos sem validação direta no Foundry.

## 9. Quais campos podem servir como base de template

Os melhores candidatos para template inicial, com base nas amostras, são:

- `name`
- `type`
- `img`
- `system.description.value`
- `system.description.chat`
- `system.identifier`
- `system.source.revision`
- `system.source.rules`

Por tipo, podem servir como base de template estrutural:

### `race`

- `system.movement.units`
- `system.movement.hover`
- `system.movement.ignoredDifficultTerrain`
- `system.senses`
- `system.type.value`
- `system.advancement` com entrada inicial de `Size`

### `feat`

- `system.uses`
- `system.prerequisites`
- `system.properties`
- `system.requirements`
- `system.type.value`
- `system.type.subtype`

### `background`

- `system.startingEquipment`
- `system.advancement` como referência de estrutura para:
  - melhoria de atributo
  - proficiências
  - idiomas
  - concessão de feat

### `class`

- `system.hd`
- `system.levels`
- `system.primaryAbility`
- `system.properties`
- `system.spellcasting`
- `system.startingEquipment`
- `system.advancement` como referência de estrutura para:
  - pontos de vida
  - subclasse
  - melhorias de atributo

Observação importante:

- `content/` pode usar esses campos como referência autoral de mapeamento, mas não deve presumir que esse recorte já cobre todas as variações válidas do sistema.

## 10. Quais dúvidas técnicas ainda precisam ser testadas dentro do Foundry

- Confirmar se `race` continua sendo o tipo correto para Species no fluxo atual do `dnd5e` 5.2.4+ em todos os contextos de criação, importação e compendium.
- Confirmar quais valores válidos existem para `system.type.value` em `race`, além de `humanoid`.
- Confirmar como o `dnd5e` preenche `system.activities` em feats que tenham uso acionável real.
- Confirmar quais formatos válidos de `system.prerequisites` e `system.requirements` o Foundry produz quando o item tem pré-requisitos configurados.
- Confirmar como `system.startingEquipment` é estruturado quando background e class possuem equipamento inicial configurado de fato.
- Confirmar como o avanço `ItemGrant` de background referencia feats reais quando o vínculo está preenchido.
- Confirmar como o avanço `Subclass` de classe armazena a referência quando a subclasse já existe e está vinculada.
- Confirmar quais campos de `effects` o sistema preenche automaticamente e quais só surgem quando há automação manual.
- Confirmar se `compendiumSource` em `_stats` aparece apenas em itens exportados a partir de compendium, como ocorreu na amostra de feat.
- Confirmar se `identifier` precisa obedecer alguma restrição adicional além do padrão sem acento e sem espaço adotado pelo projeto.

## 11. Sample adicional de Background completo

Arquivo analisado:

- `foundry-samples/teste-background-completo.json`

Estrutura real encontrada:

- `type: "background"`
- `system.advancement` com quatro entradas:
  - `AbilityScoreImprovement`
  - `Trait`
  - `Trait`
  - `ItemGrant`
- `system.wealth: "100"`
- `system.startingEquipment: []`
- `system.source.rules: "2024"`

Observacoes objetivas:

- o `AbilityScoreImprovement` veio com `configuration.points: 3` e `configuration.cap: 2`
- um `Trait` foi usado para proficiencias
- um `Trait` foi usado para `Comum` fixo e escolhas entre idiomas/ferramentas
- o `ItemGrant` foi usado no teste para representar a habilidade de antecedente

## 12. Sample adicional de Talento de Origem

Arquivo analisado:

- `foundry-samples/teste-talento-origem.json`

Estrutura real encontrada:

- `type: "feat"`
- `system.prerequisites` existe
- `system.requirements` existe
- `system.activities` veio vazio
- `effects` veio vazio

Observacoes objetivas:

- `system.uses` existe, mas veio sem configuracao funcional no sample
- `system.source.rules` veio como `2024`

## 13. Vinculo entre Background e Talento de Origem

- o teste manual de `Backgrounds` foi informado como funcional
- o sample de `Background` e o sample de `Talento de Origem` confirmam os `type` reais esperados
- a referencia explicita entre o `Background` exportado e o `Talento de Origem` exportado ainda precisa de novo export ou novo teste

## 14. Samples adicionais de Feats testados

Arquivos analisados:

- `foundry-samples/teste-feat-treinamento-moderado.json`
- `foundry-samples/teste-feat-perfurador.json`
- `foundry-samples/teste-feat-adepto-do-fogo-espiritual.json`
- `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`
- `foundry-samples/teste-feat-talento-origem-vinculo.json`
- `foundry-samples/teste-feat-habilidoso.json`

Estrutura real observada nos samples:

- todos usam `type: "feat"`
- `AbilityScoreImprovement` foi usado para aumento de atributo
- `Trait` foi usado para proficiencias em `Treinamento Moderado`
- `Talento de Origem` pode ser representado como `type: "feat"` com `system.type.subtype: "origin"`
- `system.requirements` carregou os pre-requisitos textuais
- `system.prerequisites` permaneceu sem estrutura rica nos samples, com `items: []`, `repeatable: false` e `level: null`
- `system.activities` foi usado para blocos acionaveis
- `system.uses` com `max: "@prof"` e recuperacao em `lr` funcionou em `Tocado pelo No do Selamento`
- `effects` veio vazio nos samples
- `system.source.rules` veio como `2024`

Observacoes por item:

### `Treinamento Moderado`

- `AbilityScoreImprovement` foi usado para o aumento de atributo
- `Trait` foi usado para proficiencias com:
  - `armor:lgt`
  - `armor:med`
  - `armor:shl`
- o pre-requisito `Nivel 4+` ficou salvo em `system.requirements`

### `Perfurador`

- `AbilityScoreImprovement` foi usado para o aumento de atributo
- `system.activities` trouxe duas `utility` activities:
  - `Puncao`
  - `Critico Aprimorado`
- o comportamento detalhado de gatilho e limite por turno continuou dependente de texto

### `Adepto do Fogo Espiritual`

- `AbilityScoreImprovement` foi usado para o aumento de atributo
- `system.activities` trouxe uma `utility` activity:
  - `Feitiolume Alimentado`
- `system.uses` veio sem configuracao funcional
- `effects` veio vazio

### `Tocado pelo No do Selamento`

- `AbilityScoreImprovement` foi usado para o aumento de atributo
- `system.activities` trouxe uma `utility` activity com `activation.type: "reaction"`
- `system.uses.max` veio como `@prof`
- `system.uses.recovery` veio com recuperacao em `lr`
- o consumo da activity foi ligado ao uso do item

### `Talento de Origem` generico

- o sample continua usando `type: "feat"`
- nao apareceu marcacao estrutural clara de categoria `origin`
- o vinculo ficou apenas textual/descritivo no teste exportado

### `Habilidoso`

- o sample usa `type: "feat"`
- `system.type.value` veio como `feat`
- `system.type.subtype` veio como `origin`
- `system.advancement` trouxe um `Trait`
- `Trait.configuration.choices` veio com:
  - `count: 3`
  - `pool: ["skills:*", "tool:*"]`
- isso confirma que o Foundry consegue representar escolha de `3` entre Pericias e Ferramentas
- isso valida a modelagem autoral de `Habilidoso`
- `system.activities` veio vazio
- `system.uses` veio vazio
- `effects` veio vazio
- `system.requirements` veio vazio
- `system.prerequisites.level` veio como `null`

Pendencias mantidas:

- ainda falta decidir se `Talentos de Origem` e `Talentos Gerais` terao packs separados
- ainda falta decidir qual conversor, script ou rotina controlada vai transformar `content/` em itens reais do Foundry
