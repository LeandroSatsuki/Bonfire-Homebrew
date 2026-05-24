# Teste técnico: Talentos Gerais e Talento de Origem

## 1. Status

- teste manual validado
- ainda não é conversão final
- usa samples exportados do Foundry

## 2. Fonte do teste

Samples analisados:

- `foundry-samples/teste-feat-treinamento-moderado.json`
- `foundry-samples/teste-feat-perfurador.json`
- `foundry-samples/teste-feat-adepto-do-fogo-espiritual.json`
- `foundry-samples/teste-feat-tocado-pelo-no-do-selamento.json`
- `foundry-samples/teste-feat-talento-origem-vinculo.json`

Arquivos autorais comparados:

- `content/general-feats/treinamento-moderado.json`
- `content/general-feats/perfurador.json`
- `content/general-feats/adepto-do-fogo-espiritual.json`
- `content/general-feats/tocado-pelo-no-do-selamento.json`
- `content/origin-feats/habilidoso.json`

## 3. Resultado manual informado pelo autor

Resultado manual registrado:

- os testes funcionaram
- o Foundry respeitou limites
- o Foundry respeitou quais atributos devem aumentar

## 4. Estrutura geral encontrada nos feats

Nos cinco samples, o tipo real exportado foi:

```json
"type": "feat"
```

Campos observados de forma consistente:

- `system.advancement`
- `system.prerequisites`
- `system.requirements`
- `system.activities`
- `system.uses`
- `effects`
- `system.source.rules`

Padrões concretos observados:

- `system.source.rules` veio como `2024` em todos os samples
- `system.prerequisites` existe como estrutura, mas nos samples veio com:
  - `items: []`
  - `repeatable: false`
  - `level: null`
- o pré-requisito textual ficou salvo principalmente em `system.requirements`
- `effects` veio vazio em todos os samples
- `system.advancement` foi o principal lugar para:
  - aumento de atributo (`AbilityScoreImprovement`)
  - proficiências/traços (`Trait`)
- `system.activities` foi usado quando o feat tinha um efeito acionável ou um bloco mecânico que o autor configurou como atividade
- `system.uses` no nível do item foi usado quando havia uso limitado do feat como um todo

Observação importante:

- `system.type.value` e `system.type.subtype` não vieram de forma uniforme
- no sample de `Treinamento Moderado`, apareceu:
  - `system.type.value: "feat"`
  - `system.type.subtype: "origin"`
- nos outros samples de feat testados, `system.type.value` e `system.type.subtype` vieram vazios

## 5. Análise por item

### A. Treinamento Moderado

O aumento de atributo foi salvo por `AbilityScoreImprovement`:

- `configuration.points: 1`
- `configuration.cap: 1`
- `configuration.locked: ["con", "int", "wis", "cha"]`

Isso confirma, no sample, que o Foundry foi configurado para permitir aumento apenas em:

- `Força`
- `Destreza`

As proficiências com armaduras leves, armaduras médias e escudos foram salvas por `Trait`:

- `configuration.grants: ["armor:lgt", "armor:med", "armor:shl"]`

Conclusão específica:

- houve `advancement` real de `Trait`
- as proficiências ficaram estruturadas, não apenas textuais
- o pré-requisito `Nível 4+` ficou textual em `system.requirements`

O que permaneceu textual/manual:

- a descrição narrativa
- a leitura humana do pré-requisito, já que `system.prerequisites.level` ficou `null`

### B. Perfurador

O aumento de atributo foi salvo por `AbilityScoreImprovement`:

- `configuration.points: 1`
- `configuration.cap: 1`
- `configuration.locked: ["con", "int", "wis", "cha"]`

Isso confirma aumento apenas em:

- `Força`
- `Destreza`

O gatilho de combate foi salvo com `activities`:

- duas activities do tipo `utility`
- nomes:
  - `Punção`
  - `Crítico Aprimorado`

Cada activity veio com:

- `activation.type: "action"`
- `target.prompt: true`
- `uses.max: ""`
- `effects: []`

Conclusão específica:

- o Foundry aceitou criar `activity`
- o sample não criou `uses` limitados para o feat
- o comportamento detalhado de “uma vez por turno” e do crítico ficou principalmente descritivo

O que permaneceu textual/manual:

- gatilho contextual de acerto
- controle de “uma vez por turno”
- aplicação automática do `1d4` adicional até o próximo turno

### C. Adepto do Fogo Espiritual

O aumento de atributo foi salvo por `AbilityScoreImprovement`:

- `configuration.points: 1`
- `configuration.cap: 1`
- `configuration.locked: ["str", "dex", "con"]`

Isso confirma aumento apenas em:

- `Inteligência`
- `Sabedoria`
- `Carisma`

O sample criou `activity`:

- uma activity do tipo `utility`
- nome:
  - `Feitiolume Alimentado`

Também vieram:

- `system.uses.max: ""`
- `system.uses.recovery: []`
- `effects: []`

Conclusão específica:

- o Foundry aceitou representar o benefício principal como `activity`
- não houve `uses` estruturados no item
- não houve `effects`

O que permaneceu textual/manual:

- o gasto de até `2 Dados de Vida`
- a adição do total rolado ao dano
- o efeito passivo `Feitiolume Incandescente`

### D. Tocado pelo Nó do Selamento

O aumento de atributo foi salvo por `AbilityScoreImprovement`:

- `configuration.points: 1`
- `configuration.cap: 1`
- `configuration.locked: ["str", "dex", "con", "int"]`

Isso confirma aumento apenas em:

- `Sabedoria`
- `Carisma`

