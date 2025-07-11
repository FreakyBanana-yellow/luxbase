import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [lux, setLux] = useState(null);

  useEffect(() => {
    const config = sessionStorage.getItem("luxbase_config");
    if (config) {
      setLux(JSON.parse(config));
    }
  }, []);

  if (!lux) {
    return (
      <div className="text-center mt-24 text-white">
        <h2 className="text-2xl font-bold mb-2">Bitte einloggen…</h2>
        <p className="text-zinc-400">Du musst eingeloggt sein, um dein Dashboard zu sehen.</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 w-full max-w-5xl mx-auto px-4 text-white">
      <div>
        <h1 className="text-3xl font-bold text-luxgold mb-2">
          Willkommen zurück, {lux.creator_name || "Creator"}!
        </h1>
        <p className="text-zinc-300">
          Dein Paket: <span className="font-semibold text-white">{lux.bot_paket}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <a href="/vault" className="bg-zinc-900 p-6 rounded-xl border border-luxgold shadow hover:bg-zinc-800 transition">
          <h2 className="text-xl font-bold mb-2">📁 VaultRoom</h2>
          <p>Upload, Versionierung & Planung in deinem Content-Safe.</p>
        </a>
        <a href="/cpplattform" className="bg-zinc-900 p-6 rounded-xl border border-luxgold shadow hover:bg-zinc-800 transition">
          <h2 className="text-xl font-bold mb-2">📤 StageOne</h2>
          <p>Multiplattform-Posting mit Kampagnen, Hashtags & Reuse.</p>
        </a>
        <a href="/vipbot" className="bg-zinc-900 p-6 rounded-xl border border-luxgold shadow hover:bg-zinc-800 transition">
          <h2 className="text-xl font-bold mb-2">🤖 VIP‑Bot</h2>
          <p>Altersprüfung, Sheet‑Sync & automatisierte Gruppenzugänge.</p>
        </a>
      </div>

      {lux.bot_paket === "premium" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-luxgold mb-2">Premium-Extras</h3>
          <ul className="list-disc list-inside text-zinc-300">
            <li>SelfieCheck aktiv</li>
            <li>Eigene Begrüßungstexte verfügbar</li>
          </ul>
        </div>
      )}
    </section>
  );
}
