import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase___ToHWM0.mjs';
import { w as writeAudit } from './agency_DVG68g-R.mjs';

function ProfileForm({ overrideCreatorId = null, agencyId = null }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isSelf, setIsSelf] = useState(false);
  const [form, setForm] = useState({
    creator_name: "",
    email: "",
    password: ""
  });
  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setSaved(false);
      try {
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (userErr || !user) {
          setError("Bitte einloggen, um dein Profil zu bearbeiten.");
          setLoading(false);
          return;
        }
        const cid = overrideCreatorId || user.id;
        setTargetId(cid);
        setIsSelf(!overrideCreatorId || overrideCreatorId === user.id);
        const { data: profile } = await supabase.from("creator_config").select("creator_name, email").eq("creator_id", cid).maybeSingle();
        const fallbackEmail = !overrideCreatorId ? user.email ?? "" : "";
        setForm((f) => ({
          ...f,
          creator_name: profile?.creator_name ?? "",
          email: profile?.email ?? fallbackEmail,
          password: ""
        }));
      } catch (e) {
        setError(e?.message || "Unbekannter Fehler beim Laden");
      } finally {
        setLoading(false);
      }
    })();
  }, [overrideCreatorId]);
  async function save(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    try {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !user) {
        setError("Nicht eingeloggt.");
        return;
      }
      const cid = targetId;
      if (!cid) throw new Error("Kein Zielkonto gefunden");
      const payload = {
        creator_id: cid,
        creator_name: form.creator_name?.trim() || null,
        email: form.email?.trim() || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { error: upsertErr } = await supabase.from("creator_config").upsert(payload, { onConflict: "creator_id" });
      if (upsertErr) throw upsertErr;
      if (isSelf) {
        if (form.email && form.email !== (user.email ?? "")) {
          const { error: emailErr } = await supabase.auth.updateUser({ email: form.email });
          if (emailErr) throw new Error(`E-Mail-Update: ${emailErr.message}`);
        }
        if (form.password && form.password.length >= 6) {
          const { error: pwErr } = await supabase.auth.updateUser({ password: form.password });
          if (pwErr) throw new Error(`Passwort-Update: ${pwErr.message}`);
        }
      }
      setForm((f) => ({ ...f, password: "" }));
      setSaved(true);
      if (agencyId && overrideCreatorId) {
        try {
          await writeAudit({
            agency_id: agencyId,
            action: "update_profile",
            target_creator_id: cid
          });
        } catch {
        }
      }
    } catch (e2) {
      setError(e2?.message || "Speichern fehlgeschlagen");
    }
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "space-y-6", children: [
    loading && /* @__PURE__ */ jsx("div", { className: "animate-pulse text-zinc-300", children: "Lade Profil…" }),
    error && /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-100", children: error }),
    saved && /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-emerald-900/40 border border-emerald-700 text-emerald-100", children: "Gespeichert ✅" }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        LabeledInput,
        {
          name: "creator_name",
          label: "Anzeigename",
          value: form.creator_name,
          onChange: handle
        }
      ),
      /* @__PURE__ */ jsx(
        LabeledInput,
        {
          name: "email",
          label: "E-Mail",
          type: "email",
          value: form.email,
          onChange: handle
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        LabeledInput,
        {
          name: "password",
          label: isSelf ? "Neues Passwort (min. 6 Zeichen)" : "Neues Passwort (nur Eigenprofil)",
          type: "password",
          value: form.password,
          onChange: handle
        }
      ),
      /* @__PURE__ */ jsx("div", {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "px-5 py-3 rounded-2xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow",
          disabled: loading || !!form.password && form.password.length > 0 && form.password.length < 6,
          title: !!form.password && form.password.length < 6 ? "Passwort zu kurz" : void 0,
          children: "Speichern"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => location.reload(),
          className: "px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100",
          disabled: loading,
          children: "Verwerfen"
        }
      )
    ] })
  ] });
}
function LabeledInput({ label, name, value, onChange, type = "text" }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-yellow-200/90", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "mt-1 w-full rounded-xl bg-zinc-900 border border-yellow-600/30 px-4 py-2 text-yellow-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60",
        name,
        value: value ?? "",
        type,
        onChange
      }
    )
  ] });
}

export { ProfileForm as P };
