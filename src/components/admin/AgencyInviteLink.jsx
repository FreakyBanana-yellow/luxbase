import React from 'react'
<<<<<<< HEAD
import { inviteLink } from '../../lib/agency'
=======
import { inviteLink } from '@/lib/$2'

>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72


export default function AgencyInviteLink({ agencyId }){
const [url, setUrl] = React.useState('')
React.useEffect(()=>{ (async()=> setUrl(await inviteLink(agencyId)))() }, [agencyId])
if(!agencyId) return null
return (
<div className="flex items-center gap-3">
<input readOnly value={url} className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-yellow-600/30" />
<button onClick={()=>{navigator.clipboard?.writeText(url)}} className="px-3 py-2 rounded bg-zinc-800 border border-yellow-600/30">Kopieren</button>
</div>
)
}