import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';

const ListShows = () => {
    // Accessing currency from environment variables
    const currency = import.meta.env.VITE_CURRENCY || '$'; 

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllShows = async () => {
        try {
            // Mocking the API call with dummy data
            // Fixed the date string typo from 06030 to 06-30
            setShows([{
                movie: dummyShowsData[0],
                showDateTime: "2025-06-30T02:30:00.000Z",
                showPrice: 59,
                occupiedSeats: {
                    A1: "user_1",
                    B1: "user_2",
                    C1: "user_3",
                }
            }]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching shows:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllShows();
    }, []);

    return !loading ? (
        <div className="p-5">
            <Title text1="List" text2="Shows" />
            
            <div className="max-w-4xl mt-6 overflow-x-auto shadow-lg rounded-md">
                <table className="w-full border-collapse bg-black/20 text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white border-b border-primary/30">
                            <th className="p-4 font-medium pl-5">Movie Name</th>
                            <th className="p-4 font-medium">Show Time</th>
                            <th className="p-4 font-medium">Total Bookings</th>
                            <th className="p-4 font-medium">Earnings</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-200">
                        {shows.length > 0 ? (
                            shows.map((show, index) => {
                                const bookingCount = Object.keys(show.occupiedSeats).length;
                                const totalEarnings = bookingCount * show.showPrice;

                                return (
                                    <tr 
                                        key={index} 
                                        className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-primary/20 transition-all"
                                    >
                                        <td className="p-4 min-w-45 pl-5 font-medium text-white">
                                            {show.movie.title}
                                        </td>
                                        <td className="p-4">
                                            {dateFormat(show.showDateTime)}
                                        </td>
                                        <td className="p-4 text-center">
                                            {bookingCount}
                                        </td>
                                        <td className="p-4 font-semibold text-green-400">
                                            {currency} {totalEarnings.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-gray-500">
                                    No shows available to display.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table> 
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default ListShows;