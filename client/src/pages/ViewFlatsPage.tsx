import { useParams } from "react-router-dom";
import ListOfFlats from "../components/ListOfFlats";
import NavBar from "../components/NavBar";

const ViewFlatsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <NavBar />
      <ListOfFlats id={id} />
    </div>
  );
};

export default ViewFlatsPage;
