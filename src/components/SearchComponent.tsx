import { useState, FormEvent, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/SearchComponent.css";

interface Country {
  name: {
    common: string;
  };
}

const SearchComponent = () => {
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [maxGuests, setMaxGuests] = useState<number | null>(null);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
  
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort();
  
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
  
    fetchCountries();
  }, []);
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Location:", location);
    console.log("Date Range:", dateRange);
    console.log("Max Guests:", maxGuests);
  };

  return (
    <div className="text-primary">
      <h2 className="text-2xl font-bold text-left mb-4">Search for Venues</h2>
      <form className="flex gap-4 justify-between" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="location"></label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="date-range"></label>
          {dateRange.length === 0 && (
            <div className="placeholder-overlay">Select dates</div>
          )}
          <Flatpickr
            options={{ mode: "range", dateFormat: "Y-m-d" }}
            value={dateRange}
            onChange={(selectedDates) => setDateRange(selectedDates as Date[])}
            className="p-2 border border-gray-300 rounded flatpickr-input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max-guests"></label>
          <select
            id="max-guests"
            value={maxGuests ?? ""}
            onChange={(e) => setMaxGuests(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select number of guests</option>
            {[...Array(101).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-customOrange text-primary p-2 px-4 rounded font-semibold"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
