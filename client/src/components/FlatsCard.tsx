import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "../apis/axios";
import { toast } from "sonner";
interface Flat {
  _id: string;
  name: string;
  price: number;
  flatImage?: string;
  flatType?: string;
  floorNumber?: number;
  flatPrice?: number;
  flatNumber?: string;
  furnishingStatus?: string;
  carpetArea?: number;
  isBooked?: boolean;
}

interface FlatProps {
  flats: Flat[];
}

const FlatsCard: React.FC<FlatProps> = ({ flats }) => {
  const token = localStorage.getItem("token");
  const [showBooking, setShowBooking] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const navigate = useNavigate();
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

  const handleBookFlat = (flat: Flat) => {
    if (!token) {
      navigate("/login");
      return;
    }
    setSelectedFlat(flat);
    setShowBooking(true);
  };

  useEffect(() => {
    if (confirmBooking && selectedFlat) {
      bookFlat(selectedFlat._id);
    }
  }, [confirmBooking, selectedFlat]);

  const bookFlat = async (flatId: string) => {
    try {
      await axios.post(`/book/flat/${flatId}`);
      setShowBooking(false);
      toast.success("Flat booked successfully!");
    } catch (error) {
      setShowBooking(false);
      console.error("Booking failed:", error);
      toast.error(error?.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {flats.map((flat) => (
        <div key={flat._id} className="shadow-md w-full flex justify-between items-center gap-6 p-4 rounded-2xl bg-white">
          <div>
            <img
              src={flat.flatImage || "https://via.placeholder.com/150"}
              className="w-full h-64 object-contain rounded-md"
              alt="Flat"
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-gray-400">Flat Type</p>
                <p className="font-medium">{flat.flatType}</p>
              </div>
              <div>
                <p className="text-gray-400">Floor</p>
                <p className="font-medium">{flat.floorNumber}</p>
              </div>
              <div>
                <p className="text-gray-400">Flat Price</p>
                <p className="font-medium">{flat.flatPrice} Lakhs</p>
              </div>
              <div>
                <p className="text-gray-400">Flat Number</p>
                <p className="font-medium">{flat.flatNumber}</p>
              </div>
              <div>
                <p className="text-gray-400">Furnished Status</p>
                <p className="font-medium">{flat.furnishingStatus}</p>
              </div>
              <div>
                <p className="text-gray-400">Super Built-up Area</p>
                <p className="font-medium">{flat.carpetArea} sq.ft</p>
              </div>
              <div>
                <p className="text-gray-400">Flat Booked ??</p>
                <p className="font-medium">
                  {flat.isBooked ? "This Flat is not available for booking" : "This Flat is Available"}
                </p>
              </div>
            </div>
            <button
              disabled={flat.isBooked}
              onClick={() => handleBookFlat(flat)}
              className="bg-red-500 rounded-3xl px-5 disabled:bg-gray-300 text-white font-semibold py-2 text-lg mt-4 w-full"
            >
              Book Flat
            </button>
          </div>
        </div>
      ))}

      {showBooking && selectedFlat && (
        <Modal onClose={() => setShowBooking(false)}>
          <p className="text-xl mb-5">Are you sure you want to book this flat?</p>
          <div className="flex gap-4 mt-4 items-center justify-between">
            <button onClick={() => setConfirmBooking(true)} className="bg-green-500 text-white px-4 py-2 rounded">
              Confirm
            </button>
            <button onClick={() => setShowBooking(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default FlatsCard;
