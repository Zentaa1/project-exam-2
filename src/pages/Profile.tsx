import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProfile from "../functions/api/getProfile";
import SettingsModal from "../components/profilepage/SettingsModal";
import BookingsModal from "../components/profilepage/BookingsModal";
import { FaCar, FaCoffee, FaMapPin, FaPaw, FaWifi } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";

interface Avatar {
  url: string;
  alt: string;
}

interface Profile {
  name: string;
  bio: string;
  venueManager: boolean;
  avatar: Avatar;
}

interface BookingVenue {
  name: string;
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: BookingVenue;
}

interface Location {
  country: string;
}

interface Media {
  url: string;
  alt: string;
}

interface Meta {
  wifi: boolean;
  pets: boolean;
  breakfast: boolean;
  parking: boolean;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  media: Media[];
  location: Location;
  meta: Meta;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile(username);
        setProfile(data.profile);
        setBookings(data.bookings || []);
        setVenues(data.venues);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const openBookings = () => {
    setIsBookingsOpen(true);
  };

  const closeBookings = () => {
    setIsBookingsOpen(false);
  };

  const generateVenuePageLink = (venue: Venue) => `/venues/${venue.id}`;

  if (!username) {
    return <div>Profile not found</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Helmet>
        <title>{username ? `${username}'s Profile - StayNest` : "Profile - StayNest"}</title>
        <meta name="description" content={`View ${username}'s profile on StayNest. Explore their details and activity.`} />
      </Helmet>
      {profile && (
        <div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-32"
              src={profile.avatar.url}
              alt={profile.avatar.alt}
            />
            <div className="flex justify-center items-center">
              <h1 className="text-lg font-semibold">{profile.name}</h1>
              <button onClick={openSettings} className="p-2 rounded-full hover:bg-gray-200">
                ⚙️
              </button>
              <SettingsModal profile={profile} isOpen={isSettingsOpen} onClose={closeSettings} />
            </div>
            <p className="text-gray-600 text-center">
              {profile.bio ? profile.bio : "This user has not provided a bio."}
            </p>
          </div>
          <div className="mt-4">
            <button onClick={openBookings} className="bg-customOrange text-primary py-2 px-4 rounded-lg">
              View Upcoming Bookings
            </button>
            {isBookingsOpen && bookings.length > 0 && (
              <BookingsModal
                isOpen={isBookingsOpen}
                bookingData={bookings}
                closeModal={closeBookings}
              />
            )}
          </div>
          <div className="w-full px-4">
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {venues.length > 0 ? (
                venues.map((venue, index) => (
                  <div key={index} className="flex flex-col w-96 h-full max-w-full shadow-2xl">
                    <div className="rounded-t-lg h-36 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-[50%_50%]"
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                      />
                    </div>
                    <div className="text-left p-2 flex-grow">
                      <h2 className="font-bold text-2xl">{venue.name}</h2>
                      <div className="flex items-center">
                        <FaMapPin className="text-xl mr-2" />
                        <p>{venue.location.country || "Some Place"}</p>
                      </div>
                      <p className="truncate">{venue.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-4">
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
                    </div>
                    <div className="flex flex-row bg-customOrange rounded-b-lg justify-between items-center p-2">
                      <div>
                        <a
                          className="bg-white text-primary p-2 rounded-lg font-medium text-md"
                          href={generateVenuePageLink(venue)}
                        >
                          More Info
                        </a>
                      </div>
                      <div className="flex flex-col text-right">
                        <p className="font-bold text-2xl">{venue.price} USD</p>
                        <p className="text-lg">Per Night</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No venues found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
