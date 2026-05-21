# Sistema de Backgrounds / Antecedentes

- Status: `escopo/modelagem`
- Observacao: este documento ainda nao e dado real do Foundry. Ele registra apenas escopo, extracao consolidada e pendencias para modelagem futura.

## 1. Objetivo do sistema

No projeto Bonfire Homebrew, `Backgrounds / Antecedentes` representam a origem social, profissional ou narrativa do personagem e concedem recursos iniciais no nivel 1.

## 2. Base tecnica confirmada

- Foundry VTT `v13`
- sistema `dnd5e 5.2.4+`
- regra base `D&D 2024`
- tipo real de background no Foundry: `background`
- `content/` e fonte autoral, nao schema nativo direto do Foundry
- `packs/` nao devem ser editados manualmente
- ainda nao existe pack `Backgrounds` no `module.json`
- houve `teste manual validado` de `Backgrounds`
- registro tecnico do teste em [backgrounds.md](../testes/backgrounds.md)

## 3. Regra geral de Backgrounds no Bonfire

Com base na fonte oficial local salva em HTML para extracao e modelagem, todo `Background` do Bonfire concede:

- `+2` em um atributo e `+1` em outro
- `2` pericias a escolha
- `Comum` fixo
- `2` escolhas entre idiomas e/ou ferramentas
- `100 PO` iniciais
- pelo menos `50 PO` em itens mundanos
- `1` habilidade de antecedente
- `1` `Talento de Origem`

Base de referencia atual:

- extracao consolidada em [antecedentes.md](../extracoes/backgrounds/antecedentes.md)
- `30` antecedentes identificados na fonte local

Confirmacoes adicionais do teste tecnico:

- `type` real confirmado: `background`
- `AbilityScoreImprovement` confirmou a estrutura de `+2/+1`
- `Trait` confirmou a camada de pericias
- `Trait` confirmou `Comum` fixo e a escolha entre idiomas/ferramentas
- `system.wealth: "100"` confirmou o registro de riqueza inicial no sample
- `ItemGrant` confirmou uma forma valida de representar a habilidade de antecedente no teste
- detalhes tecnicos consolidados em [backgrounds.md](../testes/backgrounds.md)

## 4. Relacao com Talentos de Origem

- `Background` concede escolha de `1 Talento de Origem`
- `Talentos de Origem` sao uma categoria separada de `feat`
- a extracao dessa camada ja existe em [talentos-de-origem.md](../extracoes/talentos/talentos-de-origem.md)
- o teste manual validou que esse fluxo funcionou
- a referencia explicita ao `Talento de Origem` nao apareceu no JSON exportado do `Background` analisado
- nao assumir automacao sem teste real

## 5. Relacao com o futuro pack Backgrounds

- ainda nao alterar `module.json`
- ainda nao criar pack `Backgrounds`
- antes disso, validar manualmente como o `dnd5e 5.2.4` representa `Backgrounds` em compendium
- a criacao do pack `Backgrounds` sera uma decisao futura e explicita

## 6. Automacao no Foundry

Os `Backgrounds` podem ser separados em tres grupos de automacao:

### Automatizavel

Exemplos conceituais:

- escolha de atributos
- escolha de pericias
- parte da escolha de idiomas/ferramentas
- parte de `startingEquipment`
- concessao de `feat`, se o fluxo real do Foundry permitir

### Parcialmente automatizavel

Exemplos conceituais:

- moeda inicial
- habilidade do antecedente com bonus situacional
- habilidade do antecedente com mudanca de atributo em pericia
- escolha de `Talento de Origem`
- antecedentes com dependencia de `panteao`, `deus`, `reino de origem`, `ferramenta especifica`, `companheiro`, `retentor` ou `veiculo aquatico`

### Manual ou contextual

Exemplos conceituais:

- gasto minimo de `50 PO` em itens mundanos
- redes de contato
- hospedagem, abrigo, audiencia ou acesso social
- leitura emocional, espiritos e profanacao
- companheiro animal, escudeiro ou retentores
- permissao narrativa de competicoes, arenas, acampamentos ou fortalezas

Observacao:

- nao criar `Active Effects` reais nesta etapa

## 7. Formato autoral futuro

Sem criar arquivos reais agora, futuros registros autorais em `content/backgrounds/` podem usar campos como:

- `id`
- `name`
- `type`
- `foundryType`
- `source`
- `rules`
- `status`
- `abilityScoreChoice`
- `skillChoices`
- `languageToolChoices`
- `startingGold`
- `mundaneGoldRequirement`
- `backgroundFeature`
- `originFeatChoice`
- `description`
- `mechanicsSummary`
- `automation`
- `dependencies`
- `notes`

Observacao importante:

- isso e fonte autoral
- nao e schema nativo do Foundry

## 8. Pendencias

- confirmar em novo export como o `Background` referencia explicitamente o `Talento de Origem`
- validar se o gasto minimo de `50 PO` em itens mundanos sera so regra textual/manual
- validar se sera necessario pack `Backgrounds`
- validar se todos os `30` antecedentes seguem o mesmo padrao estrutural do teste tecnico
- validar antecedentes com dependencias narrativas mais complexas, como `retentores`, `escudeiro`, `companheiro animal`, `panteao`, `reino de origem` e `veiculo aquatico`
- manter que dados reais so serao criados com autorizacao explicita do autor

## 9. Criterios para liberar dados reais

- [ ] sistema documentado
- [ ] extracao revisada
- [ ] lista de antecedentes confirmada
- [ ] relacao com `Talentos de Origem` definida
- [ ] abordagem de atributos/pericias/idiomas/ferramentas validada
- [ ] decisao sobre pack `Backgrounds` tomada
- [ ] autorizacao explicita do autor para criar dados reais
