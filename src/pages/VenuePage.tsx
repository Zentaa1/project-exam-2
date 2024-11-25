import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Make sure this package is installed
import "react-calendar/dist/Calendar.css"; // Default styles (overridden by custom CSS)
import getVenues from "../functions/api/getVenue";
import { FaCar, FaCoffee, FaMapPin, FaPaw, FaWifi } from "react-icons/fa";

// Interfaces
interface Customer {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string };
    banner?: { url: string };
}

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated?: string;
    customer: Customer;
}

interface Owner {
    id: string;
    name: string;
    email: string;
}

interface Media {
    url: string;
    alt?: string;
}

interface Meta {
    wifi: boolean;
    pets: boolean;
    breakfast: boolean;
    parking: boolean;
}

interface Location {
    country: string;
}

interface Venue {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    maxGuests: number;
    media: Media[];
    location: Location;
    meta: Meta;
    bookings?: Booking[];
    owner?: Owner;
}

const VenuePage = () => {
    const [venue, setVenue] = useState<Venue | null>(null);
    const { venueId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
    const [formattedDates, setFormattedDates] = useState<{ dateFrom: string; dateTo: string } | null>(null);
    const [guests, setGuests] = useState(1);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                if (venueId) {
                    const data: Venue = await getVenues(venueId, true, true);
                    setVenue(data);
                }
            } catch (error) {
                console.error("Error fetching venue:", error);
            }
        };

        fetchVenue();
    }, [venueId]);

    if (!venue) {
        return <div>Loading...</div>;
    }

    const blockedDates = venue.bookings?.reduce<Date[]>((dates, booking) => {
        const startDate = new Date(booking.dateFrom);
        const endDate = new Date(booking.dateTo);

        while (startDate <= endDate) {
            dates.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return dates;
    }, []);

    const tileClassName = ({ date }: { date: Date }) =>
        blockedDates?.some(
            blockedDate =>
                blockedDate.toISOString().split("T")[0] ===
                date.toISOString().split("T")[0]
        )
            ? "booked-date"
            : null;

    const handleDateChange = (range: [Date | null, Date | null]) => {
        setSelectedDates(range);

        if (range[0] && range[1]) {
            setFormattedDates({
                dateFrom: range[0].toISOString(),
                dateTo: range[1].toISOString(),
            });
        } else {
            setFormattedDates(null);
        }
    };


    const handleBooking = () => {
        if (selectedDates[0] && selectedDates[1]) {
            console.log("Booking details:", {
                dateFrom: selectedDates[0].toISOString(),
                dateTo: selectedDates[1].toISOString(),
                guests,
            });
            setIsModalOpen(false);
        } else {
            alert("Please select both check-in and check-out dates.");
        }
    };
    
    

    return (
        <div className="flex flex-wrap font-inter mt-10">
            <div className="flex flex-col w-full md:w-1/2 p-4 text-left">
                <img
                    src={venue.media[0]?.url || "https://via.placeholder.com/400"}
                    alt={venue.media[0]?.alt || "Venue Image"}
                    className="rounded-lg shadow-lg mb-4"
                />
                <h1 className="text-2xl font-bold">{venue.name}</h1>
                <p className="text-gray-600">{venue.description}</p>
                <div className="flex items-center">
                    <FaMapPin className="text-xl mr-2" />
                    <p>{venue.location.country || "Some Place"}</p>
                </div>
                <p className="text-gray-800 mt-6">Max Guests: {venue.maxGuests}</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-customOrange p-2 rounded-lg font-bold mt-6"
                >
                    Book now
                </button>
            </div>
            <div className="flex flex-col w-full md:w-1/2 p-4">
                <h2 className="text-xl font-semibold mb-4">Available dates</h2>
                <div className="flex justify-center">
                    <Calendar
                        tileClassName={tileClassName}
                        className="react-calendar"
                    />
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 justify-items-center">
                    <p className={`${venue.meta.breakfast ? "" : "line-through text-gray-400"} flex items-center justify-center`}>
                        <FaCoffee className="mr-2" /> Breakfast
                    </p>
                    <p className={`${venue.meta.parking ? "" : "line-through text-gray-400"} flex items-center justify-center`}>
                        <FaCar className="mr-2" /> Parking
                    </p>
                    <p className={`${venue.meta.pets ? "" : "line-through text-gray-400"} flex items-center justify-center`}>
                        <FaPaw className="mr-2" /> Pets
                    </p>
                    <p className={`${venue.meta.wifi ? "" : "line-through text-gray-400"} flex items-center justify-center`}>
                        <FaWifi className="mr-2" /> WiFi
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Select Your Stay</h2>
                        <Calendar
                            selectRange={true}
                            onChange={(dates) =>
                                handleDateChange(dates as [Date | null, Date | null])
                            }
                            tileClassName={tileClassName}
                            className="react-calendar"
                        />
                        <div className="mt-4">
                            <label className="block font-medium">Number of Guests</label>
                            <input
                                type="number"
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="border p-2 rounded w-full"
                                min={1}
                                max={venue.maxGuests}
                            />
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 p-2 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                className="bg-customOrange p-2 rounded-lg font-medium text-white"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VenuePage;