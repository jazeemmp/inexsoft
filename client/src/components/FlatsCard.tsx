import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "../apis/axios";
import { toast } from "sonner";
interface FlatProps {
  flats: { id: string; name: string; price: number }[]; // Adjust the type based on your data
}

const FlatsCard: React.FC<FlatProps> = ({ flats }) => {
  const token = localStorage.getItem("token");
  const [showBooking, setShowBooking] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const navigate = useNavigate();

  const handleBookFlat = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setShowBooking(true);
  };

  // Call booking API only when confirmBooking is true
  useEffect(() => {
    if (confirmBooking) {
      bookFlat();
    }
  }, [confirmBooking]);

  const bookFlat = async () => {
  console.log("calll");
  
    try {
     await axios.post(`/book/flat/${flats._id}`);
      setShowBooking(false);
      toast.success("Flat booked successfully!");
    } catch (error) {
      setShowBooking(false)
      console.error("Booking failed:", error);
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div className="shadow-md w-full flex justify-between items-center gap-6 p-4 rounded-2xl bg-white">
      <div>
        <img
          src={flats.flatImage || "https://via.placeholder.com/150"}
          className="w-full h-64 object-contain rounded-md"
          alt="Flat"
        />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-gray-400">Flat Type</p>
            <p className="font-medium">{flats.flatType}</p>
          </div>
          <div>
            <p className="text-gray-400">Floor</p>
            <p className="font-medium">{flats.floorNumber}</p>
          </div>
          <div>
            <p className="text-gray-400">Flat Price</p>
            <p className="font-medium">{flats.flatPrice} Lakhs</p>
          </div>
          <div>
            <p className="text-gray-400">Flat Number</p>
            <p className="font-medium">{flats.flatNumber}</p>
          </div>
          <div>
            <p className="text-gray-400">Furnished Status</p>
            <p className="font-medium">{flats.furnishingStatus}</p>
          </div>
          <div>
            <p className="text-gray-400">Super Built-up Area</p>
            <p className="font-medium">{flats.carpetArea} sq.ft</p>
          </div>
          <div>
            <p className="text-gray-400">Flat Booked ??</p>
            <p className="font-medium">
              {flats.isBooked
                ? "This Flat is not available for booking"
                : "This Flat is Available"}
            </p>
          </div>
        </div>
        <button
          disabled={flats.isBooked}
          onClick={handleBookFlat}
          className="bg-red-500 rounded-3xl px-5 disabled:bg-gray-300 text-white font-semibold py-2 text-lg mt-4 w-full"
        >
          Book Flat
        </button>
      </div>

      {showBooking && ( // Show modal only when `showBooking` is true
        <Modal onClose={()=> setShowBooking(false)}>
          <p className="text-xl mb-5">
            Are you sure you want to book this flat?
          </p>
          <div className="flex gap-4 mt-4 items-center justify-between">
            <button
              onClick={() => setConfirmBooking(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowBooking(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FlatsCard;
