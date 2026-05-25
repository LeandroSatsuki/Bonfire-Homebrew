// Importador real v2 de Talentos de Origem para Foundry VTT.
// Executar como Script Macro dentro do Foundry. Nao cria Activities, Active Effects ou Spells.

(async () => {
  const MODULE_ID = "bonfire-homebrew";
  const IMPORTED_BY = "import-origin-feats-v2";
  const PACK_ID = `${MODULE_ID}.TalentosOrigem`;
  const INDEX_PATH = "content/origin-feats/_index.json";
  const DEFAULT_IMG = "systems/dnd5e/icons/svg/items/feature.svg";

  const TRAIT_CHOICE_RULES = new Map([
    [
      "habilidoso",
      {
        count: 3,
        pool: ["skills:*", "tool:*"],
        title: "Aprendizado Versátil",
      },
    ],
    [
      "lingua-de-prata",
      {
        count: 1,
        pool: ["skills:per", "skills:prf"],
      },
    ],
    [
      "assecla-do-reinado-draconico",
      {
        count: 1,
        pool: ["skills:itm", "skills:per"],
      },
    ],
    [
      "porta-estandarte-da-wyrm",
      {
        count: 1,
        pool: ["skills:ins", "skills:per", "skills:prf"],
      },
    ],
    [
      "neofito-dos-caminhos-de-eldara",
      {
        count: 1,
        pool: ["skills:ani", "skills:nat"],
      },
    ],
    // "musico" fica sem Trait no v2: o pool amplo "tool:*" ainda nao valida
    // com seguranca a escolha restrita de instrumentos musicais.
  ]);

  const TRAIT_GRANT_RULES = new Map([
    ["curandeiro", ["skills:med"]],
    ["escudeiro-do-amanhecer", ["skills:per"]],
    ["explorador-de-masmorras", ["skills:sur"]],
    ["espiao-do-submundo", ["tool:disg", "tool:forg", "tool:thief"]],
  ]);

  const USES_BY_PROF_LR = new Set([
    "centelha-de-fogo-espiritual",
    "escudeiro-do-amanhecer",
    "explorador-de-masmorras",
    "marca-arcana-da-vigilia",
    "assecla-do-reinado-draconico",
    "foliao-incansavel",
    "joguete-de-vampiro",
    "sortudo",
  ]);

  const BLOCKED_AUTOMATION_BY_ID = new Map([
    ["alerta", ["initiative"]],
    ["brigao-de-taverna", ["contextual-effects"]],
    ["cao-de-caca", ["senses"]],
    ["musico", ["musical-instrument-choice-unvalidated"]],
    ["robusto", ["hp"]],
    ["marca-arcana-da-tormenta", ["resistance"]],
    ["marca-arcana-da-travessia", ["movement"]],
  ]);

  const summary = {
    created: 0,
    updated: 0,
    comTrait: 0,
    comUses: 0,
    somenteTexto: 0,
    erros: 0,
  };

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

  function textToHtml(text) {
    const normalized = String(text ?? "").replace(/\r\n/g, "\n").trim();
    if (!normalized) return "";

    const blocks = normalized
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    return blocks
      .map((block) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (!lines.length) return "";

        const bulletLike = lines.every((line) => /^-\s+/.test(line));
        if (bulletLike) {
          const items = lines.map((line) => `<li>${escapeHtml(line.replace(/^-\s+/, ""))}</li>`).join("");
          return `<ul>${items}</ul>`;
        }

        return `<p>${lines.map((line) => escapeHtml(line)).join("<br />")}</p>`;
      })
      .join("");
  }

  function stringifyTextEntry(value) {
    if (value == null) return "";
    if (typeof value === "string") return value.trim();
    if (typeof value === "number" || typeof value === "boolean") return String(value);

    if (typeof value === "object") {
      return [
        value.name,
        value.label,
        value.value,
        value.text,
        value.description,
      ]
        .filter((entry) => typeof entry === "string" && entry.trim())
        .join(" - ")
        .trim();
    }

    return String(value).trim();
  }

  function buildTitledTextSection(title, content) {
    const normalized = stringifyTextEntry(content);
    if (!normalized) return "";
    return `<p><strong>${escapeHtml(title)}</strong></p>${textToHtml(normalized)}`;
  }

  function buildTitledListSection(title, entries) {
    const normalizedEntries = asArray(entries).map(stringifyTextEntry).filter(Boolean);
    if (!normalizedEntries.length) return "";

    const items = normalizedEntries.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
    return `<p><strong>${escapeHtml(title)}</strong></p><ul>${items}</ul>`;
  }

  function buildDescriptionHtml(feat) {
    const sections = [];

    const descriptionHtml = textToHtml(feat.description);
    if (descriptionHtml) sections.push(descriptionHtml);

    sections.push(buildTitledTextSection("Resumo mecânico", feat.mechanicsSummary));
    sections.push(buildTitledListSection("Benefícios", feat.benefits));
    sections.push(buildTitledListSection("Pré-requisitos", feat.prerequisites));
    sections.push(buildTitledListSection("Notas", feat.notes));

    return sections.filter(Boolean).join("");
  }

  async function fetchJson(modulePath) {
    const response = await fetch(`modules/${MODULE_ID}/${modulePath}`);
    if (!response.ok) {
      throw new Error(`Falha ao ler ${modulePath}: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  function detectActivityHints(feat) {
    const text = normalizeText(
      [
        feat.description,
        feat.mechanicsSummary,
        ...asArray(feat.benefits),
      ].join(" ")
    );

    const hints = [];
    if (text.includes("acao bonus") || text.includes("acao adicional") || text.includes("bonus action")) {
      hints.push("bonusAction");
    }
    if (text.includes("reacao") || text.includes("reaction")) {
      hints.push("reaction");
    }
    if (text.includes("acao") || text.includes("action")) {
      hints.push("action");
    }
    return unique(hints);
  }

  function detectBlockedAutomations(feat, activityHints) {
    const blocked = [...(BLOCKED_AUTOMATION_BY_ID.get(feat.id) ?? [])];

    if (activityHints.length) blocked.push("activities");
    if (asArray(feat.grantedSpells).length) blocked.push("granted-spells");

    const normalizedDescription = normalizeText(feat.description);
    if (normalizedDescription.includes("resistencia")) blocked.push("contextual-resistance");
    if (normalizedDescription.includes("deslocamento")) blocked.push("contextual-movement");
    if (normalizedDescription.includes("iniciativa")) blocked.push("contextual-initiative");

    return unique(blocked);
  }

  function buildTraitAdvancement(feat) {
    const advancements = [];
    const choiceRule = TRAIT_CHOICE_RULES.get(feat.id);
    const grantRule = TRAIT_GRANT_RULES.get(feat.id);

    if (choiceRule) {
      advancements.push({
        type: "Trait",
        _id: randomId(),
        configuration: {
          allowReplacements: false,
          choices: [
            {
              count: choiceRule.count,
              pool: [...choiceRule.pool],
            },
          ],
          grants: [],
          mode: "default",
        },
        level: 0,
        title: choiceRule.title ?? "",
        hint: "",
        value: {},
      });
    }

    if (grantRule?.length) {
      advancements.push({
        type: "Trait",
        _id: randomId(),
        configuration: {
          allowReplacements: false,
          choices: [],
          grants: [...grantRule],
          mode: "default",
        },
        level: 0,
        title: "",
        hint: "",
        value: {},
      });
    }

    return advancements;
  }

  function buildUses(feat) {
    if (!USES_BY_PROF_LR.has(feat.id)) {
      return {
        spent: 0,
        recovery: [],
        max: "",
      };
    }

    return {
      spent: 0,
      recovery: [
        {
          period: "lr",
          type: "recoverAll",
        },
      ],
      max: "@prof",
    };
  }

  function getAutomationClassification(feat, advancements, uses) {
    const hasChoice = TRAIT_CHOICE_RULES.has(feat.id);
    const hasGrant = TRAIT_GRANT_RULES.has(feat.id);
    const hasUses = uses.max === "@prof";

    if (hasChoice && hasGrant && hasUses) return "trait-choice+grant+uses";
    if (hasChoice && hasGrant) return "trait-choice+grant";
    if (hasChoice && hasUses) return "trait-choice+uses";
    if (hasGrant && hasUses) return "trait-grant+uses";
    if (hasChoice) return "trait-choice";
    if (hasGrant) return "trait-grant";
    if (hasUses) return "uses";
    if (advancements.length) return "trait";
    return "text-only";
  }

  function buildItemData(feat) {
    const advancements = buildTraitAdvancement(feat);
    const uses = buildUses(feat);
    const activityHints = detectActivityHints(feat);
    const blockedAutomations = detectBlockedAutomations(feat, activityHints);
    const automationClassification = getAutomationClassification(feat, advancements, uses);
    const requirements = asArray(feat.prerequisites).map(stringifyTextEntry).filter(Boolean).join(" | ");

    const itemData = {
      name: feat.name,
      type: "feat",
      img: DEFAULT_IMG,
      system: {
        activities: {},
        uses,
        advancement: advancements,
        description: {
          value: buildDescriptionHtml(feat),
          chat: "",
        },
        identifier: slugify(feat.name || feat.id),
        source: {
          revision: 1,
          rules: "2024",
        },
        crewed: false,
        enchant: {},
        prerequisites: {
          items: [],
          repeatable: false,
          level: null,
        },
        properties: [],
        requirements,
        type: {
          value: "feat",
          subtype: "origin",
        },
      },
      effects: [],
      flags: {
        [MODULE_ID]: {
          authorialId: feat.id,
          automationClassification,
          importedBy: IMPORTED_BY,
          activityHints,
          blockedAutomations,
        },
      },
    };

    return {
      itemData,
      metrics: {
        hasTrait: advancements.length > 0,
        hasUses: uses.max === "@prof",
        onlyText: advancements.length === 0 && uses.max !== "@prof",
        automationClassification,
      },
    };
  }

  function logImportRow(row) {
    return {
      nome: row.name,
      operacao: row.operation,
      trait: row.hasTrait ? "sim" : "nao",
      uses: row.hasUses ? "@prof/lr" : "nao",
      classificacao: row.automationClassification,
    };
  }

  try {
    const pack = game.packs.get(PACK_ID);
    if (!pack) {
      throw new Error(`Pack nao encontrado: ${PACK_ID}`);
    }

    const wasLocked = Boolean(pack.locked);
    await pack.configure({ locked: false });

    try {
      const index = await fetchJson(INDEX_PATH);
      const entries = asArray(index.originFeats);
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
      const importRows = [];

      for (const entry of entries) {
        try {
          const filePath = entry.file ?? entry.path ?? `content/origin-feats/${entry.id}.json`;
          const feat = await fetchJson(filePath);
          const { itemData, metrics } = buildItemData(feat);
          const existing = existingByName.get(itemData.name);

          if (existing) {
            updatePayload.push({
              _id: existing.id,
              ...itemData,
            });
            summary.updated += 1;
            importRows.push({
              name: itemData.name,
              operation: "updated",
              ...metrics,
            });
          } else {
            createPayload.push(itemData);
            summary.created += 1;
            importRows.push({
              name: itemData.name,
              operation: "created",
              ...metrics,
            });
          }

          if (metrics.hasTrait) summary.comTrait += 1;
          if (metrics.hasUses) summary.comUses += 1;
          if (metrics.onlyText) summary.somenteTexto += 1;
        } catch (error) {
          summary.erros += 1;
          console.error(`[${IMPORTED_BY}] Falha ao preparar talento ${entry.name ?? entry.id ?? "desconhecido"}:`, error);
        }
      }

      if (createPayload.length) {
        await Item.createDocuments(createPayload, { pack: PACK_ID });
      }

      if (updatePayload.length) {
        await Item.updateDocuments(updatePayload, { pack: PACK_ID });
      }

      console.table(importRows.map(logImportRow));
      console.info(`[${IMPORTED_BY}] Resumo final:`, summary);
      ui.notifications?.info(
        `Talentos de Origem v2: criados ${summary.created}, atualizados ${summary.updated}, comTrait ${summary.comTrait}, comUses ${summary.comUses}, somenteTexto ${summary.somenteTexto}, erros ${summary.erros}.`
      );
    } finally {
      if (pack.locked !== wasLocked) {
        await pack.configure({ locked: wasLocked });
      }
    }
  } catch (error) {
    console.error(`[${IMPORTED_BY}] Falha geral:`, error);
    ui.notifications?.error(`Falha no importador v2 de Talentos de Origem: ${error.message}`);
  }
})();
