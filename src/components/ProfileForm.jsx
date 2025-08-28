// src/components/ProfileForm.jsx
<LabeledInput name="reminder_days" label="Reminder (Tage)" value={form.reminder_days} onChange={handle} type="number" />
<LabeledSelect name="bot_paket" label="Bot-Paket" value={form.bot_paket} onChange={handle} options={[
{ value: 'basic', label: 'Basic' },
{ value: 'premium', label: 'Premium' },
]} />
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
<option key={o.value} value={o.value}>{o.label}</option>
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