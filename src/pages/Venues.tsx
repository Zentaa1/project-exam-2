import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchVenue from "../functions/api/searchVenue";
import getVenues from "../functions/api/getVenue";
import { FaCar, FaCoffee, FaMapPin, FaPaw, FaWifi } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner"; // Import your spinner component
import SearchComponent from "../components/SearchComponent";

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

const Venues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const response = await searchVenue(searchQuery);
          setVenues(Array.isArray(response.data) ? response.data : []);
        } else {
          const data: Venue[] = await getVenues();
          setVenues(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching venues.", error);
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [searchQuery]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const generateVenuePageLink = (venue: Venue) => `/venues/${venue.id}`;

  return (
    <div className="text-primary font-inter text-left mt-10">
      <Helmet>
        <title>Explore All Venues - StayNest</title>
        <meta
          name="description"
          content="Browse all available venues on StayNest. Find the perfect venue for your event."
        />
      </Helmet>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <SearchComponent />
          <h2 className="font-bold text-3xl">Find your next vacation</h2>
          <p>Discover our most popular venues</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {venues.slice(0, visibleCount).map((venue) => (
              <div
                key={venue.id}
                className="flex flex-col w-96 h-full max-w-full shadow-2xl"
              >
                <div className="rounded-t-lg h-36 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-[50%_50%]"
                    src={venue.media?.[0]?.url || "/placeholder-image.jpg"}
                    alt={venue.media?.[0]?.alt || "Venue image"}
                  />
                </div>
                <div className="text-left p-2 flex-grow">
                  <h2 className="font-bold text-2xl">{venue.name}</h2>
                  <div className="flex items-center">
                    <FaMapPin className="text-xl mr-2" />
                    <p>{venue.location?.country || "Some Place"}</p>
                  </div>
                  <p className="truncate">{venue.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <p
                      className={`${
                        venue.meta?.breakfast
                          ? ""
                          : "line-through text-gray-400"
                      } flex items-center`}
                    >
                      <FaCoffee className="mr-2" /> Breakfast
                    </p>
                    <p
                      className={`${
                        venue.meta?.parking ? "" : "line-through text-gray-400"
                      } flex items-center`}
                    >
                      <FaCar className="mr-2" /> Parking
                    </p>
                    <p
                      className={`${
                        venue.meta?.pets ? "" : "line-through text-gray-400"
                      } flex items-center`}
                    >
                      <FaPaw className="mr-2" /> Pets
                    </p>
                    <p
                      className={`${
                        venue.meta?.wifi ? "" : "line-through text-gray-400"
                      } flex items-center`}
                    >
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
            ))}
          </div>
          {visibleCount < venues.length && (
            <button
              onClick={handleLoadMore}
              className="mt-4 bg-customOrange text-white px-4 py-2 rounded-lg font-medium"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Venues;
