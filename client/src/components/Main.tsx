type Project = {
  _id: string;
  projectName: string;
  contact: string;
  description: string;
  location: string;
  projectImage: string;
  flats: [];
};
import { useEffect, useState } from "react";
import axios from "../apis/axios";
import ProjectCard from "./ProjectCard";
import { BsFillBuildingsFill } from "react-icons/bs";
const Main = () => {
  const [projets, setProjets] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/projects");
        setProjets(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <main className="text-center px-10">
      <div className="flex gap-3 items-center mt-6">
        <BsFillBuildingsFill className="text-4xl" />
        <h1 className="text-4xl font-bold my-5 text-red-500 uppercase">
          Projects
        </h1>
      </div>
      {projets.map((project: Project) => (
        <div className="grid grid-cols-2 gap-x-5">
          <ProjectCard project={project} />
        </div>
      ))}
    </main>
  );
};

export default Main;
