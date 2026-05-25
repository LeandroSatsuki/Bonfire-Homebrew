# Mapeamento de Talentos de Origem para Foundry

## 1. Status

- especificacao tecnica
- nao e importacao final
- nao escreve no compendium

## 2. Problema corrigido

O primeiro importador de Talentos de Origem resolveu apenas o caso especial de `Habilidoso` e tratou quase todo o restante como texto.

Isso criou um problema estrutural:

- talentos com `grantedProficiencies` na fonte autoral nao viraram `Trait`
- talentos com `uses` detectaveis nao foram convertidos para `system.uses`
- talentos com acao, bonus action ou reaction ficaram apenas descritivos, mesmo quando o padrao mecanico ja era conhecido

Exemplo concreto:

- `Curandeiro` ja possui `grantedProficiencies` na fonte autoral para Medicina
- mesmo assim, a importacao anterior nao tentou transformar isso em `Trait`

Conclusao:

- antes de gravar no compendium, o modulo precisa de uma camada de mapeamento mecanico
- essa camada deve detectar automacoes, tentar resolver codigos Foundry em tempo de execucao e produzir um relatorio conservador

## 3. Fontes consideradas

- `content/origin-feats/`
- `docs/testes/talentos-gerais.md`
- `docs/revisoes/talentos-origem-auditoria-automacao.md`
- `foundry-samples/teste-feat-habilidoso.json`
- `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`
- `foundry-samples/teste-feat-treinamento-moderado.json`

## 4. Padroes Foundry ja validados

Padroes reais que ja podem orientar a conversao:

- `type: "feat"`
- `system.type.subtype: "origin"`
- `Trait` com escolhas para `Habilidoso`:
  - `choices.count = 3`
  - `pool = ["skills:*", "tool:*"]`
- `system.uses.max = "@prof"`
- `recovery` em `lr`
- `activity` de `reaction`
- `Trait.grants` para proficiencias quando o codigo for conhecido

Padroes ainda nao validados diretamente para Talentos de Origem:

- codigos individuais de todas as pericias
- codigos individuais de todas as ferramentas
- magias concedidas reais em Talento de Origem
- Active Effects simples em Talento de Origem

## 5. Classes de automacao

As automacoes devem ser separadas nestas classes:

### 5.1 Trait grants fixo

Usado quando a fonte autoral concede uma proficiencia fixa e o codigo Foundry for resolvido com seguranca.

Exemplos:

- Medicina
- Ferramentas de Ladrao
- Kit de Disfarce

### 5.2 Trait choices

Usado quando a fonte autoral concede escolha aberta ou semifechada.

Exemplos:

- `Habilidoso`
- escolha entre `Atuacao` ou `Persuasao`
- escolha de instrumento musical

### 5.3 Uses por Bonus de Proficiência

Usado quando:

- `uses.hasUses = true`
- `uses.scalesWithProficiency = true`

Mapeamento esperado:

- `system.uses.max = "@prof"`

### 5.4 Uses por descanso longo

Usado quando a fonte autoral informa recarga por descanso longo.

Mapeamento esperado:

- `system.uses.recovery` com `period = "lr"`

### 5.5 Activity action

Usado quando a fonte autoral ou o texto mecanico permitir identificar um bloco acionavel de `action`.

### 5.6 Activity bonus action

Usado quando a fonte autoral ou o texto mecanico permitir identificar um bloco acionavel de `bonus action`.

### 5.7 Activity reaction

Usado quando a fonte autoral ou o texto mecanico permitir identificar um bloco acionavel de `reaction`.

### 5.8 Texto/manual

Usado quando o talento:

- nao tem automacao segura
- depende de contexto de combate
- depende de escolha ampla de magia
- depende de resolucao humana ou arbitral

### 5.9 Active Effects ainda bloqueado

Nesta etapa, `Active Effects` continua bloqueado para Talentos de Origem.

Razao:

- ainda nao ha base suficiente de sample real para HP, deslocamento, resistencias, blindsight ou modificadores contextuais

## 6. Estrategia de resolucao

O script nao deve inventar codigos Foundry.

Ele deve tentar resolver codigos em tempo de execucao usando `CONFIG.DND5E`, por exemplo:

- `CONFIG.DND5E.skills`
- `CONFIG.DND5E.tools`, se existir
- `CONFIG.DND5E.languages`, se existir
- `CONFIG.DND5E.armorProficiencies`, se existir

Tambem pode consultar, se existirem:

- `CONFIG.DND5E.toolProficiencies`
- `CONFIG.DND5E.weaponProficiencies`
- `CONFIG.DND5E.vehicleTypes`

Regra de ouro:

