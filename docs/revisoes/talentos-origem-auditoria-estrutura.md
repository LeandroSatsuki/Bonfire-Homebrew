# Auditoria de Estrutura dos Talentos de Origem Autorais

## 1. Escopo da auditoria

Esta auditoria verifica a consistencia estrutural da primeira geracao real autoral de `Talentos de Origem` em `content/origin-feats/`, sem converter nada para o schema final do Foundry e sem alterar os arquivos auditados.

Fontes consultadas:

- `docs/extracoes/talentos/talentos-de-origem.md`
- `docs/sistemas/talentos-gerais-e-origem.md`
- `docs/sistemas/backgrounds.md`
- `docs/revisoes/talentos-origem-primeira-geracao.md`
- `content/origin-feats/_index.json`
- todos os `42` arquivos JSON de `content/origin-feats/`, excluindo `_index.json`

## 2. Quantidade

- existem exatamente `42` arquivos JSON de talento de origem, excluindo `_index.json`: `sim`
- `_index.json` possui `count: 42`: `sim`
- `_index.json` referencia todos os arquivos existentes: `sim`
- existem arquivos orfaos fora do indice: `nao`
- existem entradas no indice sem arquivo correspondente: `nao`

## 3. Estrutura JSON

Todos os `42` arquivos auditados contem as chaves esperadas:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `featCategory`
- `availableAtCharacterCreation`
- `linkedBackgroundRule`
- `prerequisites`
- `description`
- `mechanicsSummary`
- `benefits`
- `grantedSpells`
- `grantedProficiencies`
- `uses`
- `automation`
- `dependencies`
- `questions`
- `notes`

Resultado: `sem problemas estruturais criticos identificados`

## 4. Valores esperados

Todos os `42` arquivos auditados atendem aos valores-base esperados:

- `type = "origin-feat"`
- `foundryType = "feat"`
- `rules = "2024"`
- `status = "authorial-draft"`
- `featCategory = "origin"`
- `availableAtCharacterCreation = true`
- `linkedBackgroundRule.backgroundsChooseOneOriginFeat = true`
- `linkedBackgroundRule.status = "pending-explicit-foundry-link"`

Resultado: `sem divergencias encontradas`

## 5. IDs e nomes

Verificacoes realizadas:

- `id` em `kebab-case`
- nome de arquivo correspondente ao `id`
- ausencia de `id` duplicado
- ausencia de `name` duplicado

Resultado:

- `42/42` arquivos com `id` valido em `kebab-case`
- `42/42` arquivos com nome de arquivo compativel com o `id`
- nenhum `id` duplicado
- nenhum `name` duplicado

## 6. Fidelidade minima a extracao

Comparacao feita contra `docs/extracoes/talentos/talentos-de-origem.md`.

Resultado geral:

- todos os `42` talentos existem na extracao: `sim`
- todos os `42` talentos possuem `description` preenchida: `sim`
- todos os `42` talentos possuem `mechanicsSummary` preenchido: `sim`
- os `benefits` preservam beneficios mecanicos identificaveis da extracao: `sim`
- `grantedSpells` nao ignoram magias explicitas detectaveis na extracao: `sim`
- `grantedProficiencies` nao ignoram proficiencias explicitas detectaveis na extracao: `sim`
- `uses.scalesWithProficiency` foi marcado quando a extracao indica uso por `Bonus de Proficiencia`: `sim`
- `dependencies` nao ignoram dependencias explicitas da extracao: `sim`
- `questions` preservam duvidas relevantes quando existiam na extracao: `sim`

Observacao:

- nesta etapa, a auditoria nao reescreve conteudo e nao reclassifica texto; ela apenas verifica presenca, coerencia estrutural e preservacao minima das informacoes extraidas.

## 7. Classificacao de automacao

### automation = `sim`

- `Brigão de Taverna`
- `Curandeiro`
- `Habilidoso`
- `Língua de Prata`
- `Menestrel Viajante`
- `Neófito dos Caminhos de Eldára`

### automation = `parcial`

- `Alerta`
- `Assecla do Reinado Dracônico`
- `Atacante Selvagem`
- `Caçador de Vampiros`
- `Cão de Caça`
- `Centelha de Fogo Espiritual`
- `Escudeiro do Amanhecer`
- `Espião do Submundo`
- `Explorador de Masmorras`
- `Favorecido pelo Divino`
- `Folião Incansável`
- `Iluminado pelo Primeiro Feixe`
- `Iniciado do Convento`
- `Iniciado em Magia`
- `Iniciado na Ordem de Cavalaria Auralina`
- `Iniciado no Juramento das Três Luas`
- `Joguete de Vampiro`
- `Marca Anômala`
- `Marca Arcana da Busca`
- `Marca Arcana da Criação`
- `Marca Arcana da Escrita`
- `Marca Arcana da Proteção`
- `Marca Arcana da Restauração`
- `Marca Arcana da Revelação`
- `Marca Arcana da Tormenta`
- `Marca Arcana da Travessia`
- `Marca Arcana da Vigília`
- `Marca Arcana do Pastoreio`
- `Marca Arcana do Refúgio`
- `Marca Arcana do Véu`
- `Músico`
- `Ninja de Hanryo`
- `Porta-Estandarte da Wyrm`
- `Robusto`
- `Sortudo`
- `Veterano Mercenário`

### automation = `nao`

- nenhum

