import { Link } from "react-router-dom"


const HomeTop = () => {
  return (
    <div className='w-full px-12 flex justify-between items-center mt-10'>
     <Link to={'/add/project'} className="bg-red-500 font-semibold text-white rounded-md px-5 py-2 ">
        Add Project 
     </Link>
     <Link to={"/add/flats"} className="bg-red-500 font-semibold text-white rounded-md px-5 py-2 ">
        Add A Flat inside A Project
     </Link>
    </div>
  )
}

export default HomeTop