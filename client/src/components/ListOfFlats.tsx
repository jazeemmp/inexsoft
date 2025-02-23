import { useEffect, useState } from "react";
import axios from "../apis/axios";
import FlatsCard from "./FlatsCard";

const ListOfFlats = ({ id }: any) => {
  const [flats, setFlats] = useState([]);
  useEffect(() => {
    const getAllFlats = async () => {
      try {
        const { data } = await axios.get(`/flats/${id}`);
        console.log(data)
        setFlats(data.flats);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFlats();
  }, []);
  return (
    <div>
      {flats?.map((data, key) => (
        <div className="grid grid-cols-1 px-20 py-10">
          <FlatsCard flats={data}/>
        </div>
      ))}
    </div>
  );
};

export default ListOfFlats;
