import { useRef, useState } from "react";
import WeatherCard from "./WeatherCard";
import { WeatherData } from "../utils/weatherUtils";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface WeatherForecastProps {
  weatherData: WeatherData;
  onDaySelect: (index: number) => void;
}

const WeatherForecast = ({
  weatherData,
  onDaySelect,
}: WeatherForecastProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const forecastDays = weatherData.forecast.forecastday;
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useHorizontalScroll(scrollableRef);

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    onDaySelect(index);
  };

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium text-foreground/80 mb-3">
        14-Day Forecast
      </h2>
      <div
        ref={scrollableRef}
        className={`overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div className="flex gap-3 p-2">
          {forecastDays.map((day, index) => (
            <WeatherCard
              key={day.date}
              day={day}
              isSelected={selectedDay === index}
              onClick={() => handleDaySelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
