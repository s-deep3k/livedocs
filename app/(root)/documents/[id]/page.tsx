import { Editor } from "@/components/editor/Editor";


const Documents = ({params}:{params: {id:string}}) => {
  const id = params.id;
  return (
    <div>
      <Editor/>
    </div>
  )
}

export default Documents