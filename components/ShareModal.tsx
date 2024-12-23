import { useSelf } from "@liveblocks/react/suspense"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react"
import { DialogHeader } from "./ui/dialog"
import Image from "next/image"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import UserTypeSelector from "./UserTypeSelector"
import Collaborator from "./Collaborator"


const ShareModal = ({ roomId, creatorId, currentUserType, collaborators }: ShareDocumentDialogProps) => {
    const user = useSelf()
    const [open, setOpen] = useState(false)
    const [loading, setsetLoading] = useState(false)

    const [userType, setUserType] = useState('viewer' as UserType)
    const [email, setEmail] = useState('')

    const shareDocumentHandler = async ()=>{}
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="gradient-blue flex px-4 h-9 gap-1 " disabled={currentUserType!=='editor'}>
                    <Image 
                    src='/assets/icons/share.svg'
                    alt="share"
                    className="min-w-4 md:size-5"
                    width={20}
                    height={20}
                    />
                    <p className="mr-1 hidden sm:block">Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog">
                <DialogHeader>
                    <DialogTitle>Manage who can view this project</DialogTitle>
                    <DialogDescription>
                        Select which users can view and edit this document
                    </DialogDescription>
                </DialogHeader>

                <Label htmlFor="email" className="mt-6 text-blue-100">
                    Email Address
                </Label>
                <div className="flex items-center gap-3">
                    <div className="flex flex-1 rounded-md bg-dark-400">
                        <Input 
                        id="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="share-input"
                        />
                        <UserTypeSelector userType={userType} setUserType={setUserType}/> 
                    </div>
                    <Button type="submit" onClick={shareDocumentHandler}
                    className="gradient-blue flex h-full gap-1 px-5" disabled={loading}
                    >
                    {loading ? 'Sending...':'Invite'}
                    </Button>
                </div>
                <div className="my-2 space-y-2">
                    <div className="flex flex-col">
                        {collaborators.map(collaborator=>(
                            <Collaborator roomId={roomId} creatorId={creatorId} user={user} email={email} collaborator={collaborator}/>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ShareModal