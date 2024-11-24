'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import Loader from "./Loader"
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";

const CollaborativeRoom = () => {
  return (
      //id = roomId where user access is required to see the room.
        <RoomProvider id={'room-id'}> 
        <ClientSideSuspense fallback={<Loader/>}>
          <div  className='collaborative-room'>
          <Header>
            
            <div className="flex w-fit justify-center items-center">
            <p className="document-title">Share</p>
            </div>
            <div className="w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators/>

              <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
            
          </Header>
            <Editor/>
            </div>
         
         </ClientSideSuspense>
        
        </RoomProvider>

  )
}

export default CollaborativeRoom