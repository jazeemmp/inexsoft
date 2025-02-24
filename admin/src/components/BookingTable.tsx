import { CiSearch } from "react-icons/ci";
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
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAllBookings = async () => {
      try {
        const { data } = await axios.get("/all/bookings");
        console.log(data);
        setBookings(data);
        setFilteredBookings(data); // Store original data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllBookings();
  }, []);

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    if (!searchTerm) {
      setFilteredBookings(bookings); // Reset to original data if empty search
      return;
    }

    const filtered = bookings.filter(
      (booking) =>
        booking.user.name.toLowerCase().includes(searchTerm) ||
        booking.user.phone.includes(searchTerm)
    );
    setFilteredBookings(filtered);
  };

  return (
    <div className="overflow-x-auto px-10">
      {loading ? (
        <div className="flex mt-28 items-center justify-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-t-transparent border-l-transparent border-gradient border-red-500"></div>
        </div>
      ) : (
        <div className="items-end flex flex-col">
          <div className="flex bg-white mt-5 items-center justify-start gap-3 shadow-md w-[80vw] max-w-[416px] px-5 py-3 rounded-md">
            <CiSearch />
            <input
              type="text"
              placeholder="Enter User Name or Contact"
              className="w-full h-full border-none outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <table className="min-w-full mt-10 bg-white shadow-md rounded-3xl overflow-hidden">
            <thead>
              <tr className="border-b-2 border-red-200 ">
                <th className="py-4 px-6 text-left">User</th>
                <th className="py-4 px-6 text-left">Contact Number</th>
                <th className="py-4 px-6 text-left">Flat</th>
                <th className="py-4 px-6 text-left">Project</th>
                <th className="py-4 px-6 text-left">Booking Date</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Payment Status</th>
                <th className="py-4 px-6 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">{booking.user?.name || "N/A"}</td>
                  <td className="py-4 px-6">{booking.user?.phone || "N/A"}</td>
                  <td className="py-4 px-6">
                    {booking.flat?.flatType || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    {booking.project?.projectName || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 capitalize font-semibold">
                    {booking.status}
                  </td>
                  <td className="py-4 px-6 capitalize text-green-600 font-semibold">
                    {booking.paymentStatus}
                  </td>
                  <td className="py-4 px-6 font-bold">
                    ₹{booking.totalAmount} Lakhs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
