# Importacao v1 de Backgrounds

## 1. Objetivo

Criar o primeiro importador real de `Backgrounds` do modulo Bonfire Homebrew para o pack:

- `bonfire-homebrew.Backgrounds`

Escopo da v1:

- converter a fonte autoral em `content/backgrounds/`
- criar ou atualizar `Items` de `type: "background"`
- importar os `30` backgrounds com `ASI`, `Traits` e texto completo
- automatizar apenas os blocos validados no sample real do Foundry

## 2. Escopo dos 30 backgrounds

O indice atual contem `30` antecedentes:

- `Acolito`
- `Antropologista`
- `Arqueologista`
- `Artista`
- `Assombrado`
- `Astronomo`
- `Campeao`
- `Cavaleiro`
- `Charlatao`
- `Criminoso`
- `Detetive`
- `Espiao`
- `Espiritualista`
- `Estudante de Arcanofisica`
- `Estudante de Arqueomancia`
- `Estudante de Biomancia`
- `Estudante de Estequiomancia`
- `Estudante de Nanquinomancia`
- `Guardiao da Natureza`
- `Heroi`
- `Legionario`
- `Marcado Pelas Fadas`
- `Mercenario`
- `Mestre Artesao`
- `Nobre`
- `Pescador`
- `Pesquisador`
- `Soldado`
- `Viajante`
- `Viajante do Mar`

## 3. Automacoes da v1

Automatizado:

- `AbilityScoreImprovement` para `+2/+1`
- `Trait` para `2` pericias a escolha
- `Trait` para `Comum` fixo + `2` escolhas entre idiomas/ferramentas
- `system.wealth = "100"`
- preservacao textual completa de `description`, `mechanicsSummary`, `baseRules`, `backgroundFeature`, `dependencies` e `notes`

Nao automatizado:

- `Talento de Origem`
- `ItemGrant`
- `startingEquipment`
- `Active Effects`
- beneficios sociais, narrativos e contextuais
- retentores
- escudeiro
- companheiro animal
- contatos
- panteao/deus
- reino de origem
- veiculo aquatico

## 4. Riscos conhecidos

- o vinculo estrutural do `Talento de Origem` ainda nao apareceu de forma explicita no sample real de `background`
- a `Habilidade do Antecedente` permanece apenas no texto ate existir item/feature real com referencia segura
- o `ItemGrant` foi removido por seguranca no v1
- backgrounds com dependencias narrativas fortes continuam dependentes de uso manual pelo mestre
- `startingEquipment` permanece vazio no v1, mesmo com a regra textual de gasto minimo em itens mundanos
- alguns antecedentes carregam dependencias contextuais amplas, como redes de contato, status social, panteao e reino de origem

## 5. Criterios de aceite

- [ ] ler `content/backgrounds/_index.json`
- [ ] importar para `bonfire-homebrew.Backgrounds`
- [ ] criar/atualizar por nome, sem duplicar
- [ ] usar `type: "background"`
- [ ] usar `system.source.rules: "2024"`
- [ ] usar `system.wealth: "100"`
- [ ] preservar texto em `system.description.value`
- [ ] nao criar `Active Effects`
- [ ] nao criar `Items` extras
- [ ] nao criar `ItemGrant`
- [ ] registrar `flags.bonfire-homebrew`
- [ ] imprimir resumo final com criados, atualizados, comASI, comTraits, somenteTexto e erros

## 6. Saida esperada

Ao final da importacao v1, o pack `Backgrounds` deve conter antecedentes validos para o Foundry com a camada estrutural central pronta e o restante documentado no texto do item para uso manual seguro.

## 7. Ajuste v2: texto oficial limpo

O v1 funcionou mecanicamente, mas o texto importado no item final ainda carregava resumo mecanico, regras base em JSON, dependencias, notas e outros trechos tecnicos.

O v2 corrige isso:

- `system.description.value` passa a usar apenas o texto oficial do antecedente
- o texto final mostra somente:
  - a descricao original oficial
  - o bloco oficial da `Habilidade do Antecedente`
- `Resumo mecanico`, `Regras base`, `Dependencias`, `Notas` e texto de pipeline deixam de aparecer no item
- esses dados continuam preservados como metadados do conteúdo, quando necessario

O caminho de `ItemGrant` e `Feature` separada fica reservado para a fase v3, depois que os `30` textos oficiais estiverem validados e limpos.
