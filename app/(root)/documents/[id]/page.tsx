import CollaborativeRoom from "@/components/CollaborativeRoom";



const Documents = ({params}:{params: {id:string}}) => {
  const id = params.id;
  return (
    <div className="flex w-full items-center">
      <CollaborativeRoom/>
    </div>
  )
}

export default Documents