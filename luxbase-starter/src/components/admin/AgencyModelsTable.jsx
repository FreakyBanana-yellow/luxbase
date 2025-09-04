import React from 'react'
import { listAgencyModels } from '../../lib/agency'

import { listAgencyModels } from '@/lib/routerAfterLogin'




export default function AgencyModelsTable({ agencyId }){
const [rows, setRows] = React.useState([])
const [q, setQ] = React.useState('')


React.useEffect(()=>{ (async()=>{
const data = await listAgencyModels(agencyId)
setRows(data)
})() }, [agencyId])


const filtered = rows.filter(r => (r.creator_name||'').toLowerCase().includes(q.toLowerCase()) || (r.email||'').toLowerCase().includes(q.toLowerCase()))


return (
<div className="space-y-3">
<input placeholder="Suche Name/Email" value={q} onChange={e=>setQ(e.target.value)} className="w-full px-3 py-2 rounded bg-zinc-900 border border-yellow-600/30" />
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="text-yellow-300/80">
<tr>
<th className="py-2">Name</th>
<th className="py-2">Email</th>
<th className="py-2">Aktion</th>
</tr>
</thead>
<tbody>
{filtered.map(r => (
<tr key={r.creator_id} className="border-t border-yellow-600/10">
<td className="py-2">{r.creator_name || '—'}</td>
<td className="py-2">{r.email || '—'}</td>
<td className="py-2">
<a href={`/agency/${agencyId}/models/${r.creator_id}`} className="px-3 py-1 rounded bg-yellow-500 text-black">Öffnen</a>
</td>
</tr>
))}
{filtered.length===0 && (
<tr><td className="py-6 text-zinc-400" colSpan={3}>Keine Einträge</td></tr>
)}
</tbody>
</table>
</div>
</div>
)
}