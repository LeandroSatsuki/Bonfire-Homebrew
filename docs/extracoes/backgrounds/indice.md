# Extracao: Indice de Backgrounds

## 1. Fonte analisada

- pasta usada: `Temp/Background/`
- data da extracao: `2026-05-20`
- observacao: esta e a fonte oficial local salva em HTML, usada para extracao, revisao humana e modelagem; ainda nao e dado real do Foundry

## 2. Inventario dos HTMLs encontrados

### Antecedentes in Bonfire Tales RPG.html

- nome do arquivo: `Temp/Background/Antecedentes in Bonfire Tales RPG.html`
- titulo principal identificado: `Antecedentes`
- tipo sugerido: `antecedentes/backgrounds`
- observacoes:
  - o mesmo HTML contem a regra geral de antecedentes e a lista de antecedentes
  - a tabela principal possui colunas `Nome`, `Habilidade do Antecedente` e `Descricoes`
  - a fonte local permitiu identificar `30` antecedentes modelaveis

## 3. Criterios de classificacao usados

- `regra geral de background`:
  - blocos introdutorios que descrevem o que todo antecedente concede na criacao do personagem
  - nesta fonte, incluem atributos, pericias, idiomas/ferramentas, PO iniciais, habilidade do antecedente e talento de origem
- `lista de antecedentes`:
  - entradas tabulares com nome proprio de antecedente
  - nesta fonte, cada linha da tabela representa um antecedente distinto
- `habilidade de antecedente`:
  - texto da coluna `Habilidade do Antecedente`
  - descreve o beneficio especifico vinculado ao antecedente
- `dependencias externas`:
  - elementos explicitamente mencionados pela fonte que dependem de outra camada, escolha ou validacao
  - exemplos encontrados na fonte: `panteao`, `reino de origem`, `ferramenta de artesao`, `companheiro animal`, `retentores`, `contatos`, `veiculo aquatico`

## 4. Pendencias gerais

- atributos:
  - validar como um `Background` aplica `+2/+1` no `dnd5e 5.2.4`
- pericias:
  - validar como representar `2` escolhas livres de pericia
- idiomas/ferramentas:
  - validar como representar `Comum` fixo e `2` escolhas combinadas entre idiomas e/ou ferramentas
- PO iniciais:
  - validar como registrar `100 PO` iniciais
  - validar se o gasto minimo de `50 PO` em itens mundanos sera apenas textual/manual
- habilidade do antecedente:
  - validar quais habilidades sao automatizaveis e quais permanecem contextuais
- talento de origem:
  - validar como o `Background` concede ou permite escolher `1 Talento de Origem`
- automacao no Foundry:
  - validar como `background` real combina `advancement`, `startingEquipment` e concessao de `feat`
- relacao com o futuro pack Backgrounds:
  - ainda nao criar pack `Backgrounds`
  - validar manualmente o fluxo antes de qualquer alteracao em `module.json`
