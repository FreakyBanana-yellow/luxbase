// netlify/functions/insight-tip.js
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// sehr einfacher Fallback-Übersetzer für Fachjargon → Alltagssprache
function cleanJargon(s = "") {
  return s
    .replace(/\bCTA\b/gi, "Aufforderung")
    .replace(/\bCall[- ]?to[- ]?Action\b/gi, "Aufforderung")
    .replace(/\bConversion(s)?\b/gi, "Abschluss")
    .replace(/\bFunnel\b/gi, "Ablauf")
    .replace(/\bHook\b/gi, "Einstieg")
    .replace(/\bKPI\b/gi, "Kennzahl")
    .replace(/\bROI\b/gi, "Erfolg")
    .replace(/\bRetention\b/gi, "Bindung")
    .replace(/\bLTV\b/gi, "Wert je Kunde")
    .replace(/\bUpsell\b/gi, "Zusatzverkauf")
    .replace(/\bTraffic\b/gi, "Besucher")
    .replace(/\bOnboarding\b/gi, "Start")
    .replace(/\bChurn\b/gi, "Abgänge")
    .replace(/\bCohort(s)?\b/gi, "Gruppe")
    .replace(/\bBenchmark\b/gi, "Vergleichswert")
    .replace(/\bEngagement\b/gi, "Beteiligung")
    .replace(/\s{2,}/g, " ")
    .trim();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    if (!OPENAI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "OPENAI_API_KEY missing" }) };
    }
    const payload = JSON.parse(event.body || "{}");
    if (!payload?.start || !payload?.end || !Array.isArray(payload?.revenueByDay)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad payload" }) };
    }

    // Stilvorgaben: kurze, normale Sprache – keine Fachbegriffe
    const system = [
      "Du bist Berater*in für Creator-Angebote.",
      "Schreibe auf Deutsch, direkt per Du, in einfacher Alltagssprache.",
      "Keine Fachwörter/Abkürzungen. Vermeide: CTA, Funnel, Conversion, Hook, KPI, ROI, Retention, LTV, Upsell, Traffic, Onboarding, Churn, Benchmark, Engagement.",
      "Gib 2–3 kurze Sätze. Keine Emojis, keine Aufzählungen.",
      "Nenne konkrete Schritte (z. B. Uhrzeit und Kanal: Story, Beitrag, DM).",
      "Nur wenige Zahlen: Uhrzeiten sind ok; sonst lieber Formulierungen wie „deutlich mehr“ statt Prozente.",
    ].join(" ");

    const user = `
Daten (JSON):
${JSON.stringify(payload)}

Aufgabe:
Gib einen praktischen Tipp, wie man den schwächeren Tag verbessert
oder den starken Tag wiederholt. Schreibe ohne Fachsprache. 2–3 Sätze, klar und direkt.
`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.5,
        max_tokens: 220,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      return { statusCode: 502, body: JSON.stringify({ error: "openai_failed", details: t }) };
    }

    const data = await resp.json();
    const raw = (data?.choices?.[0]?.message?.content || "").trim();
    const tip = cleanJargon(raw);

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tip }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "server_error" }) };
  }
};
