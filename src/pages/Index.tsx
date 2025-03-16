import { useState, useEffect } from "react";
import Header from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import WeatherForecast from "../components/WeatherForecast";
import HourlyForecast from "../components/HourlyForecast";
import WeatherMap from "../components/WeatherMap";
import { useWeather } from "../hooks/useWeather";
import { Cloud, CloudLightning, CloudRain, Sun } from "lucide-react";
import { getUserLocation } from "@/utils/geolocation";
import Footer from "../components/Footer"; // Import Footer component

const Index = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const { weatherData, isLoading, error } = useWeather(
    coordinates.lat,
    coordinates.lon
  );

  // Fetch user's current location on first load
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        setCoordinates({ lat: latitude, lon: longitude });
      } catch (error) {
        console.error("Error fetching user's location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  const handleLocationSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
  };

  // Background elements for visual appeal
  const BackgroundElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-20 left-[10%] opacity-10 dark:opacity-5">
        <Sun
          className="w-40 h-40 text-weather-yellow animate-float"
          strokeWidth={1}
        />
      </div>
      <div className="absolute top-40 right-[15%] opacity-10 dark:opacity-5">
        <Cloud
          className="w-28 h-28 text-weather-blue animate-float"
          strokeWidth={1}
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="absolute bottom-[20%] left-[20%] opacity-10 dark:opacity-5">
        <CloudRain
          className="w-24 h-24 text-weather-navy animate-float"
          strokeWidth={1}
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="absolute bottom-[30%] right-[25%] opacity-10 dark:opacity-5">
        <CloudLightning
          className="w-32 h-32 text-weather-purple animate-float"
          strokeWidth={1}
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 dark:from-background dark:to-background">
      <BackgroundElements />

      <div className="container max-w-7xl px-4 py-6">
        <Header onLocationSelect={handleLocationSelect} />

        {isLoading ? (
          <div className="mt-10 glass-card p-8 text-center animate-pulse">
            <div className="text-lg font-medium text-foreground/80">
              Loading weather data...
            </div>
          </div>
        ) : error ? (
          <div className="mt-10 glass-card p-8 text-center">
            <div className="text-lg font-medium text-destructive mb-2">
              Error
            </div>
            <p className="text-foreground/70">
              {error.includes("coordinates")
                ? "Failed to fetch coordinates for the selected location. Please try another city."
                : "Failed to fetch weather data. Please check your internet connection or try again later."}
            </p>
          </div>
        ) : weatherData ? (
          <div className="flex flex-col gap-6 animate-fade-in">
            <CurrentWeather weatherData={weatherData} />

            <WeatherForecast
              weatherData={weatherData}
              onDaySelect={handleDaySelect}
            />

            <HourlyForecast
              weatherData={weatherData}
              selectedDayIndex={selectedDayIndex}
            />

            <WeatherMap weatherData={weatherData} />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
