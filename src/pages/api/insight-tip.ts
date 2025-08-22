// /src/pages/api/insight-tip.ts
import type { APIRoute } from "astro";
import OpenAI from "openai";

export const prerender = false; // server only

// Sicherheit: Key NUR serverseitig
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();

    // Minimal-Validierung
    if (!payload?.start || !payload?.end || !Array.isArray(payload?.revenueByDay)) {
      return new Response(JSON.stringify({ error: "Bad payload" }), { status: 400 });
    }

    const system = [
      "Du bist Growth-Analyst*in für Creator-Mitgliedschaften.",
      "Schreibe auf Deutsch, locker und praxisnah.",
      "Gib 2–4 kurze Sätze. Keine Emojis. Kein Marketing-Sprech.",
      "Nutze nur Zahlen/Zeiträume aus dem Payload. Keine Fantasiewerte.",
      "Wenn sinnvoll, erwähne Tage/Uhrzeiten konkret (z. B. Freitag 19–21 Uhr).",
    ].join(" ");

    const user = `
Daten (JSON):
${JSON.stringify(payload)}

Aufgabe:
Gib einen konkreten, umsetzbaren Tipp, wie der/die Creator*in den Flop-Tag verbessern
oder den Top-Tag replizieren kann. Beziehe dich auf Wochentage/Zeiträume, Preis, Durchschnitt,
Volatilität und Neuabschlüsse. Kurz, präzise, 2–4 Sätze.
`;

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 220,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const tip = resp.choices?.[0]?.message?.content?.trim() || "";
    return new Response(JSON.stringify({ tip }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err: any) {
    console.error("insight-tip error:", err?.message || err);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500 });
  }
};
