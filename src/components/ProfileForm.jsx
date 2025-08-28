// src/components/ProfileForm.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // relativer Pfad von components -> lib

export default function ProfileForm({ overrideCreatorId = null, onAfterSave }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const [targetId, setTargetId] = useState(null); // die creator_id, gegen die geladen/gespeichert wird
  const [isSelf, setIsSelf] = useState(false);    // ob Nutzer sein eigenes Profil editiert

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
        const {
          data: { user },
          error: userErr,
        } = await supabase.auth.getUser();
        if (userErr || !user) {
          setError('Bitte einloggen, um dein Profil zu bearbeiten.');
          setLoading(false);
          return;
        }

        const cid = overrideCreatorId || user.id;
        setTargetId(cid);
        setIsSelf(!overrideCreatorId || overrideCreatorId === user.id);

        // Anzeigename & E-Mail aus creator_config
        const { data: profile, error: pErr } = await supabase
          .from('creator_config')
          .select('creator_name, email')
          .eq('creator_id', cid)
          .maybeSingle();

        // E-Mail-Vorbelegung:
        // - acting-as: nur DB-Wert
        // - self: DB-Wert oder Fallback auf auth.user.email
        const fallbackEmail = isSelf ? (user.email ?? '') : '';
        const prefillEmail = (profile?.email ?? fallbackEmail);

        setForm((f) => ({
          ...f,
          creator_name: profile?.creator_name ?? '',
          email: prefillEmail,
          password: '',
        }));
      } catch (e) {
        setError(e?.message || 'Unbekannter Fehler beim Laden');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideCreatorId]);

  // Speichern
  async function save(e) {
    e.preventDefault();
    setError('');
    setSaved(false);

    try {
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();
      if (userErr || !user) {
        setError('Nicht eingeloggt.');
        return;
      }

      const cid = targetId;
      if (!cid) throw new Error('Kein Zielkonto gefunden');

      // 1) creator_config upsert (nur benötigte Felder)
      const payload = {
        creator_id: cid,
        creator_name: form.creator_name?.trim() || null,
        email: form.email?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertErr } = await supabase
        .from('creator_config')
        .upsert(payload, { onConflict: 'creator_id' });
      if (upsertErr) throw upsertErr;

      // 2) Nur beim eigenen Profil: E-Mail / Passwort in Auth aktualisieren
      if (isSelf) {
        // E-Mail-Update (falls geändert)
        if (form.email && form.email !== (user.email ?? '')) {
          const { error: emailErr } = await supabase.auth.updateUser({ email: form.email });
          if (emailErr) throw new Error(`E-Mail-Update: ${emailErr.message}`);
          // Hinweis: Supabase kann eine Bestätigungs-Mail senden.
        }
        // Passwort-Update (optional, min. 6 Zeichen)
        if (form.password && form.password.length >= 6) {
          const { error: pwErr } = await supabase.auth.updateUser({ password: form.password });
          if (pwErr) throw new Error(`Passwort-Update: ${pwErr.message}`);
        }
      }

      setForm((f) => ({ ...f, password: '' }));
      setSaved(true);
      onAfterSave?.();
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
          label={isSelf ? 'Neues Passwort (min. 6 Zeichen)' : 'Neues Passwort (nur Eigenprofil)'}
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
          disabled={loading || (!!form.password && form.password.length > 0 && form.password.length < 6)}
          title={!!form.password && form.password.length < 6 ? 'Passwort zu kurz' : undefined}
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
