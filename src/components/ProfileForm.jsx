// src/components/ProfileForm.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // relativer Pfad von components -> lib

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    creator_name: '', // Anzeigename
    email: '',
    password: '',     // Neues Passwort (optional)
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Prefill: User + creator_config holen
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      setSaved(false);
      try {
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (userErr || !user) {
          setError('Bitte einloggen, um dein Profil zu bearbeiten.');
          setLoading(false);
          return;
        }

        // E-Mail aus Auth vorfüllen
        let email = user.email ?? '';

        // Anzeigename aus creator_config
        const { data: profile, error: pErr } = await supabase
          .from('creator_config')
          .select('creator_name, email')
          .eq('creator_id', user.id)
          .maybeSingle();

        if (!pErr && profile) {
          setForm((f) => ({
            ...f,
            creator_name: profile.creator_name ?? '',
            email: profile.email ?? email,
          }));
        } else {
          setForm((f) => ({ ...f, email }));
        }
      } catch (e) {
        setError(e?.message || 'Unbekannter Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Speichern: creator_config upsert + (optional) auth-email/passwort aktualisieren
  async function save(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    try {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !user) {
        setError('Nicht eingeloggt.');
        return;
      }

      // 1) creator_config upsert (nur die benötigten Felder)
      const payload = {
        creator_id: user.id,
        creator_name: form.creator_name?.trim() || null,
        email: form.email?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertErr } = await supabase
        .from('creator_config')
        .upsert(payload, { onConflict: 'creator_id' });
      if (upsertErr) throw upsertErr;

      // 2) Auth-Email aktualisieren (falls geändert)
      if (form.email && form.email !== (user.email ?? '')) {
        const { error: emailErr } = await supabase.auth.updateUser({ email: form.email });
        if (emailErr) throw new Error(`E-Mail-Update: ${emailErr.message}`);
        // Hinweis: Supabase kann eine Bestätigungs-Mail senden, bis dahin bleibt die alte Email ggf. aktiv.
      }

      // 3) Passwort aktualisieren (falls gesetzt)
      if (form.password && form.password.length >= 6) {
        const { error: pwErr } = await supabase.auth.updateUser({ password: form.password });
        if (pwErr) throw new Error(`Passwort-Update: ${pwErr.message}`);
      }

      // Passwortfeld leeren
      setForm((f) => ({ ...f, password: '' }));
      setSaved(true);
    } catch (e) {
      setError(e?.message || 'Speichern fehlgeschlagen');
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {loading && <div className="animate-pulse text-zinc-300">Lade Profil…</div>}
      {error && (
        <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-100">{error}</div>
      )}
      {saved && (
        <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-700 text-emerald-100">
          Gespeichert ✅
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <LabeledInput
          name="creator_name"
          label="Anzeigename"
          value={form.creator_name}
          onChange={handle}
        />
        <LabeledInput
          name="email"
          label="E-Mail"
          type="email"
          value={form.email}
          onChange={handle}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <LabeledInput
          name="password"
          label="Neues Passwort (min. 6 Zeichen)"
          type="password"
          value={form.password}
          onChange={handle}
        />
        <div />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-5 py-3 rounded-2xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow"
          disabled={loading}
        >
          Speichern
        </button>
        <button
          type="button"
          onClick={() => location.reload()}
          className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100"
          disabled={loading}
        >
          Verwerfen
        </button>
      </div>
    </form>
  );
}

function LabeledInput({ label, name, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-sm text-yellow-200/90">{label}</span>
      <input
        className="mt-1 w-full rounded-xl bg-zinc-900 border border-yellow-600/30 px-4 py-2 text-yellow-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
        name={name}
        value={value ?? ''}
        type={type}
        onChange={onChange}
      />
    </label>
  );
}
