import Image from "next/image"
import { useState } from "react"
import UserTypeSelector from "./UserTypeSelector"
import { Button } from "./ui/button"
import { removeCollaborator, updateDocumentAccess } from "@/lib/actions/room.actions"


const Collaborator = ({roomId, creatorId, collaborator, email, user}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer')
  const [loading,setLoading] = useState(false)

  const shareDocumentHandler = async(type:string)=>{
    setLoading(true)
    await updateDocumentAccess({
        roomId,
        email,
        userType,
        updatedBy : user
    })
    setLoading(false)
  }
  const removeCollaboratorHandler = async(email:string)=>{
    setLoading(true)
    await removeCollaborator({
        roomId,
        email
    })
  }

    return (
    <li className="flex items-center justify-between gap-2 py-3">
        <div className="flex gap-2">
            <Image className="rounded size-9"
            src={collaborator.avatar}
            alt={collaborator.name}
            width={36}
            height={36}
            />
            <div>
                <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
                    {collaborator.name}
                    <span className="text-10-regular pl-2 text-blue-100">
                        {loading && 'Loading...'}
                    </span>
                </p>
                <p className="text-sm font-light text-blue-100">
                    {collaborator.email}
                </p>
            </div>
        </div>
        {creatorId === collaborator.id ?(
            <p className="text-blue-100 font-sm">Owner</p>
        ):(
            <div>
                <UserTypeSelector
                userType={userType as UserType}
                setUserType={setUserType || 'viewer'}
                onClickHandler={shareDocumentHandler}
                />
                <Button className="" type="button" 
                onClick={()=>removeCollaboratorHandler(collaborator.email)}>Remove</Button>
            </div>
        )}
    </li>
  )
}

export default Collaborator