# Auditoria de Estrutura dos Backgrounds Autorais

## 1. Escopo da auditoria

Esta auditoria verifica a consistencia estrutural da primeira geracao real autoral de `Backgrounds` em `content/backgrounds/`, sem converter nada para o schema final do Foundry e sem alterar os arquivos auditados.

Fontes consultadas:

- `docs/extracoes/backgrounds/antecedentes.md`
- `docs/sistemas/backgrounds.md`
- `docs/revisoes/backgrounds-primeira-geracao.md`
- `content/backgrounds/_index.json`
- todos os `30` arquivos JSON de `content/backgrounds/`, excluindo `_index.json`

## 2. Quantidade

- existem exatamente `30` arquivos JSON de background, excluindo `_index.json`: `sim`
- `_index.json` possui `count: 30`: `sim`
- `_index.json` referencia todos os arquivos existentes: `sim`
- existem arquivos orfaos fora do indice: `nao`
- existem entradas no indice sem arquivo correspondente: `nao`

## 3. Estrutura JSON

Todos os `30` arquivos auditados contem as chaves esperadas:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `baseRules`
- `backgroundFeature`
- `description`
- `mechanicsSummary`
- `automation`
- `dependencies`
- `notes`

Resultado: `sem problemas estruturais criticos identificados`

## 4. Valores esperados

Todos os `30` arquivos auditados atendem aos valores-base esperados:

- `type = "background"`
- `foundryType = "background"`
- `rules = "2024"`
- `status = "authorial-draft"`
- `baseRules.startingGold = 100`
- `baseRules.mundaneGoldRequirement = 50`
- `baseRules.fixedLanguages` inclui `Comum`
- `baseRules.originFeatChoice.count = 1`

Resultado: `sem divergencias encontradas`

## 5. IDs e nomes

Verificacoes realizadas:

- `id` em `kebab-case`
- nome de arquivo correspondente ao `id`
- ausencia de `id` duplicado
- ausencia de `name` duplicado

Resultado:

- `30/30` arquivos com `id` valido em `kebab-case`
- `30/30` arquivos com nome de arquivo compativel com o `id`
- nenhum `id` duplicado
- nenhum `name` duplicado

## 6. Fidelidade minima a extracao

Comparacao feita contra `docs/extracoes/backgrounds/antecedentes.md`.

Resultado geral:

- todos os `30` backgrounds existem na extracao: `sim`
- todos os `30` backgrounds possuem `backgroundFeature` preenchido: `sim`
- as `dependencies` nao ignoram dependencias explicitas da extracao: `sim`
- as `questions` preservam duvidas relevantes quando existiam na extracao: `sim`

Observacao:

- nesta etapa, a auditoria nao reescreve conteudo e nao reclassifica texto; ela apenas verifica presenca, coerencia estrutural e preservacao minima das informacoes extraidas.

## 7. Classificacao de automacao

### automation = `sim`

- nenhum

### automation = `parcial`

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

### automation = `nao`

- nenhum

Registro da auditoria:

- todos os `30` backgrounds estao classificados como `automation = "parcial"`
- isso e aceitavel nesta primeira geracao autoral
- a classificacao pode ser refinada depois, especialmente quando houver separacao melhor entre beneficios mecanicos simples, efeitos puramente narrativos e dependencias contextuais

## 8. Riscos encontrados

### Problemas criticos

- nenhum problema critico encontrado

### Problemas medios

- nenhum problema medio encontrado

### Observacoes menores

- todos os `30` backgrounds usam `backgroundFeature.name = "Habilidade do Antecedente"`
- isso nao quebra a estrutura, mas pode merecer refinamento futuro caso algumas habilidades passem a receber nomes autorais mais especificos
- todos os `30` backgrounds estao em `automation = "parcial"`, o que simplifica a primeira geracao, mas ainda nao diferencia casos mais simples de casos fortemente narrativos

## 9. Recomendacao

Status recomendado: `aprovada com ressalvas`

Justificativa:

- a geracao autoral esta consistente em quantidade, indice, estrutura, valores-base, ids e preservacao minima da extracao
- nao foram encontrados bloqueios estruturais
- as ressalvas sao de refinamento editorial e classificacao futura, nao de correcao obrigatoria imediata

## 10. Resumo executivo

- backgrounds auditados: `30`
- consistencia do `_index.json`: `ok`
- consistencia estrutural dos JSONs: `ok`
- fidelidade minima a extracao: `ok`
- bloqueios para seguir: `nenhum`
- recomendacao final: `aprovada com ressalvas`
