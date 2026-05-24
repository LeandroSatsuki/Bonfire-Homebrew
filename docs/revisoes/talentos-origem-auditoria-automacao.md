# Auditoria de automacao dos Talentos de Origem

## 1. Escopo

Esta auditoria analisa os `42` talentos em `content/origin-feats/` para identificar o que pode ser automatizado com seguranca no Foundry VTT `v13` com `dnd5e 5.2.4+`.

Base tecnica usada nesta auditoria:

- `foundry-samples/teste-feat-habilidoso.json`
- `foundry-samples/teste-feat-treinamento-moderado.json`
- `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`
- `docs/mapeamento-foundry.md`
- `docs/testes/talentos-gerais.md`
- `scripts/import-origin-feats.js`

Regra de decisao adotada:

- so foi marcado como `automatizar-agora` o que ja tem padrao real validado em sample
- quando houver caminho provavel, mas sem sample direto, a sugestao fica como `precisa validacao`
- quando o efeito for muito contextual, ele fica como `texto-manual` ou `automatizar-parcial`

## 2. Padroes ja validados

Padroes reais ja confirmados por sample:

- `feat` como `type` real
- `system.type.value = "feat"`
- `system.type.subtype = "origin"` para Talento de Origem
- `Trait` em `system.advancement` para proficiencias
- `Habilidoso`:
  - `Trait`
  - `choices.count = 3`
  - `pool = ["skills:*", "tool:*"]`
- `Treinamento Moderado`:
  - `Trait.grants = ["armor:lgt", "armor:med", "armor:shl"]`
- `Tocado pelo No do Selamento`:
  - `system.uses.max = "@prof"`
  - `system.uses.recovery` com descanso longo
  - `activity` de reacao

Limites conhecidos:

- ainda nao ha sample direto validando codigo de pericia individual
- ainda nao ha sample direto validando codigo de ferramenta individual
- ainda nao ha sample direto validando magia concedida real em Talento de Origem
- ainda nao ha sample direto validando Active Effects simples em Talento de Origem

## 3. Auditoria por talento

