# Auditoria inicial

Projeto: Bonfire Homebrew  
Escopo: auditoria da pasta raiz como módulo de conteúdo para Foundry VTT v13, sistema dnd5e 5.2.4+, regra base D&D 2024 e Plutonium 2.13.12.  
Observação: `AGENTS.md` foi lido e contém instruções de projeto, ordem de implementação, restrições de edição e diretrizes para Foundry dnd5e. Nenhum banco de compendium ou manifesto foi alterado.

## 1. Estrutura atual da pasta

Estrutura inspecionada na raiz do módulo:

```text
bonfire-homebrew/
  .git/
  .gitattributes
  AGENTS.md
  module.json
  docs/
    auditoria-inicial.md
  packs/
    Classes/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    Features/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    Macros/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    Racas/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    Regras/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    Subclasses/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
    TalentosRaciais/
      000003.log
      CURRENT
      LOG
      MANIFEST-000002
```

Notas:

- `AGENTS.md` existe e contém instruções locais do projeto.
- `.gitattributes` contém `packs/** binary`, o que é adequado para evitar diffs textuais ruins nos bancos LevelDB dos compendiums.
- Os diretórios de packs parecem ter sido criados pelo Foundry como bancos de compendium vazios ou recém-inicializados.
- `AGENTS.md` aparece modificado no working tree em relação ao commit inicial; tratar essa mudança como instrução de projeto a preservar.

## 2. Manifesto do módulo

O arquivo que parece ser o manifesto do módulo é:

```text
module.json
```

Ele está na raiz do projeto e contém os campos principais de identificação, compatibilidade, autores, flags e packs.

## 3. ID, título, versão e compatibilidade declarada

Valores declarados em `module.json`:

| Campo | Valor |
| --- | --- |
| `id` | `bonfire-homebrew` |
| `title` | `Bonfire Homebrew` |
| `version` | `1.0.0` |
| `compatibility.minimum` | `13` |
| `compatibility.verified` | `13` |

Observações:

- A descrição do módulo está vazia: `description: ""`.
- A compatibilidade declarada cobre Foundry VTT 13 de forma genérica.
- Não há, no manifesto global, uma declaração explícita de versão mínima do sistema `dnd5e` ou do Plutonium. Os packs, individualmente, declaram `system: "dnd5e"` quando aplicável.

## 4. Compendium packs existentes

Packs declarados no manifesto:

| Nome | Label | Caminho | Tipo | Sistema |
| --- | --- | --- | --- | --- |
| `Regras` | `Regras` | `packs/Regras` | `JournalEntry` | `dnd5e` |
| `Racas` | `Racas` | `packs/Racas` | `Item` | `dnd5e` |
| `TalentosRaciais` | `TalentosRaciais` | `packs/TalentosRaciais` | `Item` | `dnd5e` |
| `Classes` | `Classes` | `packs/Classes` | `Item` | `dnd5e` |
| `Subclasses` | `Subclasses` | `packs/Subclasses` | `Item` | `dnd5e` |
| `Features` | `Features` | `packs/Features` | `Item` | `dnd5e` |
| `Macros` | `Macros` | `packs/Macros` | `Macro` | `dnd5e` |

Todos os caminhos declarados existem na pasta `packs/`.

## 5. Pastas importantes existentes ou faltantes

Pastas existentes:

- `.git/`: repositório Git local.
- `packs/`: compendiums do Foundry.
- `packs/Regras/`: journal entries para regras.
- `packs/Racas/`: itens para raças/species.
- `packs/TalentosRaciais/`: itens para talentos raciais.
- `packs/Features/`: itens para features/talentos.
- `packs/Classes/`: itens para classes.
- `packs/Subclasses/`: itens para subclasses.
- `packs/Macros/`: macros.
- `docs/`: criada para guardar este relatório.

Pastas ou arquivos importantes que faltam ou ainda não existem:

- `packs/Backgrounds/`: não existe, embora backgrounds estejam no objetivo do projeto.
- `README.md`: útil para explicar escopo, versão de Foundry/sistema e fluxo de instalação.
- `CHANGELOG.md`: útil para registrar alterações de conteúdo por versão.
- `docs/convencoes.md`: recomendado para padronizar nomes, tipos de item, fontes e tags antes de criar conteúdo.
- `docs/plano-de-conteudo.md`: recomendado para organizar a ordem de implementação sem misturar fases.
- `content/species/`, `content/racial-feats/`, `content/features/`, `content/backgrounds/`, `content/classes/` e `content/subclasses/`: citadas em `AGENTS.md` como estrutura futura possível para fontes de conteúdo.
- `foundry-samples/`: citada em `AGENTS.md` como estrutura futura possível para exemplos inspecionados do Foundry.
- `scripts/` e `dist/`: citadas em `AGENTS.md` como estrutura futura possível, mas ainda não necessárias para um módulo vazio de conteúdo.
- `assets/` ou `icons/`: ainda não existe; só deve ser criada quando houver ícones/imagens próprios.
- `lang/`: ainda não existe; só deve ser criada se houver textos de interface/localização do módulo.

