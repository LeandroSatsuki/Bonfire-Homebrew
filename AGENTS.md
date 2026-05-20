# AGENTS.md

## Contexto do projeto

Este repositório é a pasta raiz de um módulo de conteúdo homebrew para Foundry VTT.

Versões-alvo:
- Foundry VTT: Version 13 Stable - Build 351 ou superior
- Sistema: dnd5e 5.2.4 ou superior
- Regra base: D&D 2024
- Plutonium: 2.13.12

O objetivo do módulo é organizar conteúdo homebrew jogável para Foundry dnd5e, começando nesta ordem:

1. Raças / Species
2. Talentos raciais
3. Talentos / Features
4. Backgrounds
5. Classes
6. Subclasses, somente depois de validar os itens anteriores

Subclasses devem ser tratadas depois, uma por vez. Não gerar subclasses agora.

## Objetivo técnico

Este módulo deve funcionar como fonte organizada de compendiums para Foundry VTT dnd5e.

O conteúdo deve ser criado pensando em uso real no Foundry:
- Items funcionais
- Advancements quando aplicável
- Active Effects quando aplicável
- Compendium packs organizados
- Estrutura compatível com Foundry VTT v13 e dnd5e 5.2.4+

## Regras de trabalho

Nunca invente estrutura do Foundry se a pasta não tiver exemplo real.

Antes de alterar arquivos:
1. Inspecione a estrutura atual.
2. Leia o manifest/module.json ou manifest.json existente.
3. Identifique packs/compendiums já criados.
4. Identifique scripts, languages, templates e assets existentes.
5. Gere um relatório em Markdown explicando o estado atual.

Não criar conteúdo em massa.

Não criar raça, classe, talento, background ou subclasse ainda.

Não alterar o ID do módulo sem autorização.

Não alterar o manifest sem explicar antes.

Não apagar arquivos.

Não modificar arquivos de banco de compendium sem backup ou sem entender o formato.

Não usar material oficial protegido de D&D que não esteja no SRD/licenciado para redistribuição.

## Organização desejada

Se ainda não existir, a estrutura futura pode usar:

- docs/
- content/species/
- content/racial-feats/
- content/features/
- content/backgrounds/
- content/classes/
- content/subclasses/
- foundry-samples/
- scripts/
- dist/

Mas a primeira tarefa é apenas analisar a pasta e propor a estrutura, não criar tudo automaticamente.

## Padrão de conteúdo

Todo conteúdo homebrew deve ter pelo menos:

- id
- name
- type
- source
- category
- rulesText
- description
- foundryType
- status

Tipos iniciais esperados:

- species
- racial-feat
- feature
- background
- class
- subclass

## Foundry dnd5e

Usar Advancements para progressão de:
- Species / Race
- Background
- Class
- Subclass, futuramente

Usar Active Effects apenas quando a automação for simples e segura.

Exemplos de Active Effects aceitáveis:
- bônus de CA
- bônus de HP por nível
- proficiência
- deslocamento
- resistência
- bônus de teste ou salvaguarda

Se houver dúvida sobre caminho de dados do dnd5e, documentar a dúvida em vez de inventar.

## Plutonium

O Plutonium será considerado apenas como ferramenta de importação ou comparação posterior.

Não depender do Plutonium como estrutura principal do módulo.

A estrutura principal deve ser compatível com Foundry dnd5e nativo.

## Primeira etapa

A primeira tarefa do Codex neste projeto deve ser:

1. Inspecionar a pasta.
2. Explicar o que existe.
3. Identificar o manifesto do módulo.
4. Identificar compendiums existentes.
5. Sugerir estrutura mínima segura.
6. Criar um plano de implementação em etapas.
7. Não alterar arquivos sem autorização explícita.