A reação foi salva como `activity`:

- uma activity do tipo `utility`
- nome:
  - `Guarda do Nó`
- `activation.type: "reaction"`
- `activation.condition` preenchido com o gatilho textual

Os usos por Bônus de Proficiência foram salvos em `system.uses`:

- `max: "@prof"`
- `recovery: [{ "period": "lr", "type": "recoverAll" }]`

Na activity, o consumo também foi ligado ao uso do item:

- `consumption.targets` com `type: "itemUses"` e `value: "1"`

Conclusão específica:

- reação configurada de forma real no Foundry
- usos por Bônus de Proficiência configurados de forma real
- recuperação em Descanso Longo configurada de forma real
- a activity também recebeu:
  - `roll.formula: "1d20"`
  - `roll.name` descritivo para a tabela

O que permaneceu textual/manual:

- resolução da tabela `Tocado pelo Nó`
- aplicação dos efeitos específicos de cada resultado
- qualquer efeito derivado que exigiria automação adicional

### E. Habilidoso / Talento de Origem

O sample exportado disponível não é uma exportação do `Habilidoso`, e sim um feat genérico de teste:

- `foundry-samples/teste-feat-talento-origem-vinculo.json`

Nele, o tipo foi salvo como:

```json
"type": "feat"
```

Estrutura encontrada:

- `system.advancement: []`
- `system.activities: {}`
- `system.uses.max: ""`
- `system.requirements: ""`
- `system.type.value: ""`
- `system.type.subtype: ""`

Isso permite concluir:

- `Talento de Origem` pode existir como `feat`
- não apareceu uma marcação estrutural clara de “Talento de Origem” no sample exportado
- no sample, isso ficou apenas textual/descritivo

Sobre `Habilidoso` especificamente:

- o arquivo autoral `content/origin-feats/habilidoso.json` modela:
  - proficiência em qualquer combinação de `3` Perícias ou Ferramentas
- porém isso **não foi confirmado neste conjunto de samples exportados**, porque não há export real do `Habilidoso`

Portanto, ainda não é possível afirmar por este teste:

- como a escolha de `3` perícias/ferramentas foi salva
- se foi possível misturar perícias e ferramentas no export analisado
- se houve marcação estrutural clara de categoria `origin`

## 6. Comparação com os arquivos autorais

### Campos autorais que mapeiam bem para Foundry

- `foundryType`
  - confirma o alvo `feat`
- `minimumLevel`
  - conversa com `system.requirements`, embora não tenha virado `system.prerequisites.level` nos samples
- `abilityIncrease`
  - mapeia bem para `system.advancement` com `AbilityScoreImprovement`
- `grantedProficiencies`
  - mapeia bem para `Trait` quando o teste foi configurado desse jeito
- `actions`
  - conversa bem com `system.activities`, principalmente em feats com gatilho, reação ou uso acionável
- `uses`
  - mapeia para `system.uses` quando o feat teve uso limitado real
- `description`
  - mapeia para `system.description.value`
- `prerequisites`
  - conversa com `system.requirements` textual

### Campos autorais que precisam de transformação

- `abilityIncrease.options`
  - precisa virar `locked` e configuração de pontos dentro de `AbilityScoreImprovement`
- `grantedProficiencies`
  - precisa ser traduzido para códigos reais como:
    - `armor:lgt`
    - `armor:med`
    - `armor:shl`
- `actions`
  - precisa ser traduzido para `activities` reais com:
    - `activation.type`
    - `activation.condition`
    - consumo
    - rolagem
    - target
- `uses`
  - precisa ser convertido para:
    - `max`
    - `recovery`
    - consumo por activity quando aplicável
- `prerequisites`
  - no teste atual, viraram principalmente texto em `system.requirements`, não estrutura rica

### Campos que continuam manuais/contextuais

- gatilhos como “uma vez por turno”
- efeitos passivos ou contínuos sem `Active Effect`
- tabelas e resultados aleatórios contextuais
- resolução de dano adicional situacional
- vínculos conceituais entre `Talento Geral` e `Talento de Origem`
- escolhas abertas de perícia/ferramenta sem sample exportado correspondente

## 7. Conclusões técnicas

- feats são viáveis como `type: "feat"`
- aumento de atributo em feat é viável e foi confirmado nos samples por `AbilityScoreImprovement`
- proficiências em feat são viáveis e foram confirmadas no sample de `Treinamento Moderado` por `Trait`
- `activities` funcionam para representar blocos mecânicos acionáveis, inclusive reação
- `uses` funcionam quando configurados no item, inclusive com `@prof` e recuperação em `lr`
- efeitos contextuais continuam parciais/manuais mesmo quando existe `activity`
- dados autorais ainda não devem ser convertidos em massa sem conversor ou rotina controlada

## 8. Pendências

- validar mais feats com magia concedida real
- validar feats com pré-requisitos complexos
- validar feats com `Active Effects` simples
- validar como separar `Talento de Origem` de `Talento Geral` no Foundry
- decidir se haverá pack separado para `Talentos de Origem` e `Talentos Gerais`
- decidir se a conversão será por macro, script ou criação manual controlada
- obter um sample exportado específico de `Habilidoso` ou outro `Talento de Origem` com escolhas reais para confirmar mistura entre perícias e ferramentas

## 9. Critérios para liberar conversão real

- [ ] samples versionados
- [ ] teste técnico documentado
- [ ] mapeamento de feat atualizado
- [ ] decisão sobre compendiums tomada
- [ ] decisão sobre conversor tomada
- [ ] autorização explícita do autor para converter dados reais para Foundry
