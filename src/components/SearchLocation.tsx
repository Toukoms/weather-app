import { useState, useRef, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import {
  getUserLocation,
  getCountryByCoordinates,
  getPositionFromCity,
} from "../utils/geolocation";

interface SearchLocationProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const SearchLocation = ({ onLocationSelect }: SearchLocationProps) => {
  const [searchLocations, setSearchLocations] = useState<
    { name: string; country: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<
    { name: string; country: string }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();
        const locations = data.data.flatMap(
          (country: { country: string; cities: string[] }) =>
            country.cities.map((city: string) => ({
              name: city,
              country: country.country,
            }))
        );
        setSearchLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        const userCountry = await getCountryByCoordinates(latitude, longitude);

        const countryCities =
          searchLocations?.filter(
            (location) => location.country === userCountry
          ) || [];
        setFilteredLocations(countryCities.slice(0, 5)); // Default to the first 5 cities in the user's country
      } catch (geoError) {
        console.error("Error getting user location:", geoError);
      }
    };

    if (searchQuery) {
      setFilteredLocations(
        searchLocations
          .filter(
            (location) =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.country.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5) // Limit to the first 5 matching cities
      );
    } else {
      if (searchLocations?.length) {
        fetchUserLocation();
      }
    }
  }, [searchQuery, searchLocations]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOpenSearch = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSelectLocation = async (locationName: string) => {
    try {
      const { latitude, longitude } = await getPositionFromCity(locationName);
      onLocationSelect(latitude, longitude);
    } catch (error) {
      console.error("Error fetching position for selected city:", error);
    }
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative z-[9999]">
      {!isOpen ? (
        <button
          onClick={handleOpenSearch}
          className="glass-card z-[9999] flex items-center gap-2 py-2 px-3 text-sm text-foreground/80 hover:text-foreground active:scale-95 transition-all duration-200 ease-out"
          aria-label="Search for a location"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search location</span>
        </button>
      ) : (
        <div className="animate-scale-in origin-top z-[9999]">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="w-full bg-background/80 backdrop-blur-sm border border-border rounded-t-xl py-2 px-3 pr-10 outline-none focus:ring-1 focus:ring-primary/40 text-sm"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              {searchQuery ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="absolute w-full z-[9999] mt-[1px] max-h-[280px] overflow-y-auto bg-background/95 backdrop-blur-lg border border-border border-t-0 rounded-b-xl shadow-glass-sm">
            {filteredLocations.length > 0 ? (
              <ul className="py-1">
                {filteredLocations.map((location, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-primary/5 flex items-center gap-2 text-sm transition-colors duration-150"
                      onClick={() => handleSelectLocation(location.name)}
                    >
                      <MapPin className="h-3.5 w-3.5 text-primary/70" />
                      <div>
                        <span className="font-medium">{location.name}</span>
                        <span className="text-xs text-foreground/60 ml-1">
                          {location.country}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-center text-sm text-foreground/60">
                No locations found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
