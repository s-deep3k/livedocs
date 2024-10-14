

const Documents = ({params}:{params: {id:string}}) => {
  const id = params.id;
  return (
    <div>
      <p>Docs {id}</p>
    </div>
  )
}

export default Documents