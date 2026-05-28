// Importador real v2.3 de Talentos de Origem para Foundry VTT.
// Executar como Script Macro dentro do Foundry.
// Cria/atualiza feats conservadores e, para os 8 talentos validados, cria
// uma utility activity consumivel baseada no sample manual funcional do Sortudo.

(async () => {
  const MODULE_ID = "bonfire-homebrew";
  const IMPORTED_BY = "import-origin-feats-v2.4";
  const PACK_ID = `${MODULE_ID}.TalentosOrigem`;
  const INDEX_PATH = "content/origin-feats/_index.json";
  const DEFAULT_IMG = "systems/dnd5e/icons/svg/items/feature.svg";
  const ACTIVITY_TEMPLATE = "manual-sortudo-working-sample";
  const CHAT_FLAVOR_BOLD_TERMS = [
    "Bônus de Proficiência",
    "Descanso Longo",
    "Teste de Resistência",
    "Jogada de Ataque",
    "Teste de d20",
    "Ação Bônus",
    "Pontos de Vida",
    "Pontos de Sorte",
    "1 Ponto de Sorte",
    "1 uso",
    "Vantagem",
    "Desvantagem",
    "Reação",
    "Ação",
    "CD",
    "Quando",
    "Sempre que",
    "Se",
  ].sort((a, b) => b.length - a.length);
  const CHAT_FLAVOR_MARKER_OPEN = "__CHAT_FLAVOR_BOLD_OPEN__";
  const CHAT_FLAVOR_MARKER_CLOSE = "__CHAT_FLAVOR_BOLD_CLOSE__";

  const TRAIT_CHOICE_RULES = new Map([
    ["habilidoso", { count: 3, pool: ["skills:*", "tool:*"], title: "Aprendizado Versátil" }],
    ["lingua-de-prata", { count: 1, pool: ["skills:per", "skills:prf"] }],
    ["assecla-do-reinado-draconico", { count: 1, pool: ["skills:itm", "skills:per"] }],
    ["porta-estandarte-da-wyrm", { count: 1, pool: ["skills:ins", "skills:per", "skills:prf"] }],
    ["neofito-dos-caminhos-de-eldara", { count: 1, pool: ["skills:ani", "skills:nat"] }],
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

  const CONSUMABLE_ACTIVITY_RULES = new Set([
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
    comChatFlavor: 0,
    activitiesLimpas: 0,
    somenteTexto: 0,
    erros: 0,
    comActivityConsumivel: 0,
  };

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    return [value];
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function escapeRegExp(value) {
    return String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
      .replace(/"/g, "&quot;");
  }

  function isChatFlavorBoundaryChar(char) {
    return !char || /[\s\u00A0.,;:!?()[\]{}<>/\\'"'"'"`~\-–—|]/u.test(char);
  }

  function isSafeChatFlavorMatch(text, start, end) {
    return isChatFlavorBoundaryChar(text[start - 1]) && isChatFlavorBoundaryChar(text[end]);
  }

  function applySafeChatFlavorBolding(text, term) {
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
      if (isSafeChatFlavorMatch(source, index, end)) {
        output += source.slice(cursor, index);
        output += `${CHAT_FLAVOR_MARKER_OPEN}${needle}${CHAT_FLAVOR_MARKER_CLOSE}`;
        cursor = end;
        continue;
      }

      output += source.slice(cursor, end);
      cursor = end;
    }

    return output;
  }

  function markChatFlavorEmphasis(text) {
    return CHAT_FLAVOR_BOLD_TERMS.reduce((currentText, term) => applySafeChatFlavorBolding(currentText, term), String(text ?? ""));
  }

  function finalizeChatFlavorHtml(html) {
    return String(html ?? "")
      .replaceAll(CHAT_FLAVOR_MARKER_OPEN, "<strong>")
      .replaceAll(CHAT_FLAVOR_MARKER_CLOSE, "</strong>");
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
      return [value.name, value.label, value.value, value.text, value.description].filter(Boolean).join(" - ").trim();
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

  function isEditorialChatFlavorLine(line) {
    const normalized = normalizeText(String(line ?? "").replace(/^[\-•]\s*/, "").trim());
    if (!normalized) return true;

    const blockedStarts = [
      "gerado a partir",
      "conteudo autoral ainda nao convertido",
      "conteudo autoral ainda nao convertido para o schema nativo do foundry",
      "resumo mecanico",
      "fonte",
      "notas",
      "talentos gerais",
      "utilidade",
      "social",
      "pipeline",
      "importador",
      "importacao",
    ];

    return blockedStarts.some((prefix) => normalized === prefix || normalized.startsWith(prefix));
  }

  function buildChatFlavorHtmlFromText(text, { preserveParagraphs = false } = {}) {
    const normalized = String(text ?? "").replace(/\r\n/g, "\n").trim();
    if (!normalized) return "";

    const cleanedText = preserveParagraphs
      ? normalized
          .split(/\n{2,}/)
          .map((block) =>
            block
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line && !isEditorialChatFlavorLine(line))
              .join("\n")
              .trim()
          )
          .filter(Boolean)
          .join("\n\n")
      : normalized
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line && !isEditorialChatFlavorLine(line))
          .join("\n")
          .trim();

    if (!cleanedText) return "";

    return finalizeChatFlavorHtml(textToHtml(markChatFlavorEmphasis(cleanedText)));
  }

  function buildActivityChatFlavor(feat) {
    const benefitTexts = asArray(feat.benefits).map(stringifyTextEntry).filter(Boolean);
    if (benefitTexts.length) {
      return {
        chatFlavor: buildChatFlavorHtmlFromText(benefitTexts.map((entry) => `- ${entry}`).join("\n")),
        source: "benefits",
      };
    }

    const mechanicsSummary = stringifyTextEntry(feat.mechanicsSummary);
    if (mechanicsSummary) {
      return {
        chatFlavor: buildChatFlavorHtmlFromText(
          mechanicsSummary
            .split(/\s*\|\s*/)
            .map((entry) => entry.trim())
            .filter(Boolean)
            .map((entry) => `- ${entry}`)
            .join("\n")
        ),
        source: "mechanicsSummary",
      };
    }

    const description = stringifyTextEntry(feat.description);
    if (description) {
      return {
        chatFlavor: buildChatFlavorHtmlFromText(description, { preserveParagraphs: true }),
        source: "description",
      };
    }

    return { chatFlavor: "", source: "" };
  }

  function buildActivityDeletionPayload(existingDoc) {
    const existingData = existingDoc?.toObject?.() ?? {};
    const existingActivities = existingData.system?.activities ?? {};
    const payload = {};

    for (const activityKey of Object.keys(existingActivities)) {
      payload[`system.activities.-=${activityKey}`] = null;
    }

    return payload;
  }

  async function fetchJson(modulePath) {
    const response = await fetch(`modules/${MODULE_ID}/${modulePath}`);
    if (!response.ok) {
      throw new Error(`Falha ao ler ${modulePath}: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  function detectActivityHints(feat) {
    const text = normalizeText([feat.description, feat.mechanicsSummary, ...asArray(feat.benefits)].join(" "));
    const hints = [];
    if (text.includes("acao bonus") || text.includes("acao adicional") || text.includes("bonus action")) hints.push("bonusAction");
    if (text.includes("reacao") || text.includes("reaction")) hints.push("reaction");
    if (text.includes("acao") || text.includes("action")) hints.push("action");
    return unique(hints);
  }

  function detectBlockedAutomations(feat, activityHints, hasConsumableActivity) {
    const blocked = [...(BLOCKED_AUTOMATION_BY_ID.get(feat.id) ?? [])];

    if (activityHints.length && !hasConsumableActivity) blocked.push("activities-unmodeled");
    if (hasConsumableActivity) blocked.push("activity-effect-manual");
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

  function buildConsumableUtilityActivity(feat, chatFlavorData) {
    if (!CONSUMABLE_ACTIVITY_RULES.has(feat.id)) return {};

    const activityId = randomId();
    return {
      [activityId]: {
        type: "utility",
        _id: activityId,
        sort: 0,
        activation: {
          type: "action",
          override: false,
          condition: "",
        },
        consumption: {
          scaling: {
            allowed: false,
          },
          spellSlot: true,
          targets: [
            {
              type: "itemUses",
              value: "1",
              target: "",
              scaling: {},
            },
          ],
        },
        description: {
          chatFlavor: chatFlavorData?.chatFlavor ?? "",
        },
        duration: {
          units: "inst",
          concentration: false,
          override: false,
        },
        effects: [],
        flags: {},
        range: {
          units: "self",
          override: false,
          special: "",
        },
        target: {
          template: {
            contiguous: false,
            units: "ft",
            type: "",
          },
          affects: {
            choice: false,
            type: "",
          },
          override: false,
          prompt: true,
        },
        uses: {
          spent: 0,
          recovery: [],
          max: "",
        },
        visibility: {
          level: {
            min: null,
            max: null,
          },
          requireAttunement: false,
          requireIdentification: false,
          requireMagic: false,
          identifier: "",
        },
        roll: {
          prompt: false,
          visible: false,
          formula: "",
          name: "",
        },
        useConditionText: "",
        useConditionReason: "",
        effectConditionText: "",
        macroData: {
          name: "",
          command: "",
        },
        ignoreTraits: {
          idi: false,
          idr: false,
          idv: false,
          ida: false,
          idm: false,
        },
        midiProperties: {
          ignoreTraits: [],
          triggeredActivityId: "none",
          triggeredActivityConditionText: "",
          triggeredActivityTargets: "targets",
          triggeredActivityRollAs: "self",
          autoConsume: false,
          forceConsumeDialog: "default",
          forceRollDialog: "default",
          forceDamageDialog: "default",
          confirmTargets: "default",
          autoTargetType: "any",
          autoTargetAction: "default",
          automationOnly: false,
          otherActivityCompatible: true,
          otherActivityAsParentType: true,
          identifier: "",
          displayActivityName: false,
          rollMode: "default",
          chooseEffects: false,
          toggleEffect: false,
          ignoreFullCover: false,
          removeChatButtons: "default",
          magicEffect: false,
          magicDamage: false,
          noConcentrationCheck: false,
          skipConcentrationCheck: false,
          autoCEEffects: "default",
        },
        isOverTimeFlag: false,
        overTimeProperties: {
          saveRemoves: true,
          preRemoveConditionText: "",
          postRemoveConditionText: "",
        },
        otherActivityId: "none",
        otherActivityAsParentType: true,
        name: "",
      },
    };
  }

  function getAutomationClassification(feat, advancements, uses, activities) {
    const hasChoice = TRAIT_CHOICE_RULES.has(feat.id);
    const hasGrant = TRAIT_GRANT_RULES.has(feat.id);
    const hasUses = uses.max === "@prof";
    const hasActivity = Object.keys(activities).length > 0;

    if (hasChoice && hasGrant && hasUses && hasActivity) return "trait-choice+grant+uses+activity";
    if (hasChoice && hasGrant && hasUses) return "trait-choice+grant+uses";
    if (hasChoice && hasGrant) return "trait-choice+grant";
    if (hasChoice && hasUses && hasActivity) return "trait-choice+uses+activity";
    if (hasChoice && hasUses) return "trait-choice+uses";
    if (hasGrant && hasUses && hasActivity) return "trait-grant+uses+activity";
    if (hasGrant && hasUses) return "trait-grant+uses";
    if (hasChoice) return "trait-choice";
    if (hasGrant) return "trait-grant";
    if (hasUses && hasActivity) return "uses+activity";
    if (hasUses) return "uses";
    if (advancements.length) return "trait";
    return "text-only";
  }

  function buildItemData(feat) {
    const advancements = buildTraitAdvancement(feat);
    const uses = buildUses(feat);
    const chatFlavorData = buildActivityChatFlavor(feat);
    const activityHints = detectActivityHints(feat);
    const activities = buildConsumableUtilityActivity(feat, chatFlavorData);
    const hasConsumableActivity = Object.keys(activities).length > 0;
    const blockedAutomations = detectBlockedAutomations(feat, activityHints, hasConsumableActivity);
    const automationClassification = getAutomationClassification(feat, advancements, uses, activities);
    const requirements = asArray(feat.prerequisites).map(stringifyTextEntry).filter(Boolean).join(" | ");

    return {
      itemData: {
        name: feat.name,
        type: "feat",
        img: DEFAULT_IMG,
        system: {
          activities,
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
            ...(hasConsumableActivity
              ? {
                  activityConsumesItemUses: true,
                  activityTemplate: ACTIVITY_TEMPLATE,
                  activityActivationForcedToAction: true,
                  activityChatFlavorBuilt: Boolean(chatFlavorData.chatFlavor),
                  activityChatFlavorSource: chatFlavorData.source,
                }
              : {}),
            blockedAutomations,
            activityHints,
          },
        },
      },
      metrics: {
        hasTrait: advancements.length > 0,
        hasUses: uses.max === "@prof",
        hasConsumableActivity,
        hasChatFlavor: Boolean(chatFlavorData.chatFlavor),
        onlyText: advancements.length === 0 && uses.max !== "@prof" && !hasConsumableActivity,
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
      activityConsumivel: row.hasConsumableActivity ? "sim" : "nao",
      chatFlavor: row.hasChatFlavor ? "sim" : "nao",
      classificacao: row.automationClassification,
    };
  }

  function getIndexEntries(indexData) {
    if (Array.isArray(indexData)) return indexData;
    if (Array.isArray(indexData.items)) return indexData.items;
    if (Array.isArray(indexData.feats)) return indexData.feats;
    if (Array.isArray(indexData.originFeats)) return indexData.originFeats;
    throw new Error("Formato de _index.json não reconhecido.");
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
      const entries = getIndexEntries(index);
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
              existing,
              itemData,
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
          if (metrics.hasConsumableActivity) summary.comActivityConsumivel += 1;
          if (metrics.hasChatFlavor) summary.comChatFlavor += 1;
          if (existing && Object.keys(existing.toObject?.().system?.activities ?? {}).length > 0) {
            summary.activitiesLimpas += 1;
          }
          if (metrics.onlyText) summary.somenteTexto += 1;
        } catch (error) {
          summary.erros += 1;
          console.error(`[${IMPORTED_BY}] Falha ao preparar talento ${entry.name ?? entry.id ?? "desconhecido"}:`, error);
        }
      }

      if (createPayload.length) {
        await Item.createDocuments(createPayload, { pack: PACK_ID });
      }

      for (const updateEntry of updatePayload) {
        const { existing, itemData } = updateEntry;
        const deletionPayload = buildActivityDeletionPayload(existing);
        if (Object.keys(deletionPayload).length > 0) {
          await existing.update(deletionPayload);
        }
        await existing.update(itemData);
      }

      console.table(importRows.map(logImportRow));
      console.info(`[${IMPORTED_BY}] Resumo final:`, summary);
      ui.notifications?.info(
        `Talentos de Origem v2.4: criados ${summary.created}, atualizados ${summary.updated}, comTrait ${summary.comTrait}, comUses ${summary.comUses}, comActivityConsumivel ${summary.comActivityConsumivel}, comChatFlavor ${summary.comChatFlavor}, activitiesLimpas ${summary.activitiesLimpas}, somenteTexto ${summary.somenteTexto}, erros ${summary.erros}.`
      );
    } finally {
      if (pack.locked !== wasLocked) {
        await pack.configure({ locked: wasLocked });
      }
    }
  } catch (error) {
    console.error(`[${IMPORTED_BY}] Falha geral:`, error);
    ui.notifications?.error(`Falha no importador v2.4 de Talentos de Origem: ${error.message}`);
  }
})();
