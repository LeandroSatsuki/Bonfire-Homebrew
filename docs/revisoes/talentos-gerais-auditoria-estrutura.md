# Auditoria de Estrutura dos Talentos Gerais Autorais

## 1. Escopo da auditoria

Esta auditoria verifica a consistência estrutural da primeira geração real autoral de `Talentos Gerais / Feats` em `content/general-feats/`, sem converter nada para o schema final do Foundry e sem alterar os arquivos auditados.

Fontes consultadas:

- `docs/extracoes/talentos/talentos-feat.md`
- `docs/sistemas/talentos-gerais-e-origem.md`
- `docs/mapeamento-foundry.md`
- `docs/revisoes/talentos-gerais-primeira-geracao.md`
- `content/general-feats/_index.json`
- todos os `96` arquivos JSON de `content/general-feats/`, excluindo `_index.json`

## 2. Quantidade

- existem exatamente `96` arquivos JSON de talento geral, excluindo `_index.json`: `sim`
- `_index.json` possui `count: 96`: `sim`
- `_index.json` referencia todos os arquivos existentes: `sim`
- existem arquivos órfãos fora do índice: `não`
- existem entradas no índice sem arquivo correspondente: `não`

Resultado: `quantidade e indexação consistentes`

## 3. Estrutura JSON

Todos os `96` arquivos auditados contêm as chaves esperadas:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `featCategory`
- `minimumLevel`
- `abilityIncrease`
- `prerequisites`
- `description`
- `mechanicsSummary`
- `benefits`
- `grantedSpells`
- `grantedProficiencies`
- `uses`
- `actions`
- `automation`
- `dependencies`
- `questions`
- `notes`

Resultado: `sem problemas estruturais críticos identificados`

## 4. Valores esperados

Todos os `96` arquivos auditados atendem aos valores-base esperados:

- `type = "general-feat"`
- `foundryType = "feat"`
- `rules = "2024"`
- `status = "authorial-draft"`
- `featCategory = "general"`

Resultado: `sem divergências encontradas`

## 5. IDs e nomes

Verificações realizadas:

- `id` em `kebab-case`
- nome de arquivo correspondente ao `id`
- ausência de `id` duplicado
- ausência de `name` duplicado

Resultado:

- `96/96` arquivos com `id` válido em `kebab-case`
- `96/96` arquivos com nome de arquivo compatível com o `id`
- nenhum `id` duplicado
- nenhum `name` duplicado

## 6. Fidelidade mínima à extração

Comparação feita contra `docs/extracoes/talentos/talentos-feat.md`.

Resultado geral:

- todos os `96` talentos existem na extração: `sim`
- todos os `96` talentos possuem `description` preenchida: `sim`
- todos os `96` talentos possuem `mechanicsSummary` preenchido: `sim`
- os `benefits` preservam benefícios mecânicos identificáveis da extração: `sim`
- `minimumLevel` preserva nível mínimo quando a fonte indica: `sim`, com `2` talentos sem nível identificado na fonte (`Mestre Pistoleiro` e `Linguista`)
- `prerequisites` preservam pré-requisitos explícitos: `sim`
- `grantedSpells` não ignoram magias explicitamente concedidas: `sem falhas evidentes`
- `uses` preservam usos limitados e usos por `Bônus de Proficiência` quando identificados: `sim`
- `actions` preservam ação, ação bônus, reação e gatilhos quando identificáveis: `sem falhas críticas`
- `dependencies` preservam dependências explícitas: `sim`
- `questions` preservam dúvidas relevantes: `sim`

Ressalvas encontradas nesta etapa:

- `Treinamento Moderado` tem benefício explícito de treinamento com armaduras leves, armaduras médias e escudos na extração, mas `grantedProficiencies` ficou vazio.
- `Adepto do Fogo Espiritual`, `Formação Bastiônica`, `Perfurador` e `Tocado pelo Nó do Selamento` têm `abilityIncrease.description` com texto excedente além da linha de aumento de atributo.
- `Adepto do Fogo Espiritual`, `Formação Bastiônica` e `Perfurador` também merecem revisão manual de `abilityIncrease.options`, porque o campo parece mais restrito do que a linha extraída sugere.

## 7. Classificação de automação

### automation = `sim` (`9`)

- `Adepto Elemental`
- `Atleta`
- `Curandeiro de Batalha`
- `Especialista em Perícias`
- `Maestria em Armaduras Médias`
- `Resiliente`
- `Sentinela`
- `Treinamento com Armas Marciais`
- `Velocista`

