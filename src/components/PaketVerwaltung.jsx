// src/components/PaketVerwaltung.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY);

function PaketVerwaltung({ adminName = "admin" }) {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [logMessage, setLogMessage] = useState("");

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    const { data } = await supabase.from("creator_config").select("*");
    setCreators(data);
  };

  const logChange = async (id, field, value) => {
    const message = `Änderung bei ${field}: ${value}`;
    await supabase.from("change_log").insert([{ 
      creator_id: id,
      feld: field,
      neuer_wert: value,
      erstellt_am: new Date(),
      bearbeitet_von: adminName
    }]);
    setLogMessage(message);
    setTimeout(() => setLogMessage(""), 3000);
  };

  const updateField = async (id, field, value) => {
    await supabase.from("creator_config").update({
      [field]: value,
      last_updated_by: adminName,
      last_updated_at: new Date()
    }).eq("creator_id", id);
    await logChange(id, field, value);
    fetchCreators();
  };

  const filtered = creators.filter(c =>
    c.creator_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    vip: creators.filter(c => c.has_vipbot).length,
    vault: creators.filter(c => c.has_vault).length,
    stage10: creators.filter(c => c.stageone_plan === "10").length,
    stage27: creators.filter(c => c.stageone_plan === "27").length,
    stage40: creators.filter(c => c.stageone_plan === "40").length
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-yellow-400 font-bold mb-4">Paketverwaltung</h1>
      {logMessage && <div className="mb-4 text-green-400">{logMessage}</div>}
      <div className="mb-4 p-3 border border-gray-700 rounded bg-gray-900 text-white">
        <p><strong>Aktive Pakete:</strong></p>
        <ul className="list-disc pl-5">
          <li>VIP-Bot: {stats.vip}</li>
          <li>Vault: {stats.vault}</li>
          <li>StageOne 10 Postings: {stats.stage10}</li>
          <li>StageOne 27 Postings: {stats.stage27}</li>
          <li>StageOne 40 Postings: {stats.stage40}</li>
        </ul>
      </div>
      <input
        className="w-full p-2 mb-4 border border-yellow-500 rounded bg-black text-white"
        type="text"
        placeholder="Suche nach Name oder E-Mail"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full text-sm text-left bg-black border border-gray-700">
        <thead className="bg-gray-800 text-yellow-400">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">E-Mail</th>
            <th className="p-2">VIP-Bot</th>
            <th className="p-2">Vault</th>
            <th className="p-2">StageOne</th>
            <th className="p-2">Bearbeitet von</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.creator_id} className="border-t border-gray-700">
              <td className="p-2 text-white">{c.creator_name}</td>
              <td className="p-2 text-white">{c.email}</td>
              <td className="p-2">
                <button
                  className={`px-2 py-1 rounded ${c.has_vipbot ? 'bg-green-600' : 'bg-red-600'}`}
                  onClick={() => updateField(c.creator_id, "has_vipbot", !c.has_vipbot)}
                >
                  {c.has_vipbot ? "Aktiv" : "Inaktiv"}
                </button>
              </td>
              <td className="p-2">
                <button
                  className={`px-2 py-1 rounded ${c.has_vault ? 'bg-green-600' : 'bg-red-600'}`}
                  onClick={() => updateField(c.creator_id, "has_vault", !c.has_vault)}
                >
                  {c.has_vault ? "Aktiv" : "Inaktiv"}
                </button>
              </td>
              <td className="p-2">
                <select
                  value={c.stageone_plan || ""}
                  onChange={(e) => updateField(c.creator_id, "stageone_plan", e.target.value)}
                  className="bg-gray-900 text-white border border-gray-600 rounded p-1"
                >
                  <option value="">–</option>
                  <option value="10">10 Postings</option>
                  <option value="27">27 Postings</option>
                  <option value="40">40 Postings</option>
                </select>
              </td>
              <td className="p-2 text-gray-400 text-xs">{c.last_updated_by || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaketVerwaltung;
