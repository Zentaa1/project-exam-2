import React, { useState } from "react";
import updateVenue from "../../functions/api/updateVenue";
import delVenue from "../../functions/api/delVenue";
import { useNavigate } from "react-router-dom";

interface Venue {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    maxGuests: number;
    location: { 
        country: string; 
    };
    meta: {
        wifi: boolean;
        pets: boolean;
        breakfast: boolean;
        parking: boolean;
    };
    media: Array<{
        url: string;
        alt?: string;
    }>;
}



interface EditModalProps {
    venue: Venue;
    isOpen: boolean;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ venue, isOpen, onClose }) => {
    const [editVenue, setEditVenue] = useState<Venue>(venue);
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Venue</h2>
                <div className="mt-4">
                    <label className="block font-medium">Venue Name</label>
                    <input
                        type="text"
                        value={editVenue.name}
                        onChange={(e) =>
                            setEditVenue({ ...editVenue, name: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={editVenue.description}
                        onChange={(e) =>
                            setEditVenue({ ...editVenue, description: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                        rows={3}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        value={editVenue.price}
                        onChange={(e) =>
                            setEditVenue({
                                ...editVenue,
                                price: parseFloat(e.target.value),
                            })
                        }
                        className="border p-2 rounded w-full"
                        min={0}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-medium">Max Guests</label>
                    <input
                        type="number"
                        value={editVenue.maxGuests}
                        onChange={(e) =>
                            setEditVenue({
                                ...editVenue,
                                maxGuests: parseInt(e.target.value, 10),
                            })
                        }
                        className="border p-2 rounded w-full"
                        min={1}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-medium">Country</label>
                    <input
                        type="text"
                        value={editVenue.location.country}
                        onChange={(e) =>
                            setEditVenue({
                                ...editVenue,
                                location: {
                                    ...editVenue.location,
                                    country: e.target.value,
                                },
                            })
                        }
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-medium">Country</label>
                    <input
                        type="text"
                        value={editVenue.location.country}
                        onChange={(e) =>
                            setEditVenue({
                                ...editVenue,
                                location: {
                                    ...editVenue.location,
                                    country: e.target.value,
                                },
                            })
                        }
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={editVenue.meta.wifi}
                            onChange={(e) =>
                                setEditVenue({
                                    ...editVenue,
                                    meta: {
                                        ...editVenue.meta,
                                        wifi: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        WiFi
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={editVenue.meta.pets}
                            onChange={(e) =>
                                setEditVenue({
                                    ...editVenue,
                                    meta: {
                                        ...editVenue.meta,
                                        pets: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        Pets
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={editVenue.meta.breakfast}
                            onChange={(e) =>
                                setEditVenue({
                                    ...editVenue,
                                    meta: {
                                        ...editVenue.meta,
                                        breakfast: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        Breakfast
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={editVenue.meta.parking}
                            onChange={(e) =>
                                setEditVenue({
                                    ...editVenue,
                                    meta: {
                                        ...editVenue.meta,
                                        parking: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        Parking
                    </label>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 p-2 rounded-lg font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (venue.id && editVenue) {
                                await updateVenue({
                                    ...editVenue,
                                    location: {
                                        country: editVenue.location.country,
                                    },
                                })
                                onClose();
                                window.location.reload();
                            }
                        }}
                        className="bg-customOrange p-2 rounded-lg font-medium text-white"
                    >
                        Save Changes
                    </button>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={async () => {
                            if (venue.id) {
                                await delVenue(venue.id);

                                onClose();
                                navigate("/");
                            }
                        }}
                        className="bg-red-500 p-2 rounded-lg font-medium text-white"
                    >
                        Delete Venue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
