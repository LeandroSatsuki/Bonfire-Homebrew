# Mapeamento Foundry

Escopo: análise dos arquivos JSON em `foundry-samples/` para mapear o formato real de itens exportados pelo Foundry VTT v13 com `dnd5e` 5.2.4+.

Arquivos analisados:

- `foundry-samples/teste-race.json`
- `foundry-samples/teste-feat.json`
- `foundry-samples/teste-background.json`
- `foundry-samples/teste-class.json`

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
