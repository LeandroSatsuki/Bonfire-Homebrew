// Importador de Features de Habilidades de Antecedente para Foundry VTT.
// Executar como Script Macro dentro do Foundry.
// Cria/atualiza 30 feats limpas, uma por habilidade de background.

(async () => {
  const MODULE_ID = "bonfire-homebrew";
  const IMPORTED_BY = "import-background-features-v1";
  const PACK_ID = `${MODULE_ID}.Features`;
  const INDEX_PATH = "content/backgrounds/_index.json";
  const DEFAULT_IMG = "systems/dnd5e/icons/svg/items/feature.svg";

  const summary = {
    criadas: 0,
    atualizadas: 0,
    erros: 0,
  };

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    return [value];
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

  function escapeRegExp(value) {
    return String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

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
    const withTerms = RULES_BOLD_TERMS.reduce((currentText, term) => applySafeRulesBolding(currentText, term), withMarkers);
    return withTerms;
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
      return [value.name, value.label, value.value, value.text, value.description].filter(Boolean).join(" - ").trim();
    }
    return String(value).trim();
  }

  function textToHtml(text) {
    return formatRulesTextHtml(text);
  }

  function buildFeatureDescriptionHtml(background) {
    const featureName = stringifyTextEntry(background.backgroundFeature?.name) || "Habilidade do Antecedente";
    const featureDescription = stringifyTextEntry(background.backgroundFeature?.description);
    const sections = [];

    sections.push(`<p><strong>${escapeHtml(featureName)}</strong></p>`);
    if (featureDescription) sections.push(textToHtml(featureDescription));

    return sections.filter(Boolean).join("");
  }

  async function fetchJson(modulePath) {
    const response = await fetch(`modules/${MODULE_ID}/${modulePath}`);
    if (!response.ok) {
      throw new Error(`Falha ao ler ${modulePath}: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  function getIndexEntries(indexData) {
    if (Array.isArray(indexData)) return indexData;
    if (Array.isArray(indexData.backgrounds)) return indexData.backgrounds;
    if (Array.isArray(indexData.items)) return indexData.items;
    throw new Error("Formato de _index.json não reconhecido.");
  }

  function buildItemData(background) {
    const featureName = `Habilidade do Antecedente: ${background.name}`;

    return {
      itemData: {
        name: featureName,
        type: "feat",
        img: DEFAULT_IMG,
        system: {
          activities: {},
          uses: {
            spent: 0,
            recovery: [],
            max: "",
          },
          advancement: [],
          description: {
            value: buildFeatureDescriptionHtml(background),
            chat: "",
          },
          identifier: slugify(featureName),
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
          requirements: "",
          type: {
            value: "",
            subtype: "",
          },
        },
        effects: [],
        flags: {
          [MODULE_ID]: {
            authorialId: background.id,
            sourceBackgroundId: background.id,
            sourceBackgroundName: background.name,
            importedBy: IMPORTED_BY,
            featureKind: "background-feature",
          },
        },
      },
    };
  }

  function buildLogRow(row) {
    return {
      nome: row.name,
      operacao: row.operation,
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
      const entries = getIndexEntries(index);
      if (entries.length !== 30) {
        throw new Error(`Quantidade inesperada de backgrounds no indice: ${entries.length}. Esperado: 30.`);
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
          const { itemData } = buildItemData(background);
          const existing = existingByName.get(itemData.name);

          if (existing) {
            updatePayload.push({
              _id: existing.id,
              ...itemData,
            });
            summary.atualizadas += 1;
            rows.push({
              name: itemData.name,
              operation: "updated",
            });
          } else {
            createPayload.push(itemData);
            summary.criadas += 1;
            rows.push({
              name: itemData.name,
              operation: "created",
            });
          }
        } catch (error) {
          summary.erros += 1;
          console.error(`[${IMPORTED_BY}] Falha ao preparar feature de background ${entry.name ?? entry.id ?? "desconhecido"}:`, error);
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
        `Background Features v1: criadas ${summary.criadas}, atualizadas ${summary.atualizadas}, erros ${summary.erros}.`
      );
    } finally {
      if (pack.locked !== wasLocked) {
        await pack.configure({ locked: wasLocked });
      }
    }
  } catch (error) {
    console.error(`[${IMPORTED_BY}] Falha geral:`, error);
    ui.notifications?.error(`Falha no importador v1 de Background Features: ${error.message}`);
  }
})();
