// src/components/ProfileForm.jsx
import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../lib/supabase'; // <— relativer Pfad von components → lib

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [token, setToken] = useState('');

  const [form, setForm] = useState({
    bot_name: '',
    paypal: '',
    preis: '',
    vip_dauer: '',
    gruppe_link: '',
    regeln_text: '',
    welcome_text: '',
    reminder_days: 7,
    selfie_check: false,
    bot_paket: 'basic',
    show_selfie_gate: false,
    telegram_id: '',
    creator_name: '',
    email: '',
  });

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  async function load() {
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/profile/get', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Fehler beim Laden');
      const data = await res.json();
      if (data && data.profile) setForm((f) => ({ ...f, ...data.profile }));
    } catch (err) {
      setError(err.message || 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.text()) || 'Speichern fehlgeschlagen');
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Unbekannter Fehler');
    }
  }

  useEffect(() => {
    (async () => {
      const t = (await getAccessToken()) || '';
      setToken(t);
    })();
  }, []);

  useEffect(() => {
    if (token) load();
  }, [token]);

  if (!token) {
    return (
      <div className="p-6 rounded-2xl bg-zinc-900 border border-yellow-600/30 text-yellow-50">
        <p>Bitte einloggen, um das Profil zu bearbeiten.</p>
      </div>
    );
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {loading && <div className="animate-pulse text-zinc-300">Lade Profil…</div>}
      {error && (
        <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-100">{error}</div>
      )}
      {saved && (
        <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-700 text-emerald-100">Gespeichert ✅</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <LabeledInput name="creator_name" label="Anzeigename" value={form.creator_name} onChange={handle} />
        <LabeledInput name="email" label="E-Mail" value={form.email} onChange={handle} type="email" />
        <LabeledInput name="telegram_id" label="Telegram ID" value={form.telegram_id} onChange={handle} />
        <LabeledInput name="bot_name" label="Bot-Name" value={form.bot_name} onChange={handle} />
        <LabeledInput name="paypal" label="PayPal" value={form.paypal} onChange={handle} />
        <LabeledInput name="preis" label="Preis (€)" value={form.preis} onChange={handle} />
        <LabeledInput name="vip_dauer" label="VIP-Dauer (Tage)" value={form.vip_dauer} onChange={handle} />
        <LabeledInput name="gruppe_link" label="Gruppenlink" value={form.gruppe_link} onChange={handle} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <LabeledTextarea name="welcome_text" label="Willkommens-Text" value={form.welcome_text} onChange={handle} />
        <LabeledTextarea name="regeln_text" label="Regeln" value={form.regeln_text} onChange={handle} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <LabeledInput name="reminder_days" label="Reminder (Tage)" value={form.reminder_days} onChange={handle} type="number" />
        <LabeledSelect
          name="bot_paket"
          label="Bot-Paket"
          value={form.bot_paket}
          onChange={handle}
          options={[
            { value: 'basic', label: 'Basic' },
            { value: 'premium', label: 'Premium' },
          ]}
        />
        <LabeledCheckbox name="selfie_check" label="Selfie-Check aktiv" checked={form.selfie_check} onChange={handle} />
        <LabeledCheckbox name="show_selfie_gate" label="Selfie-Gate anzeigen" checked={form.show_selfie_gate} onChange={handle} />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="px-5 py-3 rounded-2xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow">
          Speichern
        </button>
        <button type="button" onClick={load} className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100">
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

function LabeledTextarea({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-yellow-200/90">{label}</span>
      <textarea
        className="mt-1 w-full min-h-[120px] rounded-xl bg-zinc-900 border border-yellow-600/30 px-4 py-2 text-yellow-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
        name={name}
        value={value ?? ''}
        onChange={onChange}
      />
    </label>
  );
}

function LabeledSelect({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm text-yellow-200/90">{label}</span>
      <select
        className="mt-1 w-full rounded-xl bg-zinc-900 border border-yellow-600/30 px-4 py-2 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
        name={name}
        value={value ?? ''}
        onChange={onChange}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function LabeledCheckbox({ label, name, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 mt-6">
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={onChange}
        className="h-5 w-5 rounded bg-zinc-900 border border-yellow-600/40"
      />
      <span className="text-yellow-100/90">{label}</span>
    </label>
  );
}
