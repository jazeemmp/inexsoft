import axios from "../api/axios";
import { useEffect, useState } from "react";


interface User {
  _id: string;
  name: string;
  phone: string;
}

interface Flat {
  _id: string;
  flatType: string;
}

interface Project {
  _id: string;
  projectName: string;
}

interface Booking {
  _id: string;
  user: User;
  flat: Flat;
  project: Project;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  totalAmount: number;
}


const BookingTable = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    useEffect(() => {
      const getAllBookings = async () => {
        try {
          const { data } = await axios.get("/all/bookings");
          console.log(data);
          
          setBookings(data);
        } catch (error) {
          console.log(error);
        }
      };
      getAllBookings();
    }, []);
  return (
    <div className="overflow-x-auto px-10">
      <table className="min-w-full bg-white border mt-10 border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Contact Number</th>
            <th className="py-2 px-4 text-left">Flat</th>
            <th className="py-2 px-4 text-left">Project</th>
            <th className="py-2 px-4 text-left">Booking Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Payment Status</th>
            <th className="py-2 px-4 text-left">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{booking.user?.name || "N/A"}</td>
              <td className="py-2 px-4">{booking.user?.phone || "N/A"}</td>
              <td className="py-2 px-4">{booking.flat?.flatType || "N/A"}</td>
              <td className="py-2 px-4">{booking.project?.projectName || "N/A"}</td>
              <td className="py-2 px-4">
                {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}
              </td>
              <td className="py-2 px-4 capitalize text-blue-600 font-semibold">
                {booking.status}
              </td>
              <td className="py-2 px-4 capitalize text-green-600 font-semibold">
                {booking.paymentStatus}
              </td>
              <td className="py-2 px-4 font-bold">
                ₹{booking.totalAmount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
