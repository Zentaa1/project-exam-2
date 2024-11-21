import { FormEvent, useState } from "react";
import { handleInputChange } from "../functions/RentOut/handleInputChange";
import createVenue from "../functions/api/createVenue";

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
    media: [{ url: string; alt: string }];  // media is an object with "url" and "alt" properties
}

const RentOut = () => {
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
        media: [{ url: "", alt: "" }],  // Ensure it's an array of Media objects
    });
    
    

    const onInputChange = handleInputChange(setNewVenue);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const venueData = {
            ...newVenue,
            price: parseFloat(newVenue.price.toString()),
            maxGuests: parseInt(newVenue.maxGuests.toString(), 10)
        }

        try {
            console.log(venueData)
            await createVenue(venueData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occured")
            }
        }
    };

  return (
    <div>
        <div className="container mx-auto flex justify-center items-center text-primary">
    <div className="flex flex-col shadow-md w-1/2 p-6 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold text-left">Rent out your place</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col text-left">
                <label className="text-xl font-medium">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={newVenue.name}
                    onChange={onInputChange}
                    placeholder="Marius Bjeglerud"
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
                    placeholder="mariusbje@stud.noroff.no"
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
                    placeholder="Password"
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
                    value={newVenue.price || ''}
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
                    value={newVenue.maxGuests || ''}
                    onChange={onInputChange}
                    placeholder="4"
                    className="text-xl bg-inputBg p-2 rounded-md"
                />
            </div>
            <div className="flex flex-row text-left mt-3">
                <input
                    type="checkbox"
                    name="wifi"
                    checked={newVenue.meta.wifi}
                    onChange={onInputChange}
                    placeholder="Confirm Password"
                    className="w-10 bg-inputBg p-2 rounded-md"
                />
                <label className="text-xl font-medium">Wifi</label>
            </div>
            <div className="flex flex-row text-left mt-3">
                <input
                    type="checkbox"
                    name="pets"
                    checked={newVenue.meta.pets}
                    onChange={onInputChange}
                    placeholder="Confirm Password"
                    className="w-10 bg-inputBg p-2 rounded-md"
                />
                <label className="text-xl font-medium">Pets allowed</label>
            </div>
            <div className="flex flex-row text-left mt-3">
                <input
                    type="checkbox"
                    name="parking"
                    checked={newVenue.meta.parking}
                    onChange={onInputChange}
                    placeholder="Confirm Password"
                    className="w-10 bg-inputBg p-2 rounded-md"
                />
                <label className="text-xl font-medium">Parking</label>
            </div>
            <div className="flex flex-row text-left mt-3">
                <input
                    type="checkbox"
                    name="breakfast"
                    checked={newVenue.meta.breakfast}
                    onChange={onInputChange}
                    placeholder="Confirm Password"
                    className="w-10 bg-inputBg p-2 rounded-md"
                />
                <label className="text-xl font-medium">Breakfast</label>
            </div>
            <div className="flex flex-col text-left mt-3">
                <label className="text-xl font-medium">Image URL:</label>
                <input
                    type="text"
                    name="media.url"
                    value={newVenue.media[0].url}
                    onChange={onInputChange}
                    placeholder="Confirm Password"
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
                    placeholder="Confirm Password"
                    className="text-xl bg-inputBg p-2 rounded-md"
                />
            </div>
            <button type="submit" className="bg-customOrange w-full mt-5 font-bold text-xl p-2 rounded-md">Publish Venue</button>
            </form>
    </div>
</div>
</div>
  )
}

export default RentOut