- se o script nao conseguir resolver o codigo com confianca, ele registra em `unresolved`
- o script nao deve inventar `Trait.grants`
- o script nao deve converter texto em `activity` final sem evidencias suficientes

### Resultado do primeiro dry-run

- o dry-run executou sem erros
- resultado: total `42`, ready `1`, partial `31`, manual `5`, blocked `5`, unresolved `38`
- `Habilidoso` foi o unico `ready`
- o dry-run confirmou padroes uteis para `Trait`, `uses @prof`, `lr` e algumas proficiencias fixas
- o dry-run revelou um bug no resolvedor de `Persuasao`, que confundiu `skills:per` com `skills:prc`
- a importacao real continua bloqueada ate o dry-run v2

## 7. Analise dos 42 talentos

| Talento | Automacoes detectaveis no JSON | Automacoes seguras | Automacoes bloqueadas | Resultado esperado no dry-run |
| --- | --- | --- | --- | --- |
| Alerta | `grantedProficiencies` especial, texto de iniciativa | nenhuma garantida | iniciativa e ocultacao de ataques | `blocked` ou `partial`, conforme resolucao de iniciativa |
| Assecla do Reinado Draconico | escolha de pericia, `uses`, bonus action textual | `Trait` de escolha se codigos resolverem, `uses @prof`, `lr` | efeito de medo e PV temporarios | `partial` |
| Atacante Selvagem | texto de rerrol e limite por turno | nenhuma | dano contextual e regra por turno | `manual` |
| Brigao de Taverna | proficiencia especial, dano e maestria | nenhuma garantida | arma improvisada, push e dano desarmado | `blocked` ou `partial` |
| Cacador de Vampiros | `uses`, reaction textual | `uses` se max for resolvivel | reducao de dano reativa | `partial` |
| Cao de Caca | sentidos e rastreio | nenhuma | blindsight, rastreio de sangue e vantagem sensorial | `manual` |
| Centelha de Fogo Espiritual | `grantedSpells`, `uses`, bonus action textual | `uses @prof`, `lr` | magia concedida e conjuracao acelerada | `partial` |
| Curandeiro | `grantedProficiencies`, action textual | `Trait` para Medicina se codigo resolver | cura, gasto de Kit de Curandeiro e magia modificada | `partial` |
| Escudeiro do Amanhecer | proficiencias, `uses`, trigger textual | `Trait` se codigos resolverem, `uses @prof`, `lr` | consumo apenas em acerto e dano extra | `partial` |
| Espiao do Submundo | proficiencias fixas de ferramentas | `Trait.grants` se codigos resolverem | disfarce e falsificacao contextual | `partial` |
| Explorador de Masmorras | pericia, `uses`, reaction textual | `Trait` se resolver, `uses @prof`, `lr` | resistencia a armadilhas e vantagem contextual | `partial` |
| Favorecido pelo Divino | `grantedSpells`, `uses` | `lr` | escolha ampla de truque, magia e atributo | `blocked` |
| Foliao Incansavel | `uses` por PB | `uses @prof`, `lr` | gatilho de Inspiracao Heroica | `partial` |
| Habilidoso | `grantedProficiencies` aberta | `Trait` validado com `count = 3` e `pool = ["skills:*", "tool:*"]` | nenhuma | `ready` |
| Iluminado pelo Primeiro Feixe | `grantedSpells`, `uses` | `lr` | magia concedida e remocao de concentracao | `partial` |
| Iniciado do Convento | `grantedSpells`, `uses` | `lr` | `Hex` concedida e dano psiquico reativo | `partial` |
| Iniciado em Magia | `grantedSpells`, `uses` | `lr` | escolha ampla de lista, truques e magia | `blocked` |
| Iniciado na Ordem de Cavalaria Auralina | texto de critico e vantagem | nenhuma | gatilhos de combate e Inspiracao Heroica | `manual` |
| Iniciado no Juramento das Tres Luas | `grantedSpells`, `uses` | `lr` | escolha de Veste, truque e duas magias | `blocked` |
| Joguete de Vampiro | `uses`, bonus action textual | `uses @prof`, `lr` | criacao de pocao/antidoto e activity final | `partial` |
| Lingua de Prata | escolha de pericia | `Trait` de escolha se codigos resolverem | regras sociais contextuais | `partial` |
| Marca Anomala | `grantedSpells`, `uses`, reaction textual | `lr` ou `sr/lr` se claro | escolha de magia, surto e reaction | `blocked` |
| Marca Arcana da Busca | magia, `uses`, prerequisito nomeado | `lr` | magia preparada e bonus em testes | `partial` |
| Marca Arcana da Criacao | magia, `uses` | `lr` | magia preparada e bonus de ferramenta | `partial` |
| Marca Arcana da Escrita | magia, `uses` | `lr` | magia preparada e bonus de caligrafia | `partial` |
| Marca Arcana da Protecao | magia, `uses` | `lr` | magia preparada e ferramenta contextual | `partial` |
| Marca Arcana da Restauracao | magia, `uses` | `lr` | magia preparada e bonus de Medicina/Herbalismo | `partial` |
| Marca Arcana da Revelacao | magia, `uses` implicitos, prerequisito | `lr` se claro | magia preparada e bonus de Investigacao/Intuicao | `partial` |
| Marca Arcana da Tormenta | magia, `uses`, resistencia | `lr` | resistencia a Relampago e magia preparada | `partial` |
| Marca Arcana da Travessia | magia, `uses`, deslocamento | `lr` | bonus de deslocamento e magia preparada | `partial` |
| Marca Arcana da Vigilia | magia, `uses`, reaction textual | `uses @prof` se claro, `lr` | reaction de troca de lugar e `Shield` | `partial` |
| Marca Arcana do Pastoreio | magia, `uses` | `lr` | extensao a Monstruosidades e magias | `partial` |
| Marca Arcana do Refugio | magia, `uses` | `lr` | bonus social/utensilios e magias | `partial` |
| Marca Arcana do Veu | magia, `uses` | `lr` | furtividade/atuacao e magias | `partial` |
| Menestrel Viajante | escolha de instrumento + escolha de pericia | `Trait` de escolha se pools resolverem | Ajudar em alcance maior | `partial` |
| Musico | escolha de `3` instrumentos | `Trait` se pool musical resolver | Inspiracao apos descanso | `partial` |
| Neofito dos Caminhos de Eldara | escolha de pericia, `grantedSpells` | `Trait` se resolver | magia escolhida e efeito permanente | `partial` |
| Ninja de Hanryo | texto de OA, rerrol e Inspiracao | nenhuma | combate altamente contextual | `manual` |
| Porta-Estandarte da Wyrm | escolha de pericia, `uses` | `Trait` de escolha se resolver, `lr` | Inspiracao Heroica em area | `partial` |
| Robusto | bonus de HP | nenhuma | HP maximo retroativo por nivel | `blocked` |
| Sortudo | `uses` por PB | `uses @prof`, `lr` | vantagem e desvantagem sobre rolagens | `partial` |
| Veterano Mercenario | reaction textual | nenhuma | reducao de empurrao e vantagem ampla em saves | `manual` |

