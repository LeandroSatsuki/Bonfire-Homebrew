# Mapeamento de Backgrounds para Foundry

## 1. Status

- especificacao tecnica
- importador real v1
- nao executa importacao por si so

## 2. Sample real usado como base

O importador v1 usa como referencia direta o sample real:

- `foundry-samples/teste-background-completo.json`

Campos do sample real reaproveitados no mapeamento:

- `type: "background"`
- `img: "systems/dnd5e/icons/svg/items/background.svg"`
- `system.advancement`
- `system.description`
- `system.identifier`
- `system.source.revision`
- `system.source.rules`
- `system.startingEquipment`
- `system.wealth`

## 3. Estruturas validadas do sample

Padroes aceitos para o v1:

- `AbilityScoreImprovement`
  - `configuration.points: 3`
  - `configuration.cap: 2`
  - `value.type: "asi"`
  - `level: 0`
- `Trait` para `2` pericias a escolha
- `Trait` para `Comum` fixo e `2` escolhas entre idiomas/ferramentas

## 4. Automacoes permitidas no v1

O importador v1 automatiza apenas:

- `type: "background"`
- `system.source.rules = "2024"`
- `system.wealth = "100"`
- `system.identifier` em kebab-case sem acento
- `AbilityScoreImprovement` para o padrao `+2/+1`
- `Trait` para `2` pericias a escolha
- `Trait` para `Comum` fixo + `2` escolhas entre idiomas/ferramentas

## 5. Texto preservado

O importador v1 preserva em `system.description.value`:

- `description`
- `mechanicsSummary`
- `baseRules`
- `backgroundFeature`
- `dependencies`
- `notes`

Isso garante que a parte nao automatizada do antecedente continue visivel no item.
Em especial, a `Habilidade do Antecedente` permanece textual ate existir um item/feature real com referencia segura.

## 6. Automacoes bloqueadas no v1

Continuam bloqueados:

- `ItemGrant` da `Habilidade do Antecedente`
- `Active Effects`
- criacao de `Items` extras
- automacao do `Talento de Origem` concedido pelo antecedente
- `startingEquipment` real
- retentores
- escudeiro
- companheiro animal
- contatos e redes de apoio
- panteao/deus
- reino de origem ou reino de escolha
- veiculo aquatico
- beneficios sociais, narrativos e contextuais que dependem de adjudicacao

## 7. Regras operacionais

- o pack alvo e `bonfire-homebrew.Backgrounds`
- o importador destrava o pack antes de criar/atualizar e restaura o estado anterior depois
- a escrita e feita por nome, sem duplicar Item existente
- `effects` ficam vazios
- `system.startingEquipment` fica como lista vazia no v1

## 8. Classificacao e flags

Cada background importado registra em `flags.bonfire-homebrew`:

- `authorialId`
- `importedBy: "import-backgrounds-v1"`
- `automationClassification`
- `blockedAutomations`

Os bloqueios sao marcados por contexto, por exemplo:

- `background-feature-itemgrant-unvalidated`
- `pantheon-choice`
- `origin-kingdom`
- `contacts`
- `squire`
- `retainers`
- `animal-companion`
- `water-vehicle`
- `origin-feat-link-unvalidated`

## 9. Limite desta etapa

O objetivo do v1 e colocar os `30` antecedentes no compendium `Backgrounds` com estrutura valida de `background`, automatizando apenas o nucleo estrutural confirmado pelo sample real e deixando o restante descrito no texto.

## 10. Ajuste v2: texto oficial limpo

O v1 funcionou mecanicamente, mas levou para o item final um bloco de texto excessivamente tecnico.

Decisao do v2:

- `system.description.value` passa a conter apenas o texto oficial do antecedente
- a descricao final inclui somente:
  - a `description` oficial
  - o bloco oficial da `Habilidade do Antecedente`
- `Resumo mecanico`, `Regras base`, `Dependencias`, `Notas` e outros textos de controle ficam fora do texto visivel do item
- esses metadados podem continuar preservados em `flags.bonfire-homebrew`

Regra operacional:

- o item final nao deve exibir JSON de baseRules, pipeline, notas tecnicas ou texto de controle
- a limpeza de texto nao altera a estrutura mecanica automatizada do background

## 11. Caminho futuro v3

A `Habilidade do Antecedente` deve virar uma `Feature` separada em uma fase v3 futura.

Nesse ponto, o caminho esperado e:

- criar a `Feature` separada da habilidade
- conceder essa `Feature` via `ItemGrant` usando UUID real
- validar antes com sample especifico

Motivo da espera:

- primeiro e preciso validar os `30` textos oficiais corrigidos
- o v2 mantem a habilidade apenas como texto limpo no item do background

## 12. Plano v3: Features primeiro, Backgrounds depois

A fase v3 passa a trabalhar em dois passos:

1. importar as `Features` das `Habilidades do Antecedente` no pack `Features`
2. importar os `Backgrounds` com `ItemGrant` apontando para o `UUID` real da `Feature`

Decisao tecnica:

- o `Background` nao deve inventar `ItemGrant`
- o `Background` so grava o grant se a `Feature` correspondente existir no compendium
- o `UUID` deve ser resolvido a partir do documento real do pack, nunca deduzido
- se faltar qualquer uma das `30` Features esperadas, o fluxo deve avisar ou abortar de forma clara

Estrutura esperada da `Feature`:

- nome padrao: `Habilidade do Antecedente: <Nome do Background>`
- tipo seguro: `feat`
- descricao com apenas o texto oficial da habilidade
- sem `Active Effects`
- sem `activities`
- sem `uses`

Estrutura esperada do `ItemGrant`:

- `type: "ItemGrant"`
- `title` igual ao nome da `Feature`
- `configuration.items` com `uuid` real da `Feature`
- `configuration.optional: false`
- `configuration.spell: null`
- `value: {}`
- `level: 0`
- `hint` com o texto oficial da habilidade

Ordem operacional:

- primeiro importar as `Features`
- depois importar os `Backgrounds`
- por fim, validar se cada `Background` recebeu a `Feature` correta via `ItemGrant`

## 13. Formatação visual em negrito

A formatação visual das `Habilidades do Antecedente` e da descricao do `Background` e aplicada apenas no HTML final gerado pelos scripts.

Regras registradas:

- o texto oficial em `content/backgrounds/` permanece intacto
- nenhum JSON oficial e reescrito para destacar termos
- o negrito so envolve termos que ja existem no texto original
- o HTML final escapa conteudo com seguranca antes de inserir `<strong>`
- a mesma funcao de formatação e usada nas `Features` e nos `Backgrounds`

Objetivo da regra:

- melhorar a leitura no Foundry sem alterar a fonte autoral
- preservar parágrafos, listas e o texto original exato
- manter o comportamento conservador da v3
