import Image from "next/image"
import Link from "next/link"


const Header = () => {
  return (
    <div>
        <Link href=""/>
        <Image src="/assets/logo.png" 
        alt="Logo with name"
        width={32}
        height={32}
        
        />
    </div>
  )
}

export default Header