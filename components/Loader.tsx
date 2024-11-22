import Image from 'next/image'

const Loader = () => {
  return (
    <div className="loader">
        <Image 
        src={"assets/icons/loader.svg"}    
        alt='loader'
        width={32}
        height={32}
        />
    </div>
  )
}

export default Loader