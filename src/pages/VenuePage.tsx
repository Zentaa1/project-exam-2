import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Make sure this package is installed
import "react-calendar/dist/Calendar.css"; // Default styles (overridden by custom CSS)
import getVenues from "../functions/api/getVenue";
import { FaMapPin } from "react-icons/fa";

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

    return (
        <div className="flex flex-wrap">
            {/* Left Section: Venue Details */}
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
                <p className="text-gray-800">Max Guests: {venue.maxGuests}</p>
            </div>

            {/* Right Section: Calendar and Bookings */}
            <div className="flex flex-col w-full md:w-1/2 p-4">
                <h2 className="text-xl font-semibold mb-4">Available dates</h2>
                <div className="flex justify-center">
                    <Calendar
                        tileClassName={tileClassName}
                        className="react-calendar"
                    />
                </div>
            </div>
        </div>
    );
};

export default VenuePage;
