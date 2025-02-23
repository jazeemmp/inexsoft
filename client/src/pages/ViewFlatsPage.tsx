import { useParams } from "react-router-dom";
import ListOfFlats from "../components/ListOfFlats";
import NavBar from "../components/NavBar";

const ViewFlatsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <NavBar />
      <ListOfFlats id={id} />
    </>
  );
};

export default ViewFlatsPage;
