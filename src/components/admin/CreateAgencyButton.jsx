// src/components/CreateAgencyButton.jsx
import React, { useState } from 'react';
import { createAgency } from '@/lib/$2';

export default function CreateAgencyButton() {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const name = window.prompt('Name der Agentur:');
    if (!name) return;
    setBusy(true);
    try {
      const created = await createAgency(name);
      window.location.href = `/agency/${encodeURIComponent(created.id)}/models`;
    } catch (e) {
      alert(e?.message || 'Fehler beim Anlegen');
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="px-4 py-2 rounded-xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow disabled:opacity-60"
      aria-busy={busy}
    >
      {busy ? 'Erzeuge…' : 'Agentur anlegen'}
    </button>
  );
}