| Talento | Proficiência | Magia | Uso | Ação | Active Effects | Recomendação | Mapeamento Foundry sugerido |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Alerta | nenhuma (especial: iniciativa) | nenhuma | sem uso | trigger/manual | precisa de teste | automatizar-parcial | iniciativa por estrutura propria; restante textual |
| Assecla do Reinado Draconico | escolha entre pericias | nenhuma | uso por Bonus de Proficiência + descanso longo | bonus action | nao criar ainda | automatizar-parcial | `Trait` de escolha entre Intimidacao/Persuasao, `uses @prof`, `activity` de bonus action; codigos de pericia precisam validacao |
| Atacante Selvagem | nenhuma | nenhuma | sem uso | trigger/manual | nao criar ainda | texto-manual | sem mapeamento seguro; efeito de rerrol contextual |
| Brigao de Taverna | nenhuma (especial: arma improvisada) | nenhuma | sem uso | nenhuma | precisa de teste | automatizar-parcial | proficiencia especial e modificacoes em golpe desarmado pedem teste |
| Cacador de Vampiros | nenhuma | nenhuma | uso fixo + descanso curto ou longo | reaction | nao criar ainda | automatizar-parcial | `activity` de reacao com reducao de dano; uso por descanso precisa validacao |
| Cao de Caca | nenhuma | nenhuma | sem uso | nenhuma | precisa de teste | texto-manual | visao as cegas, rastreio de sangramento e vantagens sensoriais exigem teste |
| Centelha de Fogo Espiritual | nenhuma | concede magia fixa | uso por Bonus de Proficiência + descanso longo | bonus action | nao criar ainda | automatizar-parcial | magia concedida + uso por PB para conjuracao acelerada; sem sample direto de spell feat |
| Curandeiro | proficiencia fixa em pericia | modifica magia existente | sem uso | action | nao criar ainda | automatizar-parcial | sugerir `Trait` para Medicina; codigo exato da pericia `precisa validacao`; restante via texto/manual |
| Escudeiro do Amanhecer | proficiencia fixa em pericia e ferramenta/veiculo | nenhuma | uso por Bonus de Proficiência + descanso longo | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` para Persuasao e Veiculos Terrestres, mais bloco textual do golpe preciso |
| Espiao do Submundo | proficiencia fixa em ferramenta | nenhuma | sem uso | trigger/manual | nao criar ainda | automatizar-parcial | `Trait.grants` para Ferramentas de Ladrao, Kit de Disfarce e Kit de Falsificacao; codigos precisam validacao |
| Explorador de Masmorras | proficiencia fixa em pericia | nenhuma | uso por Bonus de Proficiência + descanso longo | reaction | precisa de teste | automatizar-parcial | `Trait` para Sobrevivencia, `activity` de reacao, resistencia a armadilhas e vantagens pedem teste |
| Favorecido pelo Divino | nenhuma | concede escolha de magia | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | escolha de truque + magia fixa por afinidade; manter grande parte textual ate validar magia concedida |
| Foliao Incansavel | nenhuma | nenhuma | uso por Bonus de Proficiência + descanso longo | trigger/manual | nao criar ainda | automatizar-parcial | `uses @prof`; gatilho de Inspiracao Heroica permanece textual |
| Habilidoso | escolha entre pericias/ferramentas | nenhuma | sem uso | nenhuma | nao criar ainda | automatizar-agora | usar exatamente o sample validado: `Trait`, `choices.count = 3`, `pool = ["skills:*", "tool:*"]` |
| Iluminado pelo Primeiro Feixe | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magia fixa + uso por descanso; efeito sem concentracao precisa permanecer textual |
| Iniciado do Convento | nenhuma | concede magia fixa | uso fixo + descanso longo | trigger/manual | nao criar ainda | automatizar-parcial | magia `Hex` concedida; dano psiquico reativo fica textual |
| Iniciado em Magia | nenhuma | concede escolha de magia | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | escolhas amplas de truques e magia de 1o nivel; manter sem automacao pesada por enquanto |
| Iniciado na Ordem de Cavalaria Auralina | nenhuma | nenhuma | sem uso | trigger/manual | nao criar ainda | texto-manual | inspiracao em critico e vantagem condicional sem mapeamento seguro |
| Iniciado no Juramento das Tres Luas | nenhuma | concede escolha de magia | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | escolhas de Veste + truque + duas magias; manter principalmente textual |
| Joguete de Vampiro | nenhuma | nenhuma | uso por Bonus de Proficiência + descanso longo | bonus action | nao criar ainda | automatizar-parcial | `uses @prof` para Dash/Disengage; criacao de pocao/antidoto fica textual |
| Lingua de Prata | escolha entre pericias | nenhuma | sem uso | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` de escolha entre Atuacao/Persuasao; codigo de pericia precisa validacao |
| Marca Anomala | nenhuma | concede escolha de magia | precisa de validacao | reaction | nao criar ainda | automatizar-parcial | mistura de reacao, magia escolhida e recargas diferentes; exige teste especifico |
| Marca Arcana da Busca | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias preparadas e gratuitas; bonus em Percepcao/Sobrevivencia fica textual |
| Marca Arcana da Criacao | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; bonus com Ferramentas de Artesao fica textual |
| Marca Arcana da Escrita | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; bonus com Historia/Caligrafo fica textual |
| Marca Arcana da Protecao | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | precisa de teste | automatizar-parcial | magias concedidas; possivel interacao com Ferramentas de Ladrao precisa validacao |
| Marca Arcana da Restauracao | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; bonus de Medicina/Herbalismo fica textual |
| Marca Arcana da Revelacao | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; testes de Investigacao/Intuicao ficam textuais |
| Marca Arcana da Tormenta | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | precisa de teste | automatizar-parcial | magias concedidas; resistencia a Relampago e bonus de Navegador pedem teste |
| Marca Arcana da Travessia | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | precisa de teste | automatizar-parcial | `Passo Nebuloso` concedido; bonus de deslocamento pede teste de AE |
| Marca Arcana da Vigilia | nenhuma | concede magia fixa | precisa de validacao | reaction | nao criar ainda | automatizar-parcial | mistura de `Shield`, reacao propria, `uses @prof`; testar antes de automatizar |
| Marca Arcana do Pastoreio | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; extensao a Monstruosidades permanece textual |
| Marca Arcana do Refugio | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; bonus com Persuasao/utensilios fica textual |
| Marca Arcana do Veu | nenhuma | concede magia fixa | uso fixo + descanso longo | nenhuma | nao criar ainda | automatizar-parcial | magias concedidas; parte de furtividade/atuacao permanece textual |
| Menestrel Viajante | escolha entre pericia/ferramenta | nenhuma | sem uso | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` com 1 instrumento musical + 1 pericia entre Atuacao/Persuasao; pools exatos precisam validacao |
| Musico | escolha de ferramenta | nenhuma | precisa de validacao | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` com 3 instrumentos musicais e bloco textual da canção; pool exato precisa validacao |
| Neofito dos Caminhos de Eldara | escolha entre pericias | concede escolha de magia | sem uso | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` para Natureza/Adestrar Animais e texto para `Speak with Animals` permanente + magia escolhida |
| Ninja de Hanryo | nenhuma | nenhuma | sem uso | trigger/manual | nao criar ainda | texto-manual | ataques de oportunidade especiais e gasto de Inspiracao sem base segura |
| Porta-Estandarte da Wyrm | escolha entre pericias | nenhuma | uso fixo + descanso longo | trigger/manual | nao criar ainda | automatizar-parcial | `Trait` de escolha entre Intuicao/Atuacao/Persuasao; grito de guerra segue textual |
| Robusto | nenhuma | nenhuma | sem uso | nenhuma | precisa de teste | automatizar-parcial | HP maximo por nivel e retroativo sao candidatos a AE, mas precisam teste |
| Sortudo | nenhuma | nenhuma | uso por Bonus de Proficiência + descanso longo | trigger/manual | nao criar ainda | automatizar-parcial | `uses @prof`; vantagem/desvantagem continua textual |
| Veterano Mercenario | nenhuma | nenhuma | sem uso | reaction | nao criar ainda | texto-manual | reacao de reduzir empurrao e vantagem ampla em saves contra condicao pedem tratamento manual |

## 4. Notas de mapeamento

### 4.1 Profiencias

Casos mais promissores para `Trait`:

- `Habilidoso`
  - padrao ja validado
  - `choices.count = 3`
  - `pool = ["skills:*", "tool:*"]`
- `Curandeiro`
  - sugerir `Trait` para proficiencia em Medicina
  - codigo exato da pericia deve ser marcado como `precisa validacao`
- `Lingua de Prata`
  - `Trait` de escolha entre duas pericias
  - pool exato precisa validacao
- `Menestrel Viajante`
  - `Trait` para `1` instrumento musical
  - `Trait` para `1` escolha entre Atuacao e Persuasao
  - pool exato de instrumentos musicais precisa validacao
- `Musico`
  - `Trait` de escolhas para `3` instrumentos musicais
  - count validavel por analogia estrutural com `Habilidoso`, mas pool exato ainda precisa validacao
- `Espiao do Submundo`
  - `Trait.grants` e um bom candidato
  - codigos de `Thieves' Tools`, `Disguise Kit` e `Forgery Kit` ainda precisam validacao
