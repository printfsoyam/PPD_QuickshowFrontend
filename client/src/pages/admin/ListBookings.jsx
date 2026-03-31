import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'; // Fallback if env is missing

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      // Simulating an API call
      setBookings(dummyBookingData);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto shadow-sm rounded-md">
        <table className="w-full border-collapse text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th scope="col" className="p-3 font-medium pl-5">User Name</th>
              <th scope="col" className="p-3 font-medium">Movie Name</th>
              <th scope="col" className="p-3 font-medium">Show Time</th>
              <th scope="col" className="p-3 font-medium">Seats</th>
              <th scope="col" className="p-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.length > 0 ? (
              bookings.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="border-b border-primary/20 bg-primary/5 even:bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <td className="p-3 min-w-45 pl-5">{item.user.name}</td>
                  <td className="p-3">{item.show.movie.title}</td>
                  <td className="p-3">{dateFormat(item.show.showDateTime)}</td>
                  <td className="p-3">
                    {/* Using Object.values for cleaner logic */}
                    {Object.values(item.bookedSeats).join(", ")}
                  </td>
                  <td className="p-3 font-medium text-white">
                    {currency}{item.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-5 text-center text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListBookings;