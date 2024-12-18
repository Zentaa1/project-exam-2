import { useEffect, useState } from "react";
import getVenues from "../../functions/api/getVenue";
import { FaMapPin, FaCoffee, FaCar, FaPaw, FaWifi } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

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

/**
 * Displays the most popular venues sorted by rating.
 * 
 * This component fetches venues from an API, sorts them by rating, and displays the top 3 highest-rated venues
 * along with their key details such as name, description, price, and available amenities.
 * 
 * @returns {JSX.Element} The rendered component showing the popular venues or a loading spinner.
 */
const PopularVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);

  /**
   * Fetches the venue data and sorts it by rating.
   * 
   * This function is triggered when the component mounts. It retrieves venue data and sorts them by rating
   * in descending order, displaying the top 3 venues.
   * 
   * @returns {void}
   */
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data: Venue[] = await getVenues();

        const topRatedVenues = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setVenues(topRatedVenues);
        console.log(topRatedVenues);
      } catch (error) {
        console.error("Error fetching venues", error);
      }
    };

    fetchVenues();
  }, []);

  /**
   * Generates the URL for a venue page.
   * 
   * @param {Venue} venue - The venue object.
   * @returns {string} The URL of the venue's details page.
   */
  const generateVenuePageLink = (venue: Venue) => `/venues/${venue.id}`;

  return (
    <div className="text-primary font-inter text-left mt-10">
      <h2 className="font-bold text-3xl">Find your next vacation</h2>
      <p>Discover our most popular venues</p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {venues.length > 0 ? (
          venues.map((venue, index) => (
            <div
              key={index}
              className="flex flex-col w-96 h-full max-w-full shadow-2xl"
            >
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
                  <p
                    className={`${
                      venue.meta.breakfast ? "" : "line-through text-gray-400"
                    } flex items-center`}
                  >
                    <FaCoffee className="mr-2" /> Breakfast
                  </p>
                  <p
                    className={`${
                      venue.meta.parking ? "" : "line-through text-gray-400"
                    } flex items-center`}
                  >
                    <FaCar className="mr-2" /> Parking
                  </p>
                  <p
                    className={`${
                      venue.meta.pets ? "" : "line-through text-gray-400"
                    } flex items-center`}
                  >
                    <FaPaw className="mr-2" /> Pets
                  </p>
                  <p
                    className={`${
                      venue.meta.wifi ? "" : "line-through text-gray-400"
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
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        )}
      </div>
      <Link to="/venues" className="text-xl mt-2">
        View all Venues
      </Link>
    </div>
  );
};

export default PopularVenues;
