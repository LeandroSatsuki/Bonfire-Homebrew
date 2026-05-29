// Importador real v3 de Backgrounds para Foundry VTT.
// Executar como Script Macro dentro do Foundry. Nao cria Active Effects nem Items extras.

(async () => {
  const MODULE_ID = "bonfire-homebrew";
  const IMPORTED_BY = "import-backgrounds-v3";
  const PACK_ID = `${MODULE_ID}.Backgrounds`;
  const FEATURES_PACK_ID = `${MODULE_ID}.Features`;
  const INDEX_PATH = "content/backgrounds/_index.json";
  const DEFAULT_IMG = "systems/dnd5e/icons/svg/items/background.svg";

  const summary = {
    criados: 0,
    atualizados: 0,
    comASI: 0,
    comTraits: 0,
    comItemGrant: 0,
    somenteTexto: 0,
    erros: 0,
  };

  const BLOCKED_DEPENDENCY_RULES = [
    { pattern: "retentores", label: "retainers" },
    { pattern: "escudeiro", label: "squire" },
    { pattern: "companheiro animal", label: "animal-companion" },
    { pattern: "contatos", label: "contacts" },
    { pattern: "contato", label: "contacts" },
    { pattern: "rede de espionagem", label: "contacts" },
    { pattern: "rede de mercenarios", label: "contacts" },
    { pattern: "panteao", label: "pantheon-choice" },
    { pattern: "deus", label: "pantheon-choice" },
    { pattern: "reino de origem", label: "origin-kingdom" },
    { pattern: "reino de escolha", label: "origin-kingdom" },
    { pattern: "veiculo aquatico", label: "water-vehicle" },
  ];

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    return [value];
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function randomId() {
    return globalThis.foundry?.utils?.randomID?.() ?? Math.random().toString(36).slice(2, 18);
  }

  function normalizeText(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function slugify(value) {
    return normalizeText(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  const RULES_BOLD_TERMS = [
    "Bônus de Proficiência",
    "Dados de Vida",
    "Descanso Curto",
    "Descanso Longo",
    "modificador de Constituição",
    "modificador de Carisma",
    "modificador de Destreza",
    "modificador de Força",
    "modificador de Inteligência",
    "modificador de Sabedoria",
    "Testes de Religião",
    "Teste de Acrobacia",
    "Teste de Arcanismo",
    "Teste de Atletismo",
    "Teste de Constituição",
    "Teste de Destreza",
    "Teste de Enganação",
    "Teste de Força",
    "Teste de Furtividade",
    "Teste de História",
    "Teste de Inteligência",
    "Teste de Investigação",
    "Teste de Intimidação",
    "Teste de Intuição",
    "Teste de Medicina",
    "Teste de Natureza",
    "Teste de Percepção",
    "Teste de Persuasão",
    "Teste de Religião",
    "Teste de Sabedoria",
    "Teste de Sobrevivência",
    "Teste de Atuação",
    "vantagem",
    "desvantagem",
    "ação bônus",
    "Ação Bônus",
    "descanso curto",
    "Descanso Curto",
    "ação",
    "Ação",
    "reação",
    "Reação",
    "Pontos de Vida",
    "CD",
    "Teste",
    "Testes",
  ].sort((a, b) => b.length - a.length);
  const RULES_BOLD_OPEN = "__BONFIRE_RULES_BOLD_OPEN__";
  const RULES_BOLD_CLOSE = "__BONFIRE_RULES_BOLD_CLOSE__";

  function isSafeRulesBoundaryChar(char) {
    return !char || /[\s\u00A0.,;:!?()[\]{}<>/\\'"'"'"`~\-–—|]/u.test(char);
  }

  function isSafeRulesMatch(text, start, end) {
    return isSafeRulesBoundaryChar(text[start - 1]) && isSafeRulesBoundaryChar(text[end]);
  }

  function applySafeRulesBolding(text, term) {
    const source = String(text ?? "");
    const needle = String(term ?? "");
    if (!source || !needle) return source;

    let cursor = 0;
    let output = "";

    while (cursor < source.length) {
      const index = source.indexOf(needle, cursor);
      if (index === -1) {
        output += source.slice(cursor);
        break;
      }

      const end = index + needle.length;
      if (isSafeRulesMatch(source, index, end)) {
        output += source.slice(cursor, index);
        output += `${RULES_BOLD_OPEN}${needle}${RULES_BOLD_CLOSE}`;
        cursor = end;
        continue;
      }

      output += source.slice(cursor, end);
      cursor = end;
    }

    return output;
  }

  function applyMarkdownStrongMarkers(text) {
    return String(text ?? "").replace(/\*([^*\n]+?)\*/g, `${RULES_BOLD_OPEN}$1${RULES_BOLD_CLOSE}`);
  }

  function applyRulesInlineFormatting(text) {
    const withMarkers = applyMarkdownStrongMarkers(text);
    return RULES_BOLD_TERMS.reduce((currentText, term) => applySafeRulesBolding(currentText, term), withMarkers);
  }

  function escapeHtmlPreservingMarkers(value) {
    return String(value ?? "")
      .split(RULES_BOLD_OPEN)
      .map((segment) =>
        segment
          .split(RULES_BOLD_CLOSE)
          .map((part) => escapeHtml(part))
          .join(RULES_BOLD_CLOSE)
      )
      .join(RULES_BOLD_OPEN);
  }

  function finalizeRulesHtml(value) {
    return String(value ?? "")
      .replaceAll(RULES_BOLD_OPEN, "<strong>")
      .replaceAll(RULES_BOLD_CLOSE, "</strong>");
  }

  function formatRulesTextHtml(text) {
    const normalized = String(text ?? "").replace(/\r\n/g, "\n").trim();
    if (!normalized) return "";

    const blocks = normalized
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    const html = blocks
      .map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (!lines.length) return "";

        const bulletLike = lines.every((line) => /^[-*•]\s+/.test(line));
        if (bulletLike) {
          const items = lines.map((line) => {
            const content = applyRulesInlineFormatting(line.replace(/^[-*•]\s+/, ""));
            return `<li>${escapeHtmlPreservingMarkers(content)}</li>`;
          }).join("");
          return `<ul>${items}</ul>`;
        }

        const content = lines.map((line) => applyRulesInlineFormatting(line)).join("<br />");
        return `<p>${escapeHtmlPreservingMarkers(content)}</p>`;
      })
      .join("");

    return finalizeRulesHtml(html);
  }

  function stringifyTextEntry(value) {
    if (value == null) return "";
    if (typeof value === "string") return value.trim();
    if (typeof value === "number" || typeof value === "boolean") return String(value);

    if (typeof value === "object") {
      return [
        value.name,
        value.description,
        value.mechanicsSummary,
        value.label,
        value.value,
        value.text,
      ]
        .filter((entry) => typeof entry === "string" && entry.trim())
        .join(" - ")
        .trim();
    }

    return String(value).trim();
  }

  function textToHtml(text) {
    return formatRulesTextHtml(text);
  }

  function buildBackgroundFeatureSection(feature) {
    if (!feature || typeof feature !== "object") return "";

    const sections = [];
    const title = feature.name || "Habilidade do Antecedente";

    sections.push(`<p><strong>${escapeHtml(title)}</strong></p>`);

    if (feature.description || feature.text || feature.value) {
      sections.push(textToHtml(feature.description || feature.text || feature.value));
    }

    return sections.filter(Boolean).join("");
  }

  function buildDescriptionHtml(background) {
    const sections = [];

    const descriptionHtml = textToHtml(background.description);
    if (descriptionHtml) sections.push(descriptionHtml);

    sections.push(buildBackgroundFeatureSection(background.backgroundFeature));

    return sections.filter(Boolean).join("");
  }

  function buildAuthorialSnapshot(background) {
    return {
      description: background.description ?? "",
      mechanicsSummary: background.mechanicsSummary ?? "",
      baseRules: background.baseRules ?? {},
      backgroundFeature: background.backgroundFeature ?? {},
      dependencies: asArray(background.dependencies),
      notes: asArray(background.notes),
      automation: background.automation ?? "",
    };
  }

  async function fetchJson(modulePath) {
    const response = await fetch(`modules/${MODULE_ID}/${modulePath}`);
    if (!response.ok) {
      throw new Error(`Falha ao ler ${modulePath}: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  function detectBlockedAutomations(background) {
    const haystack = normalizeText(
      [
        ...asArray(background.dependencies),
        ...asArray(background.backgroundFeature?.dependencies),
        background.description,
        background.mechanicsSummary,
        background.backgroundFeature?.description,
        background.backgroundFeature?.mechanicsSummary,
      ].join(" | ")
    );

    const blocked = [
      "background-feature-itemgrant-unvalidated",
      "origin-feat-link-unvalidated",
      "starting-equipment-unconfigured",
    ];

    for (const rule of BLOCKED_DEPENDENCY_RULES) {
      if (haystack.includes(normalizeText(rule.pattern))) blocked.push(rule.label);
    }

    return unique(blocked);
  }

  function buildAbilityScoreAdvancement() {
    return {
      type: "AbilityScoreImprovement",
      configuration: {
        points: 3,
        cap: 2,
        fixed: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0,
        },
        locked: [],
        recommendation: null,
        max: null,
      },
      _id: randomId(),
      value: {
        type: "asi",
      },
      level: 0,
      title: "",
      hint: "",
    };
  }

  function buildSkillTraitAdvancement() {
    return {
      type: "Trait",
      title: "Background Proficiencies",
      _id: randomId(),
      configuration: {
        allowReplacements: false,
        choices: [
          {
            count: 2,
            pool: ["skills:*"],
          },
        ],
        grants: [],
        mode: "default",
      },
      level: 0,
      hint: "",
      value: {},
    };
  }

  function buildLanguageToolTraitAdvancement() {
    return {
      type: "Trait",
      title: "Choose Languages",
      configuration: {
        grants: ["languages:standard:common"],
        allowReplacements: false,
        choices: [
          {
            count: 2,
            pool: ["languages:*", "tool:*"],
          },
        ],
        mode: "default",
      },
      _id: randomId(),
      level: 0,
      hint: "",
      value: {},
    };
  }

  function buildItemGrantAdvancement(featureDoc, background) {
    const featureName = `Habilidade do Antecedente: ${background.name}`;
    const featureUuid = featureDoc.uuid ?? `Compendium.${FEATURES_PACK_ID}.${featureDoc.id}`;
    return {
      type: "ItemGrant",
      title: featureName,
      _id: randomId(),
      configuration: {
        items: [
          {
            uuid: featureUuid,
            optional: false,
          },
        ],
        optional: false,
        spell: null,
      },
      value: {},
      level: 0,
      hint: stringifyTextEntry(background.backgroundFeature?.description),
    };
  }

  function getAutomationClassification(metrics, blockedAutomations) {
    const parts = [];
    if (metrics.hasASI) parts.push("asi");
    if (metrics.hasTraits) parts.push("traits");
    if (!parts.length) parts.push("text-only");
    if (blockedAutomations.length) parts.push("blocked-context");
    return parts.join("+");
  }

  function buildItemData(background) {
    const advancements = [
      buildAbilityScoreAdvancement(),
      buildSkillTraitAdvancement(),
      buildLanguageToolTraitAdvancement(),
    ];

    const blockedAutomations = detectBlockedAutomations(background);
    const metrics = {
      hasASI: true,
      hasTraits: true,
      onlyText: false,
    };
    const automationClassification = getAutomationClassification(metrics, blockedAutomations);

    return {
      itemData: {
        name: background.name,
        type: "background",
        img: DEFAULT_IMG,
        system: {
          advancement: advancements,
          description: {
            value: buildDescriptionHtml(background),
            chat: "",
          },
          identifier: slugify(background.name || background.id),
          source: {
            revision: 1,
            rules: "2024",
          },
          startingEquipment: [],
          wealth: "100",
        },
        effects: [],
        flags: {
          [MODULE_ID]: {
            authorialId: background.id,
            importedBy: IMPORTED_BY,
            automationClassification,
            blockedAutomations,
            authorialSnapshot: buildAuthorialSnapshot(background),
          },
        },
      },
      metrics: {
        ...metrics,
        automationClassification,
        blockedAutomations,
      },
    };
  }

  function buildLogRow(row) {
    return {
      nome: row.name,
      operacao: row.operation,
      asi: row.hasASI ? "sim" : "nao",
      traits: row.hasTraits ? "sim" : "nao",
      itemGrant: row.hasItemGrant ? "sim" : "nao",
      classificacao: row.automationClassification,
      bloqueios: row.blockedAutomations.join(" | ") || "-",
    };
  }

  try {
    const pack = game.packs.get(PACK_ID);
    if (!pack) {
      throw new Error(`Pack nao encontrado: ${PACK_ID}`);
    }

    const featuresPack = game.packs.get(FEATURES_PACK_ID);
    if (!featuresPack) {
      throw new Error(`Pack de Features nao encontrado: ${FEATURES_PACK_ID}`);
    }

    const wasLocked = Boolean(pack.locked);
    await pack.configure({ locked: false });

    try {
      const index = await fetchJson(INDEX_PATH);
      const entries = asArray(index.backgrounds);
      if (entries.length !== 30) {
        throw new Error(`Quantidade inesperada de backgrounds no indice: ${entries.length}. Esperado: 30.`);
      }

      const featureDocs = await featuresPack.getDocuments();
      const featureByName = new Map(featureDocs.map((doc) => [doc.name, doc]));
      const expectedFeatureNames = entries.map((entry) => `Habilidade do Antecedente: ${entry.name}`);
      const missingFeatures = expectedFeatureNames.filter((name) => !featureByName.has(name));

      if (missingFeatures.length) {
        throw new Error(
          `Features ausentes no pack ${FEATURES_PACK_ID}: ${missingFeatures.join(", ")}. Importe as 30 Features antes dos Backgrounds.`
        );
      }

      const existingDocs = await pack.getDocuments();
      const existingByName = new Map();

      for (const doc of existingDocs) {
        if (!existingByName.has(doc.name)) {
          existingByName.set(doc.name, doc);
        } else {
          console.warn(`[${IMPORTED_BY}] Nome duplicado ja existente no pack, mantendo o primeiro: ${doc.name}`);
        }
      }

      const createPayload = [];
      const updatePayload = [];
      const rows = [];

      for (const entry of entries) {
        try {
          const filePath = entry.file ?? entry.path ?? `content/backgrounds/${entry.id}.json`;
          const background = await fetchJson(filePath);
          const featureName = `Habilidade do Antecedente: ${background.name}`;
          const featureDoc = featureByName.get(featureName);
          if (!featureDoc) {
            throw new Error(`Feature correspondente nao encontrada para ${background.name}`);
          }

          const { itemData, metrics } = buildItemData(background);
          itemData.system.advancement.push(buildItemGrantAdvancement(featureDoc, background));
          metrics.hasItemGrant = true;
          const existing = existingByName.get(itemData.name);

          if (existing) {
            updatePayload.push({
              _id: existing.id,
              ...itemData,
            });
            summary.atualizados += 1;
            rows.push({
              name: itemData.name,
              operation: "updated",
              ...metrics,
            });
          } else {
            createPayload.push(itemData);
            summary.criados += 1;
            rows.push({
              name: itemData.name,
              operation: "created",
              ...metrics,
            });
          }

          if (metrics.hasASI) summary.comASI += 1;
          if (metrics.hasTraits) summary.comTraits += 1;
          if (metrics.hasItemGrant) summary.comItemGrant += 1;
          if (metrics.onlyText) summary.somenteTexto += 1;
        } catch (error) {
          summary.erros += 1;
          console.error(`[${IMPORTED_BY}] Falha ao preparar background ${entry.name ?? entry.id ?? "desconhecido"}:`, error);
        }
      }

      if (createPayload.length) {
        await Item.createDocuments(createPayload, { pack: PACK_ID });
      }

      if (updatePayload.length) {
        await Item.updateDocuments(updatePayload, { pack: PACK_ID });
      }

      console.table(rows.map(buildLogRow));
      console.info(`[${IMPORTED_BY}] Resumo final:`, summary);
      ui.notifications?.info(
        `Backgrounds v3: criados ${summary.criados}, atualizados ${summary.atualizados}, comASI ${summary.comASI}, comTraits ${summary.comTraits}, comItemGrant ${summary.comItemGrant}, somenteTexto ${summary.somenteTexto}, erros ${summary.erros}.`
      );
    } finally {
      if (pack.locked !== wasLocked) {
        await pack.configure({ locked: wasLocked });
      }
    }
  } catch (error) {
    console.error(`[${IMPORTED_BY}] Falha geral:`, error);
    ui.notifications?.error(`Falha no importador v3 de Backgrounds: ${error.message}`);
  }
})();
