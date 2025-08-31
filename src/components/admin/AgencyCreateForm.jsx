import React, { useState } from 'react'
import { createAgency } from '../../lib/agency'
import { createAgency } from '@/lib/$2'




export default function AgencyCreateForm({ onCreated }) {
const [name, setName] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')


async function submit(e){
e.preventDefault()
setError('')
setLoading(true)
try {
const ag = await createAgency(name.trim())
setName('')
onCreated?.(ag)
} catch (e) {
setError(e?.message || 'Fehler beim Anlegen')
} finally { setLoading(false) }
}


return (
<form onSubmit={submit} className="flex gap-3">
<input className="px-4 py-2 rounded-xl bg-zinc-900 border border-yellow-600/30 text-yellow-50"
placeholder="Agenturname"
value={name} onChange={e=>setName(e.target.value)} />
<button className="px-4 py-2 rounded-xl bg-yellow-500 text-black" disabled={loading || !name.trim()}>Anlegen</button>
{error && <span className="text-red-400">{error}</span>}
</form>
)
}