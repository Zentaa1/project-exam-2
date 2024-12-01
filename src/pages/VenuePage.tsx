import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Ensure correct styles
import getVenues from "../functions/api/getVenue";
import createBooking from "../functions/api/createBookings";
import { FaCar, FaCoffee, FaMapPin, FaPaw, FaWifi } from "react-icons/fa";
import { load } from "../functions/localStorage/load";
import EditModal from "../components/venuePage/EditModal";
import CustomerModal from "../components/venuePage/CustomerModal";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";

// Interfaces
interface Venue {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    maxGuests: number;
    media: { url: string; alt?: string }[];
    location: { country: string };
    meta: { wifi: boolean; pets: boolean; breakfast: boolean; parking: boolean };
    bookings?: { id: string; dateFrom: string; dateTo: string; guests: number; }[];
    owner?: { name: string };
}

const VenuePage = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
    const [guests, setGuests] = useState(1);
    const [bookingConfirmed, setBookingConfirmed] = useState(false); // State to track booking confirmation
    const ownProfile = load("profile") || undefined;

    useEffect(() => {
        const fetchVenue = async () => {
            if (venueId) {
                try {
                    const data: Venue = await getVenues(venueId, true, true);
                    setVenue(data);
                } catch (error) {
                    console.error("Error fetching venue:", error);
                }
            }
        };
        fetchVenue();
    }, [venueId]);

    if (!venue) return <div><Spinner /></div>;

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
                blockedDate.toISOString().split("T")[0] === date.toISOString().split("T")[0]
        )
            ? "booked-date"
            : null;

    const handleBooking = async () => {
        if (!venueId || !selectedDates[0] || !selectedDates[1]) {
            alert("Please select check-in and check-out dates.");
            return;
        }

        try {
            await createBooking({
                venueId,
                dateFrom: selectedDates[0].toISOString(),
                dateTo: selectedDates[1].toISOString(),
                guests,
            });
            setBookingConfirmed(true); // Set booking as confirmed
            setIsBookingModalOpen(false); // Close booking modal
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("An error occurred while creating the booking. Please try again.");
        }
    };

    const closeConfirmation = () => {
        setBookingConfirmed(false);
    };

    return (
        <div className="flex flex-wrap font-inter mt-10">
            <Helmet>
                <title>Venue {venueId} - StayNest</title>
                <meta name="description" content={`Discover detailed information about venue ${venueId} on StayNest.`} />
            </Helmet>
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
                    <p>{venue.location.country || "Unknown"}</p>
                </div>
                <p className="text-gray-800 font-bold text-xl mt-4">{venue.price} USD</p>
                <p className="text-gray-800">Per Night</p>
                <p className="text-gray-800 mt-2">Max Guests: {venue.maxGuests}</p>
                <div className="mt-10 grid grid-cols-2 gap-4">
                    <p className={`${venue.meta.breakfast ? "" : "line-through text-gray-400"} flex items-center`}>
                        <FaCoffee className="mr-2" /> Breakfast
                    </p>
                    <p className={`${venue.meta.parking ? "" : "line-through text-gray-400"} flex items-center`}>
                        <FaCar className="mr-2" /> Parking
                    </p>
                    <p className={`${venue.meta.pets ? "" : "line-through text-gray-400"} flex items-center`}>
                        <FaPaw className="mr-2" /> Pets
                    </p>
                    <p className={`${venue.meta.wifi ? "" : "line-through text-gray-400"} flex items-center`}>
                        <FaWifi className="mr-2" /> WiFi
                    </p>
                </div>
                <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-customOrange p-2 rounded-lg font-bold mt-6"
                >
                    Book now
                </button>
                {ownProfile?.name === venue.owner?.name && (
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-blue-500 p-2 rounded-lg font-bold mt-6 text-white"
                    >
                        Edit Venue
                    </button>
                )}
            </div>
            <div className="flex flex-col w-full md:w-1/2 p-4 items-center">
                <h2 className="text-xl font-semibold mb-4">Available Dates</h2>
                <Calendar tileClassName={tileClassName} className="react-calendar" />
                {ownProfile?.name === venue.owner?.name && (
                    <button
                        onClick={() => setIsCustomerModalOpen(true)}
                        className="bg-customOrange p-2 rounded-lg font-bold mt-6 w-full"
                    >
                        View Bookings
                    </button>
                )}
            </div>

            {/* Booking Confirmation Modal */}
            {bookingConfirmed && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Booking Confirmed!</h2>
                        <p>Your booking has been successfully created.</p>
                        <button
                            onClick={closeConfirmation}
                            className="bg-customOrange p-2 rounded-lg font-medium mt-6"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Select Your Stay</h2>
                        <Calendar
                            selectRange
                            onChange={(range) => setSelectedDates(range as [Date | null, Date | null])}
                            tileClassName={tileClassName}
                            className="react-calendar"
                        />
                        <div className="mt-4">
                            <label className="block font-medium">Number of Guests</label>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="border p-2 rounded w-full"
                            >
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => setIsBookingModalOpen(false)}
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

            <EditModal
                venue={venue}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
            <CustomerModal
                isOpen={isCustomerModalOpen}
                bookings={venue.bookings || []}
                onClose={() => setIsCustomerModalOpen(false)}
            />
        </div>
    );
};

export default VenuePage;
