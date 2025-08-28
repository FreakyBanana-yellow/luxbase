import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://zpzigwfjfhogkzuvijzm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwemlnd2ZqZmhvZ2t6dXZpanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjcwNDcsImV4cCI6MjA2NjUwMzA0N30.jMDAFkPhKmLXtLYerLd9z93tugNvw14L4oZvSNkSD2o");
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
      erstellt_am: /* @__PURE__ */ new Date(),
      bearbeitet_von: adminName
    }]);
    setLogMessage(message);
    setTimeout(() => setLogMessage(""), 3e3);
  };
  const updateField = async (id, field, value) => {
    await supabase.from("creator_config").update({
      [field]: value,
      last_updated_by: adminName,
      last_updated_at: /* @__PURE__ */ new Date()
    }).eq("creator_id", id);
    await logChange(id, field, value);
    fetchCreators();
  };
  const filtered = creators.filter(
    (c) => c.creator_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );
  const stats = {
    vip: creators.filter((c) => c.has_vipbot).length,
    vault: creators.filter((c) => c.has_vault).length,
    stage10: creators.filter((c) => c.stageone_plan === "10").length,
    stage27: creators.filter((c) => c.stageone_plan === "27").length,
    stage40: creators.filter((c) => c.stageone_plan === "40").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl text-yellow-400 font-bold mb-4", children: "Paketverwaltung" }),
    logMessage && /* @__PURE__ */ jsx("div", { className: "mb-4 text-green-400", children: logMessage }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 border border-gray-700 rounded bg-gray-900 text-white", children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Aktive Pakete:" }) }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "VIP-Bot: ",
          stats.vip
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Vault: ",
          stats.vault
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "StageOne 10 Postings: ",
          stats.stage10
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "StageOne 27 Postings: ",
          stats.stage27
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "StageOne 40 Postings: ",
          stats.stage40
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full p-2 mb-4 border border-yellow-500 rounded bg-black text-white",
        type: "text",
        placeholder: "Suche nach Name oder E-Mail",
        value: search,
        onChange: (e) => setSearch(e.target.value)
      }
    ),
    /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left bg-black border border-gray-700", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-800 text-yellow-400", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "E-Mail" }),
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "VIP-Bot" }),
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "Vault" }),
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "StageOne" }),
        /* @__PURE__ */ jsx("th", { className: "p-2", children: "Bearbeitet von" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: filtered.map((c) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-700", children: [
        /* @__PURE__ */ jsx("td", { className: "p-2 text-white", children: c.creator_name }),
        /* @__PURE__ */ jsx("td", { className: "p-2 text-white", children: c.email }),
        /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-2 py-1 rounded ${c.has_vipbot ? "bg-green-600" : "bg-red-600"}`,
            onClick: () => updateField(c.creator_id, "has_vipbot", !c.has_vipbot),
            children: c.has_vipbot ? "Aktiv" : "Inaktiv"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-2 py-1 rounded ${c.has_vault ? "bg-green-600" : "bg-red-600"}`,
            onClick: () => updateField(c.creator_id, "has_vault", !c.has_vault),
            children: c.has_vault ? "Aktiv" : "Inaktiv"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs(
          "select",
          {
            value: c.stageone_plan || "",
            onChange: (e) => updateField(c.creator_id, "stageone_plan", e.target.value),
            className: "bg-gray-900 text-white border border-gray-600 rounded p-1",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "–" }),
              /* @__PURE__ */ jsx("option", { value: "10", children: "10 Postings" }),
              /* @__PURE__ */ jsx("option", { value: "27", children: "27 Postings" }),
              /* @__PURE__ */ jsx("option", { value: "40", children: "40 Postings" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "p-2 text-gray-400 text-xs", children: c.last_updated_by || "–" })
      ] }, c.creator_id)) })
    ] })
  ] });
}

export { PaketVerwaltung as default };
