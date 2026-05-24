# Decisao de organizacao de compendiums

## 1. Status

- `escopo/decisao tecnica`
- ainda nao altera `module.json`
- ainda nao cria packs reais

## 2. Base tecnica considerada

Base considerada para esta decisao:

- Foundry VTT `v13`
- `dnd5e 5.2.4+`
- regra base `D&D 2024`
- `Background` usa `type: "background"`
- `Talento Geral` usa `type: "feat"`
- `Talento de Origem` usa `type: "feat"` com `system.type.subtype = "origin"`
- `Talento Racial` usa `type: "feat"`, mas e categoria autoral propria
- `Race/Species` usa `type: "race"`
- features raciais provavelmente usam `type: "feat"`

Contexto atual observado no `module.json`:

- ja existem os packs `Regras`, `Racas`, `TalentosRaciais`, `Classes`, `Subclasses`, `Features` e `Macros`
- ainda nao existe pack `Backgrounds`
- ainda nao existe pack separado para `TalentosOrigem`
- ainda nao existe pack separado para `TalentosGerais`

## 3. Organizacao recomendada

### `Backgrounds`

- tipo: `Item`
- `documentName`: `Item`
- `type` real: `background`
- origem autoral: `content/backgrounds/`

### `TalentosOrigem`

- tipo: `Item`
- `documentName`: `Item`
- `type` real: `feat`
- subtype esperado: `origin`
- origem autoral: `content/origin-feats/`

### `TalentosGerais`

- tipo: `Item`
- `documentName`: `Item`
- `type` real: `feat`
- origem autoral: `content/general-feats/`

### `TalentosRaciais`

- tipo: `Item`
- `documentName`: `Item`
- `type` real: `feat`
- origem autoral futura: `content/racial-feats/`

### `Racas`

- tipo: `Item`
- `documentName`: `Item`
- `type` real: `race`
- origem autoral futura: `content/species/`

### `Features`

- tipo: `Item`
- `documentName`: `Item`
- `type` real provavel: `feat`
- origem autoral futura: `content/features/`

## 4. Justificativa

- `Talentos de Origem` devem ficar separados de `Talentos Gerais` porque o Foundry exportou `system.type.subtype = "origin"` em samples reais como `Habilidoso`.
- `Backgrounds` devem ter pack proprio porque usam `type: "background"` e ja foram validados tecnicamente como uma categoria distinta de `feat`.
- `Talentos Raciais` devem ficar separados porque possuem vinculo autoral com `raca/species`, podem ter progressao racial propria e nao devem ser misturados com feats gerais escolhidos por outras regras.
- features raciais devem ficar separadas dos talentos para evitar misturar traços concedidos automaticamente com escolhas de evolucao do personagem.
- `Racas` devem continuar separadas porque usam `type: "race"` e possuem estrutura propria de advancement diferente da familia de `feat`.
- `Features` continua sendo uma categoria util para traços e recursos nao enquadrados como `Background`, `Race` ou talentos de escolha separados.

## 5. Pendencias antes de alterar `module.json`

- conferir os nomes atuais dos packs existentes no `module.json`
- decidir se `Backgrounds` sera pack novo
- decidir se `TalentosOrigem` sera pack novo
- decidir se `TalentosGerais` sera pack novo ou se usara `Features`
- decidir a convencao exata de nomes de pastas em `packs/`
- criar backup ou commit limpo antes de qualquer alteracao em `module.json`
- nao mexer em `packs/` com o Foundry aberto

## 6. Criterios para liberar alteracao real do `module.json`

- [ ] decisao documentada
- [ ] `git status` limpo
- [ ] Foundry fechado
- [ ] autorizacao explicita do autor
- [ ] plano de rollback claro
- [ ] alteracao revisada antes de abrir o Foundry
