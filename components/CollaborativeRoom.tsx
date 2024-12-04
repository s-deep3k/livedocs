'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import Loader from "./Loader"
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";

const CollaborativeRoom = ({roomId, roomMetadata, users, currentUserType}:CollaborativeRoomProps) => {
  
  const [documentTitle,setDocumentTitle] = useState(roomMetadata.title)
  const [editing,setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTitleHandler = async(event:React.KeyboardEvent<HTMLInputElement>)=>{
    
    if(event.key ==='Enter'){
      setLoading(true)
    }
    try {
      if(documentTitle!==roomMetadata.title)
      {
        const updatedRoom = await updateDocument(roomId,documentTitle)
        if(updatedRoom)setLoading(false)
      }
    } catch (error) {
      console.log("Error updating title of document: "+error);    
    }
  }

  useEffect(()=>{
    const handleOutsideClick= (e:MouseEvent)=>{
      setLoading(true)
      if(containerRef.current && !containerRef.current.contains(e.target as Node))
        { //await?
          updateDocument(roomId,documentTitle)
          setLoading(false)
          setEditing(false)      
        }
      }
      document.addEventListener("mousedown", handleOutsideClick)
      return ()=>{
      document.removeEventListener("mousedown",handleOutsideClick)
    }
  },[roomId,documentTitle])

  useEffect(()=>{
    if(editing && inputRef.current)
    {
      inputRef.current?.focus()
    }
  },[editing])
  return (
      //id = roomId where user access is required to see the room.
        <RoomProvider id={roomId}> 
        <ClientSideSuspense fallback={<Loader/>}>
          <div  className='collaborative-room'>
          <Header>
            
            <div ref={containerRef} className="flex w-fit justify-center items-center gap-2">
            {editing && !loading ?
            <Input 
            type="text"
            ref={inputRef}
            value={documentTitle}
            placeholder="Enter title..."
            onChange={e=> setDocumentTitle(e.target.value)}
            onKeyDown={updateTitleHandler}
            disabled={!editing}
            className="document-title-input"
            />:<>
              <p className="document-title">{documentTitle}</p>
            </>
            }
            </div>

            {currentUserType==='editor' && !editing &&(
              <Image src={'/assets/icons/edit.svg'} 
              alt="edit" 
              width={24} height={24}
              className="pointer"
              onClick={()=>setEditing(true)}
              />
            )}
            {currentUserType!=='editor' && !editing &&(
              <p className="view-only-tag">View Only</p>
            )}
            {loading && <p className="text-sm text-gray-400">saving...</p>}
            <div className="w-full flex flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators/>

              <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
            
          </Header>
            <Editor roomId={roomId} currentUserType={currentUserType}/>
            </div>
         
         </ClientSideSuspense>
        
        </RoomProvider>

  )
}

export default CollaborativeRoom