- `Escudeiro do Amanhecer`, `Explorador de Masmorras`, `Porta-Estandarte da Wyrm`, `Assecla do Reinado Draconico`, `Neofito dos Caminhos de Eldara`
  - todos podem virar `Trait`
  - os codigos das pericias/ferramentas ainda precisam validacao

### 4.2 Magias

A maioria dos talentos magicos de origem pode ser importada de forma parcial agora:

- preservar texto completo em `system.description.value`
- preencher `system.source.rules = "2024"`
- manter `system.type.subtype = "origin"`

Mas ainda faltam testes reais para decidir com seguranca:

- como conceder truques e magias preparadas em Talento de Origem
- como modelar escolhas de listas e atributos de conjuracao
- como modelar conjuracao gratuita com recuperacao por descanso
- como modelar magias adicionadas a listas de classe sem quebrar a ficha

### 4.3 Uses e activities

O sample de `Tocado pelo No do Selamento` valida a direcao tecnica:

- `system.uses.max = "@prof"`
- recuperacao em descanso longo
- `activity` com consumo ligado ao uso do item

Isso sugere caminho seguro para testar primeiro:

- `Joguete de Vampiro`
- `Escudeiro do Amanhecer`
- `Explorador de Masmorras`
- `Centelha de Fogo Espiritual`
- `Assecla do Reinado Draconico`
- `Marca Arcana da Vigilia`

Mas ainda sao casos de `automatizar-parcial`, nao de `automatizar-agora`.

## 5. Lista final

### 5.1 Talentos que o importador deve automatizar ja

