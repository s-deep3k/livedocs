import { useOthers } from "@liveblocks/react/suspense"
import Image from "next/image"


const ActiveCollaborators = () => {
  const others = useOthers()

  const collaborators = others.map(other=> other.info)
  return (
    <ul className="collaborators-list">
        {collaborators.map(({id, avatar, color, name})=>
        <li key={name}>
            <Image 
            src={avatar} 
            alt="avatar" 
            width={100} 
            height={100}
            className="inline-block size-8 rounded-full ring-2" 
            style={{border: `solid ${color}`}}
            />
        </li>
        )}
    </ul>
  )
}

export default ActiveCollaborators