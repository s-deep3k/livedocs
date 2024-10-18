import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";


const Documents = ({params}:{params: {id:string}}) => {
  const id = params.id;
  return (
    <div>
      <Header>
        <div className="flex w-fit justify-center items-center">
        <p className="document-title">This is a fake document title</p>
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
  )
}

export default Documents