### automation = `parcial` (`87`)

- `Adepto Marcial`
- `Adepto Místico`
- `Adepto da Dor`
- `Adepto da Hemomancia`
- `Adepto da Veste Branca`
- `Adepto da Veste Negra`
- `Adepto da Veste Vermelha`
- `Adepto de Metamagia`
- `Adepto do Fogo Espiritual`
- `Apodrecer`
- `Asas Templárias do Pacto de Luz`
- `Atirador de Magias`
- `Ator`
- `Brumas Ofuscantes`
- `Bênçãos dos Caminhos de Eldára`
- `Cartomante`
- `Cavaleiro da Lâmina do Albor`
- `Cavaleiro do Escudo Brilhante`
- `Cavaleiro do Voto Branco`
- `Chef`
- `Combatente Montado`
- `Conjurador Relâmpago`
- `Conjurador de Guerra`
- `Determinação da Cavalaria`
- `Dom da Infusão Elemental`
- `Dom do Ímpeto Telecinético`
- `Duelista Defensivo`
- `Durável`
- `Envenenador`
- `Especialista em Besta`
- `Espreitador`
- `Estigma Dracônico`
- `Formação Bastiônica`
- `Guerreiro Hemomante`
- `Iniciado Artífice`
- `Investida`
- `Legado do Norte`
- `Linguista`
- `Luchador`
- `Líder Inspirador`
- `Magia Ancestral Zouhri`
- `Marca Anômala Maior`
- `Marca Arcana Superior da Busca`
- `Marca Arcana Superior da Criação`
- `Marca Arcana Superior da Escrita`
- `Marca Arcana Superior da Proteção`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior da Revelação`
- `Marca Arcana Superior da Tormenta`
- `Marca Arcana Superior da Travessia`
- `Marca Arcana Superior da Vigília`
- `Marca Arcana Superior do Pastoreio`
- `Marca Arcana Superior do Refúgio`
- `Marca Arcana Superior do Véu`
- `Marca Potente`
- `Matador de Magos`
- `Mente Afiada`
- `Mestre Atirador de Elite`
- `Mestre Pistoleiro`
- `Mestre da Ambidestria`
- `Mestre de Armas`
- `Mestre de Armas Duplas`
- `Mestre de Armas Grandes`
- `Mestre de Armas Versáteis`
- `Mestre de Armas de Arremesso`
- `Mestre de Armas de Haste`
- `Mestre de Escudo`
- `Observador`
- `Perfurador`
- `Portador da Luz`
- `Precisão`
- `Raízes Profundas`
- `Repreensão`
- `Retalhador`
- `Ritualista`
- `Sacrifício Vital`
- `Senhor da Guerra de Escamas`
- `Sobrevivente Carmesim`
- `Telecinético`
- `Telepático`
- `Tocado pelas Sombras`
- `Tocado pelo Feérico`
- `Tocado pelo Nó do Selamento`
- `Tocado pelo Vampiro`
- `Trapaceiro dos Bastidores`
- `Treinamento Moderado`
- `Trovador de Árvoria`

### automation = `nao` (`0`)

- nenhum

Registro da auditoria:

- a maioria dos talentos ficou em `automation = "parcial"`
- isso é aceitável nesta primeira geração autoral
- a classificação pode ser refinada depois, especialmente nos talentos com magia, reação, descanso, escolhas abertas e sistemas próprios do cenário

## 8. Categorias de risco

### Talentos que concedem magia (`39`)

- `Adepto Elemental`
- `Adepto Místico`
- `Adepto da Hemomancia`
- `Adepto da Veste Branca`
- `Adepto da Veste Negra`
- `Adepto da Veste Vermelha`
- `Adepto de Metamagia`
- `Adepto do Fogo Espiritual`
- `Asas Templárias do Pacto de Luz`
- `Atirador de Magias`
- `Brumas Ofuscantes`
- `Bênçãos dos Caminhos de Eldára`
- `Cartomante`
- `Conjurador Relâmpago`
- `Conjurador de Guerra`
- `Estigma Dracônico`
- `Iniciado Artífice`
- `Legado do Norte`
- `Linguista`
- `Magia Ancestral Zouhri`
- `Marca Arcana Superior da Busca`
- `Marca Arcana Superior da Criação`
- `Marca Arcana Superior da Escrita`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior da Revelação`
- `Marca Arcana Superior da Tormenta`
- `Marca Arcana Superior do Refúgio`
- `Marca Arcana Superior do Véu`
- `Marca Potente`
- `Mestre de Escudo`
- `Portador da Luz`
- `Ritualista`
- `Sacrifício Vital`
- `Telecinético`
- `Telepático`
- `Tocado pelas Sombras`
- `Tocado pelo Feérico`
- `Tocado pelo Nó do Selamento`
- `Tocado pelo Vampiro`

