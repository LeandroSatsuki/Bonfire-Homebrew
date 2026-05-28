# Resultado do dry-run de Talentos de Origem

## 1. Status

- dry-run executado no Foundry
- nao escreveu no compendium
- nao criou itens
- usado para mapear automacao antes da importacao real

## 2. Resultado bruto

- total: `42`
- ready: `1`
- partial: `31`
- manual: `5`
- blocked: `5`
- unresolvedCount: `38`
- errors: `0`

## 3. Ready

- `Habilidoso`

## 4. Manual

- `Atacante Selvagem`
- `Ninja de Hanryo`
- `Cão de Caça`
- `Veterano Mercenário`
- `Iniciado na Ordem de Cavalaria Auralina`

## 5. Blocked

- `Favorecido pelo Divino`
- `Iniciado em Magia`
- `Iniciado no Juramento das Três Luas`
- `Marca Anômala`
- `Robusto`

## 6. Padrões resolvidos com sucesso

- `Habilidoso`: Trait choice `count 3` com `skills:*` e `tool:*`
- `Curandeiro`: Medicina resolvida como `skills:med`
- `Explorador de Masmorras`: Sobrevivência resolvida como `skills:sur`
- `Espião do Submundo`: ferramentas resolvidas como `tool:thief`, `tool:disg`, `tool:forg`
- `Sortudo`: `uses @prof` + recuperação `lr` detectados
- `Joguete de Vampiro`: `uses @prof` + recuperação `lr` detectados
- `Marca Arcana da Vigília`: `uses @prof` + recuperação `lr` detectados

## 7. Problema encontrado

O primeiro dry-run revelou um bug no resolvedor de perícias.

Em alguns casos, `Persuasão` foi resolvida incorretamente como `skills:prc`, que corresponde a `Percepção`.

A causa provável é o uso de aliases ambíguos e busca textual por inclusão curta, o que permitiu que `per` batesse no alvo errado.

Casos observados:

- `Língua de Prata`
- `Assecla do Reinado Dracônico`
- `Porta-Estandarte da Wyrm`
- `Escudeiro do Amanhecer`

## 8. Decisão

Não liberar o importador real ainda.

Primeiro, corrigir o resolvedor de perícias e executar um dry-run v2.

## 9. Próximo critério de aceite

O dry-run v2 deve:

- manter `errors = 0`
- resolver `Persuasão` como `skills:per`, se esse código existir em `CONFIG.DND5E.skills`
- não resolver `Persuasão` como `skills:prc`
- manter `Curandeiro` como `skills:med`
- manter `Habilidoso` como `ready`
- reduzir ou explicar `unresolvedCount`

## 10. Resultado do dry-run v2

- total: `42`
- ready: `1`
- partial: `30`
- manual: `5`
- blocked: `6`
- unresolved: `1`
- errors: `0`

O dry-run v2 passou no Foundry e confirmou que o importador real v2 pode ser criado com automações seguras e escopo conservador.

## 11. Bug de Persuasão resolvido

O bug de resolução de `Persuasão` foi corrigido e os casos validados ficaram assim:

- `Língua de Prata`: `skills:per` + `skills:prf`
- `Assecla do Reinado Dracônico`: `skills:itm` + `skills:per`
- `Escudeiro do Amanhecer`: `skills:per`
- `Porta-Estandarte da Wyrm`: `skills:ins` + `skills:per` + `skills:prf`

## 12. Padrões seguros confirmados para importação

- `Curandeiro`: `skills:med`
- `Explorador de Masmorras`: `skills:sur`
- `Espião do Submundo`: `tool:disg` + `tool:forg` + `tool:thief`
- `Habilidoso`: `choices.count = 3`, `pool = ["skills:*", "tool:*"]`
- `Neófito dos Caminhos de Eldára`: `choices.count = 1`, `pool = ["skills:ani", "skills:nat"]`
- `Sortudo`: `system.uses.max = "@prof"` com recuperação `lr`
- `Joguete de Vampiro`: `system.uses.max = "@prof"` com recuperação `lr`
- `Folião Incansável`: `system.uses.max = "@prof"` com recuperação `lr`
- `Marca Arcana da Vigília`: `system.uses.max = "@prof"` com recuperação `lr`
- `Centelha de Fogo Espiritual`: `system.uses.max = "@prof"` com recuperação `lr`

## 13. Decisão específica sobre Músico