Registro da auditoria:

- a maioria dos talentos ficou em `automation = "parcial"`
- isso e aceitavel nesta primeira geracao autoral
- a classificacao pode ser refinada depois, especialmente nos talentos com magia, reacao, descanso, escolhas abertas e sistemas proprios do cenario

## 8. Categorias de risco

### Talentos que concedem magia

- `Centelha de Fogo Espiritual`
- `Favorecido pelo Divino`
- `Iluminado pelo Primeiro Feixe`
- `Iniciado do Convento`
- `Iniciado em Magia`
- `Iniciado no Juramento das Três Luas`
- `Marca Anômala`
- `Marca Arcana da Criação`
- `Marca Arcana da Escrita`
- `Marca Arcana da Tormenta`
- `Marca Arcana do Véu`
- `Neófito dos Caminhos de Eldára`

### Talentos com uso por Bônus de Proficiência

- `Assecla do Reinado Dracônico`
- `Centelha de Fogo Espiritual`
- `Escudeiro do Amanhecer`
- `Explorador de Masmorras`
- `Folião Incansável`
- `Joguete de Vampiro`
- `Marca Arcana da Vigília`
- `Sortudo`

### Talentos com reação ou gatilho de combate

- `Alerta`
- `Caçador de Vampiros`
- `Centelha de Fogo Espiritual`
- `Explorador de Masmorras`
- `Iniciado do Convento`
- `Iniciado na Ordem de Cavalaria Auralina`
- `Marca Anômala`
- `Marca Arcana da Vigília`
- `Ninja de Hanryo`
- `Porta-Estandarte da Wyrm`
- `Sortudo`
- `Veterano Mercenário`

### Talentos ligados a Marcas

- `Marca Anômala`
- `Marca Arcana da Busca`
- `Marca Arcana da Criação`
- `Marca Arcana da Escrita`
- `Marca Arcana da Proteção`
- `Marca Arcana da Restauração`
- `Marca Arcana da Revelação`
- `Marca Arcana da Tormenta`
- `Marca Arcana da Travessia`
- `Marca Arcana da Vigília`
- `Marca Arcana do Pastoreio`
- `Marca Arcana do Refúgio`
- `Marca Arcana do Véu`

### Talentos ligados a ordens, juramentos, dragões ou sistemas próprios

- `Assecla do Reinado Dracônico`
- `Explorador de Masmorras`
- `Iniciado no Juramento das Três Luas`
- `Marca Anômala`
- `Marca Arcana da Busca`
- `Marca Arcana da Criação`
- `Marca Arcana da Escrita`
- `Marca Arcana da Proteção`
- `Marca Arcana da Restauração`
- `Marca Arcana da Revelação`
- `Marca Arcana da Tormenta`
- `Marca Arcana da Travessia`
- `Marca Arcana da Vigília`
- `Marca Arcana do Pastoreio`
- `Marca Arcana do Refúgio`
- `Marca Arcana do Véu`
- `Porta-Estandarte da Wyrm`

### Talentos com escolhas abertas de atributo, perícia, ferramenta, magia ou truque

- `Centelha de Fogo Espiritual`
- `Favorecido pelo Divino`
- `Habilidoso`
- `Iluminado pelo Primeiro Feixe`
- `Iniciado do Convento`
- `Iniciado em Magia`
- `Iniciado no Juramento das Três Luas`
- `Marca Anômala`
- `Menestrel Viajante`
- `Neófito dos Caminhos de Eldára`

## 9. Verificacao de codificacao textual

Resultado:

- os arquivos JSON de `content/origin-feats/` nao apresentaram caracteres corrompidos `�`
- o arquivo `docs/revisoes/talentos-origem-primeira-geracao.md` apresentou sinais de corrupcao textual aparente com `?` em pontos onde o texto deveria manter acentuacao normal

Impacto:

- isso nao quebra a estrutura dos `42` JSONs autorais
- afeta, sim, a legibilidade e a confiabilidade editorial do documento de revisao
- nesta auditoria, esse problema fica registrado como `problema medio`

## 10. Riscos encontrados

### Problemas criticos

- nenhum problema critico encontrado

### Problemas medios

- `docs/revisoes/talentos-origem-primeira-geracao.md` contem caracteres corrompidos aparentes, com `?` em texto que deveria manter acentuacao normal

### Observacoes menores

- a maioria dos talentos esta em `automation = "parcial"`, o que e coerente com a complexidade desta geracao
- ha concentracao relevante de talentos com magia, reacoes, gatilhos, `Bonus de Proficiencia` e sistemas proprios, o que naturalmente aumenta o custo de futura conversao para Foundry

## 11. Recomendacao

Status recomendado: `aprovada com ressalvas`

Justificativa:

- a geracao autoral esta consistente em quantidade, indice, estrutura, valores-base, ids e preservacao minima da extracao
- nao foram encontrados bloqueios estruturais nos `42` JSONs
- a principal ressalva atual esta na codificacao textual do documento de revisao, nao na estrutura dos dados autorais

## 12. Resumo executivo

- talentos auditados: `42`
- consistencia do `_index.json`: `ok`
- consistencia estrutural dos JSONs: `ok`
- fidelidade minima a extracao: `ok`
- problema medio principal: `codificacao textual em docs/revisoes/talentos-origem-primeira-geracao.md`
- recomendacao final: `aprovada com ressalvas`
