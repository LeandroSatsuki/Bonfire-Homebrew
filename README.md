# Bonfire Homebrew

Bonfire Homebrew é um módulo de conteúdo homebrew para Foundry VTT v13.

O alvo principal deste projeto é o sistema `dnd5e` na versão `5.2.4` ou superior, usando como regra base o D&D 2024.

O Plutonium `2.13.12` entra neste repositório apenas como ferramenta auxiliar de importação, comparação e apoio de processo. Ele não é uma dependência estrutural do módulo.

Este repositório está sendo preparado para organizar conteúdo jogável de forma segura e incremental, respeitando o fluxo nativo do Foundry VTT e do sistema `dnd5e`.

## Ordem de implementação

1. Raças / Species
2. Talentos raciais
3. Talentos / Features
4. Backgrounds
5. Classes
6. Subclasses

Subclasses devem ser tratadas somente depois da validação das etapas anteriores e sempre uma por vez.

## Estrutura do projeto

- `module.json`: manifesto atual do módulo.
- `packs/`: compendiums do Foundry VTT. Esta área não deve ser editada manualmente.
- `docs/`: documentação de processo, convenções e planejamento.
- `content/`: fonte autoral e material de organização interna. Esta área não representa diretamente o schema nativo do Foundry.
- `foundry-samples/`: espaço reservado para referências inspecionadas do Foundry, quando necessário.

## Estado atual

O módulo ainda está em preparação estrutural. Nesta etapa, o foco é estabelecer documentação, convenções e áreas seguras de organização antes da criação de conteúdo mecânico.
