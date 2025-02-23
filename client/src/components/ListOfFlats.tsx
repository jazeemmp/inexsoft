import { useEffect, useState } from "react";
import axios from "../apis/axios";
import FlatsCard from "./FlatsCard";

const ListOfFlats = ({ id }: any) => {
  const [flats, setFlats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllFlats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/flats/${id}`);
        console.log(data.flats, "=falts");
        setFlats(data?.flats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllFlats();
  }, [id]);
  return (
    <div>
      {loading ? (
        <div className="flex mt-28 items-center justify-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-t-transparent border-l-transparent border-gradient border-red-500"></div>
        </div>
      ) : (
        <>
          {flats?.map((data, key) => (
            <div className="w-full grid grid-cols-1 px-20 py-10">
              <FlatsCard key={key} flat={data} setFlats={setFlats}  />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListOfFlats;