### Talentos com uso por Bônus de Proficiência (`19`)

- `Adepto da Dor`
- `Adepto da Veste Vermelha`
- `Apodrecer`
- `Asas Templárias do Pacto de Luz`
- `Cavaleiro da Lâmina do Albor`
- `Cavaleiro do Escudo Brilhante`
- `Cavaleiro do Voto Branco`
- `Dom da Infusão Elemental`
- `Dom do Ímpeto Telecinético`
- `Líder Inspirador`
- `Marca Arcana Superior da Proteção`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior do Pastoreio`
- `Portador da Luz`
- `Repreensão`
- `Senhor da Guerra de Escamas`
- `Telecinético`
- `Tocado pelo Nó do Selamento`
- `Trapaceiro dos Bastidores`

### Talentos com reação ou gatilho de combate (`81`)

- a lista é extensa e coerente com a modelagem atual de `actions.hasReaction` e `actions.hasTrigger`
- os casos mais centrais incluem `Adepto da Dor`, `Matador de Magos`, `Sentinela`, `Dom da Infusão Elemental`, `Dom do Ímpeto Telecinético`, `Conjurador de Guerra`, `Marca Arcana Superior da Vigília`, `Mestre de Escudo`, `Telecinético`, `Tocado pelo Nó do Selamento` e `Líder Inspirador`
- não foram encontrados problemas estruturais críticos nesse grupo, mas ele naturalmente tem alto custo de revisão para conversão futura

### Talentos com pré-requisito de talento anterior (`19`)

- `Cavaleiro da Lâmina do Albor`
- `Cavaleiro do Escudo Brilhante`
- `Cavaleiro do Voto Branco`
- `Curandeiro de Batalha`
- `Determinação da Cavalaria`
- `Marca Arcana Superior da Busca`
- `Marca Arcana Superior da Criação`
- `Marca Arcana Superior da Escrita`
- `Marca Arcana Superior da Proteção`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior da Revelação`
- `Marca Arcana Superior da Tormenta`
- `Marca Arcana Superior da Travessia`
- `Marca Arcana Superior da Vigília`
- `Marca Arcana Superior do Pastoreio`
- `Marca Arcana Superior do Refúgio`
- `Marca Arcana Superior do Véu`
- `Mestre de Escudo`
- `Trovador de Árvoria`

### Talentos ligados a Marcas (`14`)

