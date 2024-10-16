import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";


const Documents = ({params}:{params: {id:string}}) => {
  const id = params.id;
  return (
    <div>
      <Header>
        <div className="flex w-fit justify-center items-center">
        <p className="document-title">This is a fake document title</p>
        </div>
      </Header>
      <Editor/>
    </div>
  )
}

export default Documents