import { useState, useEffect } from "react";
import { WeatherData } from "../utils/weatherUtils";

export const useWeather = (
  latitude: number | null,
  longitude: number | null
) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setError("Coordinates not provided");
      setIsLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Replace with your public weather API key
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=14&aqi=no&alerts=no`
        );
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setIsLoading(false);
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, isLoading, error };
};
