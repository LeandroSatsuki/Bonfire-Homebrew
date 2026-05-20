# Convenções

## Idioma

O idioma principal do projeto é português brasileiro.

## Nomes internos e labels

- Nomes internos devem ser sem acento e sem espaço.
- Labels e nomes de exibição podem ser em português.
- A padronização de nomes deve ser mantida antes da criação de conteúdo mecânico.

## Packs do Foundry

- A pasta `packs/` deve ser editada apenas pelo Foundry VTT ou por ferramenta validada para esse fluxo.
- Não editar manualmente os bancos de compendium.
- Não presumir estrutura interna de banco sem validação prévia.

## Content como fonte autoral

- A pasta `content/` é uma área de fonte autoral, planejamento e organização de trabalho.
- O conteúdo em `content/` não representa diretamente o schema nativo do Foundry.
- Qualquer mapeamento entre material autoral e dados do Foundry deve ser validado antes de entrar em compendium.

## Ordem de implementação

- Primeiro: raças / species.
- Depois: talentos raciais.
- Depois: talentos / features.
- Depois: backgrounds.
- Depois: classes.
- Subclasses somente depois da validação de raça, talentos raciais, features, backgrounds e classes.

## Subclasses

- Não criar subclasses nesta etapa.
- Quando a fase de subclasses chegar, trabalhar uma por vez.

## Plutonium

- O Plutonium é ferramenta auxiliar.
- O módulo não deve depender estruturalmente do Plutonium.
- A estrutura principal deve continuar compatível com o Foundry VTT e o `dnd5e` nativos.
