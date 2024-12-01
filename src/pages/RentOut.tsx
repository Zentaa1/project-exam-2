import { FormEvent, useEffect, useState } from "react";
import { handleInputChange } from "../functions/RentOut/handleInputChange";
import createVenue from "../functions/api/createVenue";
import { load } from "../functions/localStorage/load";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface Profile {
    venueManager: boolean;
}
interface Venue {
    name: string;
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
    };
    meta: {
        wifi: boolean;
        pets: boolean;
        breakfast: boolean;
        parking: boolean;
    };
    description: string;
    price: number;
    maxGuests: number;
    media: [{ url: string; alt: string }];
}

const RentOut = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [newVenue, setNewVenue] = useState<Venue>({
        name: "",
        location: {
            address: "",
            city: "",
            zip: "",
            country: "",
        },
        meta: {
            wifi: false,
            pets: false,
            breakfast: false,
            parking: false,
        },
        description: "",
        price: 0,
        maxGuests: 0,
        media: [{ url: "", alt: "" }],
    });

    const onInputChange = handleInputChange(setNewVenue);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const venueData = {
            ...newVenue,
            price: parseFloat(newVenue.price.toString()),
            maxGuests: parseInt(newVenue.maxGuests.toString(), 10),
        };

        try {
            console.log(venueData);
            await createVenue(venueData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    useEffect(() => {
        try {
            const loadedProfile = load("profile");
            setProfile(loadedProfile);
        } catch (error) {
            console.error(error);
            setProfile(null);
        }
    }, []);

    if (!profile || !profile.venueManager) {
        return (
            <div className="mt-10">
                <Helmet>
                    <title>Rent Out Your Venue - StayNest</title>
                    <meta name="description" content="List your venue on StayNest and start earning by renting it out to customers." />
                </Helmet>
                <h1 className="text-xl font-bold">You don't have access to this page.</h1>
                <p className="text-xl font-bold mb-5">
                    You need to log in or fix your account settings to rent out your place.
                </p>
                <Link to="/login" className="bg-customOrange w-full text-md p-2 px-6 rounded-md">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto flex justify-center items-center text-primary py-10">
             <Helmet>
                <title>Rent Out Your Venue - StayNest</title>
                <meta name="description" content="List your venue on StayNest and start earning by renting it out to customers." />
            </Helmet>
            <div className="flex flex-col shadow-md w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 space-y-4 rounded-md">
                <h1 className="text-2xl font-bold text-left">Rent out your place</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col text-left">
                        <label className="text-xl font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newVenue.name}
                            onChange={onInputChange}
                            placeholder="Best Hotel"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Address:</label>
                        <input
                            type="text"
                            name="location.address"
                            value={newVenue.location.address}
                            onChange={onInputChange}
                            placeholder="Address"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">City:</label>
                        <input
                            type="text"
                            name="location.city"
                            value={newVenue.location.city}
                            onChange={onInputChange}
                            placeholder="City"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Region:</label>
                        <input
                            type="text"
                            name="location.zip"
                            value={newVenue.location.zip}
                            onChange={onInputChange}
                            placeholder="Region"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Country:</label>
                        <input
                            type="text"
                            name="location.country"
                            value={newVenue.location.country}
                            onChange={onInputChange}
                            placeholder="Country"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={newVenue.description}
                            onChange={onInputChange}
                            placeholder="Description"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={newVenue.price || ""}
                            onChange={onInputChange}
                            placeholder="1000"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Max Guests:</label>
                        <input
                            type="number"
                            name="maxGuests"
                            value={newVenue.maxGuests || ""}
                            onChange={onInputChange}
                            placeholder="4"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col space-y-3 mt-3">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="wifi"
                                checked={newVenue.meta.wifi}
                                onChange={onInputChange}
                                className="w-5 h-5"
                            />
                            <label className="text-xl font-medium ml-2">Wifi</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="pets"
                                checked={newVenue.meta.pets}
                                onChange={onInputChange}
                                className="w-5 h-5"
                            />
                            <label className="text-xl font-medium ml-2">Pets allowed</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="parking"
                                checked={newVenue.meta.parking}
                                onChange={onInputChange}
                                className="w-5 h-5"
                            />
                            <label className="text-xl font-medium ml-2">Parking</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="breakfast"
                                checked={newVenue.meta.breakfast}
                                onChange={onInputChange}
                                className="w-5 h-5"
                            />
                            <label className="text-xl font-medium ml-2">Breakfast</label>
                        </div>
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Image URL:</label>
                        <input
                            type="text"
                            name="media.url"
                            value={newVenue.media[0].url}
                            onChange={onInputChange}
                            placeholder="Image URL"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col text-left mt-3">
                        <label className="text-xl font-medium">Image Text:</label>
                        <input
                            type="text"
                            name="media.alt"
                            value={newVenue.media[0].alt}
                            onChange={onInputChange}
                            placeholder="Image text"
                            className="text-xl bg-inputBg p-2 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md"
                    >
                        Publish Venue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RentOut;
