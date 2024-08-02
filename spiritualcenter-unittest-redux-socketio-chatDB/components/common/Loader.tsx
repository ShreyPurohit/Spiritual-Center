import Image from "next/image";
import LoadingImage from '@/images/tadpole.svg'

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center mt-10 gap-3">
      <Image src={LoadingImage} alt="Loading" width={50} />
      <h1 className="text-sm md:text-3xl">{text}</h1>
    </div>
  )
}

export default Loader