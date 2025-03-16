import { useState, useEffect } from "react";
import { Wind, Droplets, Thermometer, Sun, Moon, MapPin } from "lucide-react";
import {
  WeatherData,
  getWeatherIcon,
  getLocationTime,
  getLocationDate,
} from "../utils/weatherUtils";

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const CurrentWeather = ({ weatherData }: CurrentWeatherProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { location, current } = weatherData;
  const WeatherIcon = getWeatherIcon(
    current.condition.code,
    current.is_day === 1
  );
  const temperature = Math.round(current.temp_c);
  const feelsLike = Math.round(current.feelslike_c);
  const humidity = current.humidity;
  const windSpeed = Math.round(current.wind_kph);
  const windDirection = current.wind_dir;
  const locationTime = getLocationTime(location.localtime);
  const locationDate = getLocationDate(location.localtime);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-1 flex items-center gap-1 text-sm text-foreground/80">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {location.name}, {location.country}
          </span>
        </div>
        <div className="text-xs text-foreground/60">
          {locationDate} · {locationTime}
        </div>
      </div>

      <div className="relative glass-card p-8 overflow-hidden">
        {/* Background gradient based on weather */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-50" />

        <div className="flex flex-col items-center">
          <div className="mb-4 relative">
            <div className="absolute inset-0 blur-3xl bg-primary/10 -z-10 rounded-full" />
            <WeatherIcon
              className="w-24 h-24 text-foreground animate-float"
              strokeWidth={1.5}
            />
          </div>

          <div className="text-4xl font-display font-medium text-foreground mb-2">
            {temperature}°
          </div>

          <div className="text-sm text-foreground/80 mb-6">
            {current.condition.text}
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-md">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                <Thermometer className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs text-foreground/60">Feels Like</div>
              <div className="text-sm font-medium">{feelsLike}°</div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                <Wind className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs text-foreground/60">Wind</div>
              <div className="text-sm font-medium">
                {windSpeed} km/h {windDirection}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                <Droplets className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs text-foreground/60">Humidity</div>
              <div className="text-sm font-medium">{humidity}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
