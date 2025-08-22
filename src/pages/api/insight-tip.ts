// netlify/functions/insight-tip.js
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

    const system = [
      "Du bist Growth-Analyst*in für Creator-Mitgliedschaften.",
      "Schreibe auf Deutsch, locker und praxisnah.",
      "Gib 2–4 kurze Sätze. Keine Emojis.",
      "Nutze nur Zahlen/Zeiträume aus dem Payload.",
    ].join(" ");

    const user = `Daten:\n${JSON.stringify(payload)}\n\nAufgabe: Konkreter Tipp (2–4 Sätze).`;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "authorization": `Bearer ${OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
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
    const tip = data?.choices?.[0]?.message?.content?.trim() || "";
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tip }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "server_error" }) };
  }
};
