import Image from 'next/image'

const Loader = () => {
  return (
    <div className="loader">
        <Image alt='loader'
        width={32}
        height={32}
        src={'assets/icons/loader.svg'}/>    
    </div>
  )
}

export default Loader