## 6. Riscos encontrados

- Os packs são bancos LevelDB do Foundry. Editar arquivos dentro de `packs/` manualmente pode corromper compendiums; o caminho seguro é usar o Foundry ou um processo de export/import validado.
- O projeto tem uma etapa planejada para `Backgrounds`, mas não há pack de backgrounds no manifesto nem em `packs/`.
- `Subclasses` já existe como pack, embora o objetivo diga que subclasses devem vir somente depois, uma por vez. Isso não é problema por si só, mas aumenta o risco de colocar conteúdo fora de ordem.
- `AGENTS.md` tem instruções locais, mas ainda aparece como mudança não commitada; convém versionar essa base antes de começar conteúdo.
- O manifesto declara compatibilidade com Foundry 13, mas não registra de forma global a versão mínima esperada do sistema dnd5e 5.2.4+ nem o papel do Plutonium.
- O nome interno dos packs mistura português sem acento (`Racas`, `TalentosRaciais`) e inglês (`Features`). Isso pode ser aceitável, mas deve ser tratado como convenção deliberada para evitar renomeações futuras.
- A descrição do manifesto está vazia, o que dificulta identificar o propósito do módulo dentro do Foundry ou em uma distribuição futura.
- O padrão de conteúdo listado em `AGENTS.md` (`id`, `rulesText`, `foundryType`, etc.) parece ser metadado autoral/de planejamento, não necessariamente campo nativo do Foundry. É importante manter essa separação para não inventar schema de compendium.
- Durante o commit inicial, o Git avisou que `.gitattributes` e `module.json` podem passar por conversão LF/CRLF. Não é um bloqueio, mas convém manter atenção em diffs de manifesto.

## 7. Estrutura mínima recomendada

Estrutura mínima recomendada para este projeto de conteúdo:

```text
bonfire-homebrew/
  module.json
  AGENTS.md
  README.md
  CHANGELOG.md
  docs/
    auditoria-inicial.md
    convencoes.md
    plano-de-conteudo.md
  content/
    species/
    racial-feats/
    features/
    backgrounds/
    classes/
    subclasses/
  foundry-samples/
  packs/
    Regras/
    Racas/
    TalentosRaciais/
    Features/
    Backgrounds/
    Classes/
    Subclasses/
    Macros/
  assets/
    icons/
```

Recomendação prática:

- Manter `packs/` como área editada apenas pelo Foundry ou por ferramenta validada.
- Usar `content/` apenas para planejamento/fonte autoral, sem presumir que seus campos são campos nativos do Foundry.
- Adicionar `Backgrounds` somente com autorização para alterar o manifesto.
- Criar `assets/` apenas quando houver arquivos reais de imagem/ícone para versionar.
- Evitar `scripts/`, `styles/`, `templates/` e `dist/` enquanto o módulo for apenas de conteúdo e não houver fluxo de build/export definido.

## 8. Próximas 5 tarefas pequenas

1. Revisar e versionar `AGENTS.md` para congelar as regras locais antes de criar conteúdo.
2. Criar `docs/convencoes.md` com padrão de nomes, idioma dos labels, ordem de criação e como registrar fontes.
3. Criar `docs/plano-de-conteudo.md` com uma lista curta das primeiras raças/species planejadas, sem criar os itens ainda.
4. Abrir o módulo no Foundry v13 com dnd5e 5.2.4+ e confirmar que todos os packs vazios aparecem sem erro no console.
5. Decidir, antes de editar `module.json`, se `Backgrounds` terá pack próprio e qual nome interno/label será usado.

## Dúvidas técnicas

- No dnd5e 5.2.4 com regra base D&D 2024, o tipo de `Item` correto para Species/Raças deve ser confirmado dentro do sistema antes de criar conteúdo.
- O papel do Plutonium precisa ser definido: ferramenta auxiliar de importação, dependência operacional, ou apenas referência no ambiente de criação.
- A convenção de nomes internos dos packs deve permanecer como está (`Racas`, `TalentosRaciais`, `Features`) ou ser padronizada antes da criação de conteúdo?
- Backgrounds devem ser adicionados agora como pack vazio ou apenas quando a fase 4 começar?
- Os campos de planejamento em `AGENTS.md` devem viver somente em arquivos fonte de `content/` ou também em algum campo seguro de dados/flags dos itens no Foundry?
