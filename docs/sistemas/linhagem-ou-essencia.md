# Sistema de Linhagem ou Essencia

- Status: `escopo/modelagem`
- Observacao: este documento ainda nao e dado real do Foundry. Ele registra a modelagem geral da escolha entre Linhagem e Essencia no projeto.

## 1. Objetivo do sistema

Algumas racas ou species podem exigir uma escolha no nivel 1 entre:

- `Linhagem`
- `Essencia`

Quando a raca definir isso, a escolha e mutuamente exclusiva.

## 2. Regra geral

- o personagem nao pode receber `Linhagem` e `Essencia` ao mesmo tempo na mesma raca
- se escolher `Linhagem`, recebe as features da linhagem escolhida
- se escolher `Essencia`, nao recebe features de linhagem
- `Essencia` e uma camada futura do projeto
- enquanto `Essencias` nao forem implementadas, a escolha pode ficar documentada ou manual

Observacao:

- nao assumir automacao real antes de validar como o `dnd5e 5.2.4` representa esse tipo de escolha

## 3. Caso de referencia: Anao

Usando o `Anao` como exemplo de escopo:

- `Anao` possui `Divergencia Ancestral`
- no nivel 1, escolhe `Linhagem` OU `Essencia`
- linhagens identificadas:
  - `Linhagem da Montanha`
  - `Linhagem das Profundezas`
- essencias identificadas na fonte, mas nao implementadas agora
- `Essencia` e dependencia futura

## 4. Modelagem conceitual

Sem criar arquivos reais:

- a raca ou species base contem os tracos comuns
- a escolha `Linhagem OU Essencia` deve ser registrada como parte da raca
- linhagens podem ser tratadas como features de escolha racial
- essencias serao sistema proprio futuro
- talentos raciais podem depender de linhagem ou essencia

Observacao:

- isso ainda e modelagem conceitual
- nao define schema nativo do Foundry

## 5. Relacao com talentos raciais

- talentos raciais podem exigir uma `Linhagem` especifica
- talentos raciais podem exigir uma `Essencia` especifica futuramente
- talentos que dependem de `Essencia` devem ficar pendentes ate o sistema de essencias existir
- talentos que dependem de `Linhagem` podem ser modelados apos a linhagem estar validada

## 6. Automacao no Foundry

Possibilidades a considerar:

- `manual/documentada`
- `Advancement` com escolha, se validado
- `ItemGrant` ou `ItemChoice`, se validado
- nao assumir automacao sem teste real no Foundry

O `dnd5e 5.2.4` precisa ser testado antes de escolher a abordagem final.

## 7. Formato autoral futuro

Sem criar arquivos reais, uma camada autoral futura para essa escolha pode usar campos como:

- `choiceId`
- `name`
- `type`
- `linkedSpecies`
- `mutuallyExclusive`
- `options`
- `grants`
- `blockedBy`
- `notes`

Observacao importante:

- isso nao e schema nativo do Foundry
- isso e apenas estrutura autoral sugerida para planejamento em `content/`

## 8. Pendencias

- validar se `Advancement` consegue representar a escolha `Linhagem OU Essencia`
- validar se `ItemChoice` ou `ItemGrant` resolve o caso
- validar se `Essencias` terao compendium proprio no futuro
- validar como impedir escolha dupla
- validar como registrar pre-requisitos de talentos ligados a linhagem ou essencia
- decidir se a primeira versao do `Anao` sera implementada com `Essencia` apenas documentada como pendencia

## 9. Criterios para liberar dados reais

- [ ] sistema documentado
- [ ] decisao por raca registrada
- [ ] opcoes de linhagem revisadas
- [ ] essencias marcadas como futuras
- [ ] talentos dependentes identificados
- [ ] abordagem no Foundry testada manualmente
- [ ] autorizacao explicita do autor para criar dados reais
