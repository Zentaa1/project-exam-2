import React from "react";

type Media = {
    url: string;
    alt: string;
};

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
    media: Media[];
}

export function handleInputChange<T extends Venue>(
    setState: React.Dispatch<React.SetStateAction<T>>
) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        // Handle boolean fields like checkboxes
        if (type === "checkbox") {
            setState((prev: T) => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    [name]: checked,
                },
            }));
        } else if (name.startsWith("media.")) {
            // Handle media fields
            const field = name.split(".")[1];  // Extract 'url' or 'alt'
            setState((prev: T) => ({
                ...prev,
                media: prev.media.map((item, index) => {
                    if (index === 0) {
                        return {
                            ...item,
                            [field]: value,  // Update the correct field (url or alt)
                        };
                    }
                    return item;
                }),
            }));
        } else if (name.startsWith("location.")) {
            // Handle location fields
            const field = name.split(".")[1];
            setState((prev: T) => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: value,
                },
            }));
        } else {
            // Handle number fields (price, maxGuests)
            if (name === "price" || name === "maxGuests") {
                const numericValue = parseFloat(value);
                // Only update if the value is a valid number
                if (!isNaN(numericValue)) {
                    setState((prev: T) => ({
                        ...prev,
                        [name]: numericValue,
                    }));
                }
            } else {
                // Handle other fields (e.g., name, description, etc.)
                setState((prev: T) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }
    };
}







