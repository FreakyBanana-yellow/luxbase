import React from 'react'


export default function ActingAsBanner({ agencyName, creatorName, creatorEmail }){
return (
<div className="mb-6 p-3 rounded-xl border border-yellow-600/30 bg-zinc-900/70 text-yellow-100">
<strong>Handeln als:</strong> {creatorName || 'Unbekannt'} <span className="text-zinc-400">({creatorEmail||'—'})</span>
<span className="ml-2 text-zinc-400">• Agentur: {agencyName}</span>
</div>
)
}