# Decisoes de modelagem: Anao

- Status: `escopo/modelagem`
- Observacao: este arquivo ainda nao e dado real do Foundry. Ele registra decisoes de modelagem e pendencias para uso futuro.

## 1. Fontes consultadas

- `docs/extracoes/racas/anao.md`
- `docs/mapeamento-foundry.md`
- decisoes explicitas do autor nesta conversa

## 2. Decisoes confirmadas

| Campo | Decisao | Observacao |
| --- | --- | --- |
| raca | `Anao` | escopo atual da Fase 1 |
| foundryType futuro | `race` | tipo real confirmado no mapeamento |
| tamanho base | `Medio` | decisao explicita do autor |
| deslocamento base | `30 ft` | decisao explicita do autor |
| idiomas iniciais | `Comum + Anao` | decisao explicita do autor |
| tipo de criatura | `humanoide` | decisao explicita do autor |
| talentos raciais | `feats separados` | devem ficar separados da race |
| acesso a talentos raciais | `existem desde o nivel 1` | continuam organizados por nivel minimo |
| evolucao racial | `talentos escolhidos por nivel` | depende de feats separados e prerequisitos |
| linhagem e essencia | `escolha mutuamente exclusiva` | o jogador recebe Linhagem OU Essencia |
| essencias | `fase futura` | nao serao implementadas agora |
| features de linhagem | `pendencia de modelagem` | se houver linhagem, recebe features dela; se houver essencia, nao recebe features de linhagem |

## 3. Estrutura conceitual sugerida

- `Anao` como item `race`
- tracos raciais base como `features raciais`
- linhagens como escolha interna da raca
- talentos raciais como `feats separados`
- essencias como dependencia futura

Observacao:

- esta estrutura e conceitual e nao cria ainda nenhum arquivo real em `content/`

## 4. Modelagem da escolha Linhagem OU Essencia

No nivel 1, o jogador deve escolher uma rota:

- Rota A: `Linhagem`
- Rota B: `Essencia`

As rotas sao mutuamente exclusivas:

- se escolher `Linhagem`, nao recebe `Essencia`
- se escolher `Essencia`, nao recebe `Linhagem`

Como `Essencia` nao existe ainda:

- a primeira implementacao pode exigir escolha manual ou documentacao temporaria
- nao assumir automacao ate validar o fluxo no Foundry
- a modelagem precisa manter a pendencia registrada para evitar criar features de linhagem como se fossem universais da race

## 5. Tracos base do Anao

### Visao no Escuro Superior

- Classificacao sugerida: `feature racial base`
- Automacao provavel: `sim`
- Pendencias tecnicas:
  - confirmar uso final de senses para alcance `120 ft`

### Vigor e Robustez Ana

- Classificacao sugerida: `feature racial base`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar resistencia a veneno
  - validar vantagem contra `Envenenado`
  - validar aumento de PV maximo por nivel

### Senso da Pedra

- Classificacao sugerida: `feature racial base`
- Automacao provavel: `parcial`
- Pendencias tecnicas:
  - validar `Tremorsense`
  - validar usos por proficiencia
  - validar duracao
  - validar restricao de tocar pedra

## 6. Linhagens identificadas

### Linhagem da Montanha

- Classificacao sugerida: `escolha interna de linhagem`
- Relacao com a escolha Linhagem OU Essencia:
  so existe se o jogador seguir a rota `Linhagem`
- Pendencias tecnicas:
  - decidir como representar a escolha no Foundry
  - decidir como aplicar as features de linhagem sem tratar como tracos universais da race

### Linhagem das Profundezas

- Classificacao sugerida: `escolha interna de linhagem`
- Relacao com a escolha Linhagem OU Essencia:
  so existe se o jogador seguir a rota `Linhagem`
- Pendencias tecnicas:
  - decidir como representar a escolha no Foundry
  - decidir como aplicar as features de linhagem sem tratar como tracos universais da race

## 7. Talentos raciais

- serao `feats separados`
- devem manter prerequisitos de raca, nivel, linhagem e talentos anteriores
- devem ser organizados por nivel minimo
- nao criar talentos reais nesta etapa

## 8. Pendencias

- validar como representar a escolha mutuamente exclusiva no Foundry
- validar `Senso da Pedra`
- validar `Vigor e Robustez Ana`
- validar como o `dnd5e 5.2.4` representa proficiencias, resistencias, sentidos e usos por proficiencia
- extrair e modelar `Essencias` no futuro
- decidir se a primeira versao da raca `Anao` sera criada com `Essencia` apenas documentada como pendencia

## 9. Criterios para liberar criacao de dados reais

- [ ] decisoes basicas registradas
- [ ] tracos base revisados
- [ ] linhagens revisadas
- [ ] talentos raciais revisados
- [ ] pendencias criticas aceitas ou resolvidas
- [ ] autorizacao explicita do autor para criar dados reais