| Talento | Motivo |
| --- | --- |
| Habilidoso | ja possui sample real validando `Trait` com `choices.count = 3` e `pool = ["skills:*", "tool:*"]` |

### 5.2 Talentos que devem ficar parcialmente automatizados

| Talento |
| --- |
| Alerta |
| Assecla do Reinado Draconico |
| Brigao de Taverna |
| Cacador de Vampiros |
| Centelha de Fogo Espiritual |
| Curandeiro |
| Escudeiro do Amanhecer |
| Espiao do Submundo |
| Explorador de Masmorras |
| Favorecido pelo Divino |
| Foliao Incansavel |
| Iluminado pelo Primeiro Feixe |
| Iniciado do Convento |
| Iniciado em Magia |
| Iniciado no Juramento das Tres Luas |
| Joguete de Vampiro |
| Lingua de Prata |
| Marca Anomala |
| Marca Arcana da Busca |
| Marca Arcana da Criacao |
| Marca Arcana da Escrita |
| Marca Arcana da Protecao |
| Marca Arcana da Restauracao |
| Marca Arcana da Revelacao |
| Marca Arcana da Tormenta |
| Marca Arcana da Travessia |
| Marca Arcana da Vigilia |
| Marca Arcana do Pastoreio |
| Marca Arcana do Refugio |
| Marca Arcana do Veu |
| Menestrel Viajante |
| Musico |
| Neofito dos Caminhos de Eldara |
| Porta-Estandarte da Wyrm |
| Robusto |
| Sortudo |

### 5.3 Talentos que devem ficar so texto/manual

| Talento | Motivo principal |
| --- | --- |
| Atacante Selvagem | rerrol e dano contextual por turno |
| Cao de Caca | blindsight, rastreio de sangue e sentidos especiais sem base validada |
| Iniciado na Ordem de Cavalaria Auralina | inspiracao e vantagem condicionais sem estrutura segura |
| Ninja de Hanryo | ataques de oportunidade especiais e gasto de Inspiracao Heroica |
| Veterano Mercenario | reacao de reducao de deslocamento e vantagem ampla em salvaguardas |

### 5.4 Talentos que exigem novo teste no Foundry

Os principais candidatos para novo teste tecnico sao:

- `Curandeiro`
  - validar codigo real de Medicina em `Trait`
- `Lingua de Prata`
  - validar escolha entre duas pericias em `Trait`
- `Menestrel Viajante`
  - validar combinacao de `1` instrumento + `1` pericia
- `Musico`
  - validar `Trait` com `3` instrumentos musicais
- `Espiao do Submundo`
  - validar codigos reais de kits e ferramentas
- `Alerta`
  - validar proficiencia em iniciativa
- `Robusto`
  - validar bonus de HP maximo por nivel
- `Marca Arcana da Travessia`
  - validar bonus fixo de deslocamento
- `Marca Arcana da Tormenta`
  - validar resistencia a Relampago
- `Marca Arcana da Vigilia`
  - validar reacao com `uses @prof`
- `Marca Anomala`
  - validar mistura de magia escolhida, reacao e recargas diferentes
- `Joguete de Vampiro`
  - validar bonus action com `uses @prof`
- `Escudeiro do Amanhecer`
  - validar consumo de uso apenas em acerto
- `Explorador de Masmorras`
  - validar resistencia a armadilhas e reacao de vantagem

## 6. Conclusao

Nao e viavel automatizar os `42` Talentos de Origem por completo neste momento sem aumentar muito o risco de importar estrutura errada para o Foundry.

O que ja esta maduro:

- `Habilidoso` com `Trait` de escolha aberta
- a direcao tecnica para `Trait`, `uses @prof` e `activity` ja existe em samples reais

O que e viavel na proxima rodada:

- ampliar o importador para proficiencias fixas e escolhas simples
- usar `system.uses` em talentos com usos claramente definidos
- criar `activities` simples para bonus action e reaction quando o gatilho for bem delimitado

O que deve continuar manual por enquanto:

- modificadores contextuais de dano
- efeitos de "uma vez por turno" sem estrutura direta validada
- magias com escolhas amplas de lista e atributo sem novo teste
- bonus de HP, deslocamento, resistencia e sentidos especiais sem validacao de `Active Effects`

Resumo desta auditoria:

- `1` talento pode ser `automatizar-agora`
- `36` talentos devem ficar em `automatizar-parcial`
- `5` talentos devem ficar em `texto-manual`
