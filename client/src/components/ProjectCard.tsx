import { FaPhone } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Project = {
  _id: string;
  projectName: string;
  contact: string;
  description: string;
  location: string;
  projectImage: string;
  flats: [];
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()
  return (
    <div
      key={project._id}
      className="my-5 shadow-md cursor-pointer rounded-2xl overflow-hidden"
    >
      <div className="relative w-full h-96">
        <img
          src={project.projectImage}
          className="w-full h-full object-cover object-top rounded-md"
        />
      </div>
      <div className="p-10">
        <h2 className="text-red-500 inset-0 flex items-center justify-center mb-4 text-start text-3xl font-bold uppercase">
          {project.projectName}
        </h2>
        <p className="text-base text-start text-gray-500">
          {project.description}
        </p>
        <div>
          <p className="flex gap-5 items-center mt-4 capitalize">
            <IoLocation className="text-red-500 text-xl" />
            {project.location}
          </p>
          <p className="flex gap-5 items-center mt-2">
            <FaPhone className="text-red-500 text-xl" />
            {project.contact}
          </p>
        </div>
      </div>
      <button onClick={()=> navigate(`/view/flats/${project._id}`)} className="justify-end p-4 bg-red-500 px-10 py-3 mb-5 rounded-3xl text-white font-bold cursor-pointer">
        View Flats
      </button>
    </div>
  );
};

export default ProjectCard;
