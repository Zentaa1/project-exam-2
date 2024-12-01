import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venues?q=${searchQuery.trim()}`);
    }
  };

  return (
    <div className="text-primary">
      <h2 className="text-2xl font-bold text-left mb-4">Search for Venues</h2>
      <form className="flex gap-4 justify-start" onSubmit={handleSearchSubmit}>
        <div className="w-full">
          <label htmlFor="searchInput" className="sr-only">
            Search for venue
          </label>
          <input
            type="text"
            id="searchInput"
            className="py-2 px-4 rounded w-full text-primary outline"
            placeholder="Search for venue..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
