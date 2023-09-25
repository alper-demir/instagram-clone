import img from "../assets/images/1.jpg"
import img2 from "../assets/images/3.jpg"
import img3 from "../assets/images/7.jpg"
import img4 from "../assets/images/4.jpg"
const Reels = () => {

  return (
    <div className="flex justify-center items-center flex-col max-sm:mt-16 mt-6 max-sm:pb-20 max-lg:pb-20 max-xl:pb-80 pb-28">
      <div className="grid-cols-3 grid gap-1 w-[60%] h-[40rem] max-xl:w-[80%] max-sm:w-full max-sm:h-[16rem] max-xl:h-[22rem] mb-[2px]">
        <img src={img} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img} alt="" className="object-cover row-span-2 max-sm:h-[260px] h-full" />
        <img src={img} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
      </div>

      <div className="grid-cols-3 grid gap-1 w-[60%] h-[40rem] max-xl:w-[80%] max-sm:w-full max-sm:h-[16rem] mt-[2px] max-xl:h-[22rem] max-sm:mt-1">
        <img src={img2} alt="" className="object-cover row-span-2 max-sm:h-[260px] h-full" />
        <img src={img2} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img2} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img2} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img2} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
      </div>

      <div className="grid-cols-3 grid gap-1 w-[60%] mt-[6px] h-[40rem] max-xl:w-[80%] max-sm:w-full max-sm:h-[16rem] max-xl:h-[22rem] mb-[2px]">
        <img src={img3} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img3} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img3} alt="" className="object-cover row-span-2 max-sm:h-[260px] h-full" />
        <img src={img3} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img3} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
      </div>

      <div className="grid-cols-3 grid gap-1 w-[60%] h-[40rem] max-xl:w-[80%] max-sm:w-full max-sm:h-[16rem] mt-[2px] max-xl:h-[22rem] max-sm:mt-1">
        <img src={img4} alt="" className="object-cover row-span-2 max-sm:h-[260px] h-full" />
        <img src={img4} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img4} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img4} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
        <img src={img4} alt="" className="object-cover max-sm:max-h-32 h-full max-sm:w-full" />
      </div>
    </div>
  )
}

export default Reels