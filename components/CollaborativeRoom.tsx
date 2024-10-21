import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import Loader from "./Loader"
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

const CollaborativeRoom = () => {
  return (
        <RoomProvider id={'room-id'}>
        <ClientSideSuspense fallback={<Loader/>}>
          <div  className='collaborative-room'>
          <Header>
            <div className="flex w-fit justify-center items-center">
            <p className="document-title">Share</p>
            </div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </Header>
            <Editor/>
            </div>
         </ClientSideSuspense>
        </RoomProvider>

  )
}

export default CollaborativeRoom