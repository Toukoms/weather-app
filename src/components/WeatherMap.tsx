import { useState } from "react";
import { Map, Layers } from "lucide-react";
import { WeatherData } from "../utils/weatherUtils";
import CountryMap from "./CountryMap";

interface WeatherMapProps {
  weatherData: WeatherData;
}

const WeatherMap = ({ weatherData }: WeatherMapProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`glass-card relative overflow-hidden transition-all duration-300 ease-out 
      ${isExpanded ? "h-[500px]" : "h-[300px]"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-weather-blue-light/20 to-weather-blue/30 dark:from-weather-navy/30 dark:to-weather-navy-dark/40 -z-10" />

      <div className="absolute inset-0">
        <CountryMap
          countries={[
            {
              name: weatherData.location.name,
              lat: weatherData.location.lat,
              lon: weatherData.location.lon,
            },
          ]}
          onSelectCountry={(countryName) => {
            console.log(`Selected country: ${countryName}`);
          }}
        />
      </div>

      <div className="absolute top-2 right-2 flex gap-2 z-[1000]">
        <button
          onClick={toggleExpand}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground hover:bg-background/90 transition-colors duration-200"
          aria-label={isExpanded ? "Collapse map" : "Expand map"}
        >
          <Map className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-foreground/80">
        {weatherData.location.name}, {weatherData.location.country}
      </div>
    </div>
  );
};

export default WeatherMap;
