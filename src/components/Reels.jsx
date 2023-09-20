
const Reels = () => {
  
  return (
    <div>
      <div className="grid-cols-3 grid gap-2 w-[60%] mx-auto mt-20">
        <div className="bg-gray-300 p-4">1</div>
        <div className="bg-gray-300 p-4">2</div>
        <div className="row-span-2 bg-gray-500 p-4">3</div>
        <div className="bg-gray-300 p-4">4</div>
        <div className="bg-gray-300 p-4">5</div>
      </div>

      <div className="grid-cols-3 grid gap-2 w-[60%] mx-auto mt-20">
        <div className="row-span-2 bg-gray-500 p-4">1</div>
        <div className="bg-gray-300 p-4">2</div>
        <div className="bg-gray-300 p-4">3</div>
        <div className="bg-gray-300 p-4">4</div>
        <div className="bg-gray-300 p-4">5</div>
      </div>
    </div>
  )
}

export default Reels