- `Marca Anômala Maior`
- `Marca Arcana Superior da Busca`
- `Marca Arcana Superior da Criação`
- `Marca Arcana Superior da Escrita`
- `Marca Arcana Superior da Proteção`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior da Revelação`
- `Marca Arcana Superior da Tormenta`
- `Marca Arcana Superior da Travessia`
- `Marca Arcana Superior da Vigília`
- `Marca Arcana Superior do Pastoreio`
- `Marca Arcana Superior do Refúgio`
- `Marca Arcana Superior do Véu`
- `Marca Potente`

### Talentos ligados a Hemomancia (`4`)

- `Adepto da Hemomancia`
- `Guerreiro Hemomante`
- `Sobrevivente Carmesim`
- `Sacrifício Vital`

### Talentos ligados a ordens, juramentos, dragões ou sistemas próprios (`27`)

- `Adepto Elemental`
- `Adepto da Veste Branca`
- `Adepto da Veste Negra`
- `Adepto da Veste Vermelha`
- `Bênçãos dos Caminhos de Eldára`
- `Cavaleiro do Escudo Brilhante`
- `Determinação da Cavalaria`
- `Dom da Infusão Elemental`
- `Estigma Dracônico`
- `Guerreiro Hemomante`
- `Marca Anômala Maior`
- `Marca Arcana Superior da Busca`
- `Marca Arcana Superior da Criação`
- `Marca Arcana Superior da Escrita`
- `Marca Arcana Superior da Proteção`
- `Marca Arcana Superior da Restauração`
- `Marca Arcana Superior da Revelação`
- `Marca Arcana Superior da Tormenta`
- `Marca Arcana Superior da Travessia`
- `Marca Arcana Superior da Vigília`
- `Marca Arcana Superior do Pastoreio`
- `Marca Arcana Superior do Refúgio`
- `Marca Arcana Superior do Véu`
- `Marca Potente`
- `Observador`
- `Senhor da Guerra de Escamas`
- `Tocado pelo Nó do Selamento`

### Talentos ligados a armas de fogo, bombas ou misfire

Com base na revisão já consolidada da primeira geração:

- `Bênçãos dos Caminhos de Eldára`
- `Marca Arcana Superior do Pastoreio`
- `Mestre Pistoleiro`
- `Especialista em Besta`

### Talentos com escolhas abertas de atributo, perícia, ferramenta, magia ou truque (`29`)

- `Adepto Elemental`
- `Adepto Marcial`
- `Adepto Místico`
- `Adepto da Hemomancia`
- `Adepto de Metamagia`
- `Asas Templárias do Pacto de Luz`
- `Cartomante`
- `Chef`
- `Curandeiro de Batalha`
- `Determinação da Cavalaria`
- `Especialista em Perícias`
- `Estigma Dracônico`
- `Iniciado Artífice`
- `Líder Inspirador`
- `Magia Ancestral Zouhri`
- `Marca Anômala Maior`
- `Marca Arcana Superior do Refúgio`
- `Mente Afiada`
- `Mestre de Armas`
- `Mestre de Armas Duplas`
- `Observador`
- `Resiliente`
- `Ritualista`
- `Sacrifício Vital`
- `Senhor da Guerra de Escamas`
- `Sentinela`
- `Telecinético`
- `Tocado pelo Feérico`
- `Tocado pelo Vampiro`

## 9. Verificação de codificação textual

Resultado:

- `docs/revisoes/talentos-gerais-primeira-geracao.md` não apresentou caracteres corrompidos `?` ou `�` na checagem atual
- os arquivos JSON de `content/general-feats/` também não apresentaram caracteres corrompidos `?` ou `�`

Impacto:

- nenhum problema de codificação textual ficou pendente nesta auditoria

## 10. Riscos encontrados

### Problemas críticos

- nenhum problema crítico encontrado

### Problemas médios

- `Treinamento Moderado`: `grantedProficiencies` ficou vazio apesar de a extração registrar treinamento com armaduras leves, armaduras médias e escudos
- `Adepto do Fogo Espiritual`: `abilityIncrease.description` absorveu texto narrativo além da linha de aumento de atributo, e `abilityIncrease.options` merece revisão manual
- `Formação Bastiônica`: `abilityIncrease.description` absorveu texto narrativo além da linha de aumento de atributo, e `abilityIncrease.options` merece revisão manual
- `Perfurador`: `abilityIncrease.description` absorveu texto narrativo além da linha de aumento de atributo, e `abilityIncrease.options` merece revisão manual
- `Tocado pelo Nó do Selamento`: `abilityIncrease.description` absorveu texto além da linha de aumento de atributo e precisa revisão editorial

### Observações menores

- a geração autoral está estruturalmente estável, mas a maioria dos talentos está em `automation = "parcial"`, o que eleva o custo da futura conversão para Foundry
- o conjunto tem alta concentração de magia, reação, gatilhos, escolhas abertas e sistemas próprios do cenário
- `Mestre Pistoleiro` e `Linguista` permanecem com `minimumLevel = null`, o que está coerente com a extração atual, já que a fonte local não identificou nível mínimo nesses casos

## 11. Recomendação

Status recomendado: `aprovada com ressalvas`

Justificativa:

- a geração autoral está consistente em quantidade, índice, estrutura, valores-base, ids e preservação mínima da extração
- não foram encontrados bloqueios estruturais nos `96` JSONs
- as ressalvas atuais são pontuais e concentradas em campos específicos de `abilityIncrease` e `grantedProficiencies`, sem invalidar o conjunto inteiro

## 12. Resumo executivo

- talentos auditados: `96`
- consistência do `_index.json`: `ok`
- consistência estrutural dos JSONs: `ok`
- fidelidade mínima à extração: `ok`, com `5` ressalvas médias localizadas
- problema médio principal: `campos de abilityIncrease com texto excedente em alguns arquivos`
- recomendação final: `aprovada com ressalvas`
