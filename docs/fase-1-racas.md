# Fase 1: Racas / Species

## Objetivo da fase

Preparar um fluxo seguro para criar e validar species do modulo Bonfire Homebrew usando o sistema `dnd5e` 5.2.4+ no Foundry VTT v13.

Nesta fase, a meta nao e produzir conteudo em massa. A meta e confirmar processo, padrao autoral e mapeamento para o tipo real `race`.

## Fluxo seguro de criacao de raca

1. Preencher um arquivo autoral em `content/species/` com os dados de planejamento da species.
2. Revisar se o material autoral esta consistente com as convencoes do projeto.
3. Confirmar no Foundry quais campos reais do item `race` precisam ser preenchidos para a species funcionar.
4. Criar um item de teste no Foundry manualmente, sem editar `packs/` por fora.
5. Preencher apenas os campos validados no proprio Foundry.
6. Testar o item em um ator de teste antes de salvar em compendium.
7. Exportar ou inspecionar o resultado somente para comparacao e documentacao.
8. So depois da validacao funcional considerar a species pronta para entrar em pack.

## Quais campos devem ser definidos pelo autor

Campos autorais esperados no template de species:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `description`
- `size`
- `movement`
- `creatureType`
- `languages`
- `traits`
- `grantedFeatures`
- `racialFeatEligibility`
- `notes`

Esses campos existem para planejamento e revisao interna. Eles nao sao, por si so, o schema nativo final do Foundry.

## Quais campos devem ser validados dentro do Foundry

Os seguintes pontos dependem de validacao dentro do Foundry antes de qualquer uso em compendium:

- imagem padrao ou imagem propria do item `race`
- valor real de `system.type.value` para a especie desejada
- configuracao de `system.movement`
- configuracao de `system.senses`
- estrutura correta de `system.advancement`
- comportamento de idiomas e proficiencias, se aplicavel
- uso ou nao de `effects`
- necessidade real de features concedidas no item base ou em itens separados

Tambem precisam ser confirmados no Foundry:

- se a species usa somente o bloco inicial de `Size` ou se exige outros advancements
- como vincular futuros talentos raciais sem criar dependencia prematura
- como a species se comporta ao ser aplicada em um ator limpo

## Como testar uma raca antes de salvar no compendium

1. Criar um item novo do tipo `race` no Foundry.
2. Preencher o minimo necessario com base no template autoral.
3. Definir tamanho, movimento e tipo de criatura conforme o caso em teste.
4. Vincular a species a um ator de teste.
5. Conferir se o ator recebe o comportamento esperado sem erros de sistema.
6. Validar ficha, movement, senses e eventuais advancements.
7. Revisar o JSON exportado apenas como evidencia tecnica, nao como fonte primaria de autoria.

## Criterios de pronto para considerar uma raca validada

- o conceito autoral esta completo no arquivo de `content/species/`
- o `id` segue o padrao interno do projeto
- o tipo real no Foundry foi confirmado como `race`
- tamanho, movimento e tipo de criatura foram testados no Foundry
- o item pode ser aplicado a um ator sem erro
- os campos tecnicos usados no Foundry foram revisados contra o mapeamento atual
- nao houve necessidade de editar `packs/` manualmente
- duvidas remanescentes ficaram documentadas antes de avancar

## Riscos comuns

- tratar o template autoral como se fosse JSON final do Foundry
- preencher manualmente campos gerados pelo Foundry, como `_id`, `_stats` e `ownership`
- assumir valores de `system.type.value` sem validar no Foundry
- misturar dados de species com talentos raciais antes da fase correta
- colocar automacao em `effects` cedo demais
- tentar salvar direto em compendium antes de testar em ator
- editar arquivos dentro de `packs/` por fora do Foundry

## Checklist de validacao

- `id` sem acento e sem espaco
- `name` revisado
- `type` autoral definido como `species`
- `foundryType` definido como `race`
- `source` preenchido
- `rules` preenchido com `2024` quando aplicavel
- `status` definido
- `description` minimamente clara
- `size` definido
- `movement` definido
- `creatureType` definido
- `languages` revisado
- `traits` listados
- `grantedFeatures` revisado sem criar feature real nesta fase
- `racialFeatEligibility` anotado
- validacao manual feita no Foundry
- teste em ator concluido
- nenhuma edicao manual em `packs/`

## Observacoes finais

- `content/species/` continua sendo fonte autoral.
- O item final do Foundry deve ser criado e validado no proprio Foundry.
- Subclasses continuam fora de escopo.
- Talentos raciais e features concedidas por species nao devem ser implementados como conteudo real nesta etapa.