## 8. Criterios para liberar importacao real

- [ ] dry-run criado
- [ ] dry-run executado
- [ ] relatorio gerado
- [ ] nenhum erro critico
- [ ] lista de unresolved revisada
- [ ] autorizacao explicita do autor

## 9. Critérios do importador v2

O importador real v2 deve permanecer estritamente conservador e automatizar apenas o que foi validado pelo dry-run v2.

### 9.1 Escopo permitido

Automatizar somente:

- `Trait` com `choices` para:
  - `Habilidoso`
  - `Língua de Prata`
  - `Assecla do Reinado Dracônico`
  - `Porta-Estandarte da Wyrm`
  - `Neófito dos Caminhos de Eldára`
- `Trait` com `grants` para:
  - `Curandeiro`
  - `Escudeiro do Amanhecer`
  - `Explorador de Masmorras`
  - `Espião do Submundo`
- `system.uses.max = "@prof"` com recuperação `lr` apenas para:
  - `Centelha de Fogo Espiritual`
  - `Escudeiro do Amanhecer`
  - `Explorador de Masmorras`
  - `Marca Arcana da Vigília`
  - `Assecla do Reinado Dracônico`
  - `Folião Incansável`
  - `Joguete de Vampiro`
  - `Sortudo`

### 9.2 Escopo bloqueado

Continuam bloqueados no importador v2:

- `system.activities` reais
- `Active Effects`
- criação de `Spell` ou qualquer importação de `grantedSpells`
- `Músico` como `Trait`, até validar um pool real de instrumentos musicais em vez do genérico `tool:*`
- HP, deslocamento, resistência, blindsight e iniciativa
- automações amplas de magia
- efeitos contextuais, gatilhos de combate e interações que dependem de adjudicação manual

### 9.3 Regra operacional

- todo talento deve ser importado como `Item` de `type: "feat"`
- `system.type.value` deve ser `feat`
- `system.type.subtype` deve ser `origin`
- `system.source.rules` deve ser `2024`
- o importador v2 preserva `description`, `mechanicsSummary`, `benefits`, `prerequisites` e `notes` dentro de `system.description.value`
- `system.requirements` deve preservar os pré-requisitos textuais quando existirem
- ações, reações e ações bônus ficam apenas no texto e em `flags`
