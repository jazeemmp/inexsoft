import { Link } from "react-router-dom"
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdOutlineBedroomParent } from "react-icons/md";


const HomeTop = () => {
  return (
    <div className='w-full px-12 flex justify-between items-center mt-10'>
     <Link to={'/add/project'} className="bg-red-500 font-semibold text-white flex items-center gap-5 uppercase text-xl rounded-md px-5 py-2 ">
       <BsFillBuildingsFill/> Add Project 
     </Link>
     <Link to={"/add/flats"} className="bg-red-500 font-semibold text-white rounded-md px-5 py-2 flex items-center gap-5 uppercase text-xl ">
       <MdOutlineBedroomParent/> Add A Flat 
     </Link>
    </div>
  )
}

export default HomeTop