O dry-run v2 detectou `Músico` com `choices.count = 3` e pool `["tool:*"]`, mas esse resultado foi considerado amplo demais para a importação real segura.

Como o talento pede especificamente instrumentos musicais, o importador v2 nao cria `Trait` para `Músico` por enquanto.

Decisão aplicada:

- `Músico` entra como texto/manual no importador real v2
- o bloqueio fica registrado como `musical-instrument-choice-unvalidated`
- a automação so deve ser liberada depois de validar um pool real e restrito para instrumentos musicais

## 14. Ajuste pós-importação v2: uses não consumiam

Depois da importacao real v2, o autor confirmou que os talentos com `system.uses` apareciam no chat, mas nao abriam fluxo de uso nem consumiam carga ao clicar no item.

Causa tecnica confirmada:

- o importador v2 criou `system.uses`
- mas manteve `system.activities = {}`
- no sample real `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`, o consumo depende de `activity.consumption.targets` com `type: "itemUses"` e `value: "1"`

Decisao v2.1:

- criar `utility activities` consumiveis apenas para os talentos com `@prof` + `lr` ja validados
- a `activity` serve so para consumir o recurso
- o efeito mecanico continua textual/manual

Talentos afetados no v2.1:

- `Centelha de Fogo Espiritual`
- `Escudeiro do Amanhecer`
- `Explorador de Masmorras`
- `Marca Arcana da Vigília`
- `Assecla do Reinado Dracônico`
- `Folião Incansável`
- `Joguete de Vampiro`
- `Sortudo`

## 15. Ajuste pós-v2.1: usar sample manual funcional de Sortudo

### Causa

O v2.1 ainda nao consumiu corretamente a carga no Foundry, mesmo com `system.uses` presente no item.

### Decisão v2.2

- usar o sample manual funcional de `Sortudo` como padrão exato para a `utility activity`
- forcar `activation.type = "action"` nos oito talentos com `uses`
- manter a activity apenas como consumidora de `itemUses`
- nao automatizar o efeito mecanico

### Talentos afetados

- `Centelha de Fogo Espiritual`
- `Escudeiro do Amanhecer`
- `Explorador de Masmorras`
- `Marca Arcana da Vigília`
- `Assecla do Reinado Dracônico`
- `Folião Incansável`
- `Joguete de Vampiro`
- `Sortudo`

### Critério de aceite

Ao usar a activity, o contador do item deve diminuir.

Se o contador nao diminuir, a estrutura da activity precisa ser revisada antes de liberar importacao maior.

## 16. Ajuste pós-v2.2: chat da activity sem descrição

### Causa

A v2.2 passou a consumir carga corretamente, mas o chat ainda mostrava somente o nome do talento.

Isso acontecia porque `activity.description.chatFlavor` permanecia vazio, então o Foundry não tinha texto funcional para exibir na mensagem da atividade.

### Decisão v2.3

- preencher `activity.description.chatFlavor` com texto autoral original
- preferir `benefits`
- cair para `mechanicsSummary`
- cair para `description`
- remover apenas blocos editoriais, notas técnicas e textos de pipeline/importação
- não reescrever o conteúdo, apenas reapresentá-lo com HTML seguro e negrito pontual

### Talentos afetados

- `Centelha de Fogo Espiritual`
- `Escudeiro do Amanhecer`
- `Explorador de Masmorras`
- `Marca Arcana da Vigília`
- `Assecla do Reinado Dracônico`
- `Folião Incansável`
- `Joguete de Vampiro`
- `Sortudo`

### Critério de aceite

- usar a activity consome carga
- o chat mostra texto funcional do talento
- o chat não mostra notas de fonte ou importação
- o texto não é reescrito

## 17. Ajuste pós-v2.3: duplicidade de activities

### Causa provável

A v2.3 passou a funcionar corretamente, mas alguns itens ficaram com uma activity antiga e a nova activity funcional ao mesmo tempo.

Isso sugere mesclagem de `system.activities` durante o update de itens já existentes no pack.

### Decisão v2.4

- remover todas as activities antigas de `system.activities` antes de atualizar itens existentes
- reaplicar o `itemData` limpo depois da remoção
- manter a activity funcional única como a utility sem nome exibida como `Utilidade Midi`

### Critério de aceite

- o item deve ficar com apenas uma activity
- essa activity deve consumir uso
- essa activity deve mostrar `chatFlavor`
