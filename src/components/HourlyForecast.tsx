import { useRef, useEffect } from "react";
import { Clock, Droplets } from "lucide-react";
import {
  WeatherData,
  getWeatherIcon,
  getFormattedTime,
} from "../utils/weatherUtils";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface HourlyForecastProps {
  weatherData: WeatherData;
  selectedDayIndex: number;
}

const HourlyForecast = ({
  weatherData,
  selectedDayIndex,
}: HourlyForecastProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedHourRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useHorizontalScroll(scrollContainerRef);

  const hourlyData =
    weatherData.forecast.forecastday[selectedDayIndex]?.hour || [];
  const currentHour = new Date().getHours();

  useEffect(() => {
    // Scroll to current hour when component mounts or selectedDayIndex changes
    if (
      scrollContainerRef.current &&
      selectedHourRef.current &&
      selectedDayIndex === 0
    ) {
      const container = scrollContainerRef.current;
      const selectedElement = selectedHourRef.current;

      // Scroll with smooth behavior
      container.scrollTo({
        left:
          selectedElement.offsetLeft -
          container.offsetWidth / 2 +
          selectedElement.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [selectedDayIndex]);

  if (hourlyData.length === 0) {
    return (
      <div className="glass-card p-6 text-center text-sm text-foreground/60">
        Hourly forecast not available for this day
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-foreground/70" />
        <h2 className="text-sm font-medium text-foreground/80">
          Hourly Forecast
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className={`glass-card p-4 overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div className="flex gap-4 min-w-max">
          {hourlyData.map((hour, index) => {
            const time = getFormattedTime(hour.time);
            const temp = Math.round(hour.temp_c);
            const hourOfDay = new Date(hour.time).getHours();
            const isCurrentHour =
              selectedDayIndex === 0 && hourOfDay === currentHour;
            const WeatherIcon = getWeatherIcon(
              hour.condition.code,
              hourOfDay >= 6 && hourOfDay < 18
            );

            return (
              <div
                key={index}
                ref={isCurrentHour ? selectedHourRef : null}
                className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg ${
                  isCurrentHour
                    ? "bg-primary/10 ring-1 ring-primary/30"
                    : "hover:bg-primary/5"
                }`}
              >
                <span className="text-xs font-medium text-foreground/80 mb-2">
                  {time}
                </span>

                <div className="relative mb-2">
                  <WeatherIcon
                    className="w-6 h-6 text-foreground"
                    strokeWidth={1.5}
                  />

                  {hour.chance_of_rain > 0 && (
                    <div className="absolute -bottom-1 -right-1 bg-primary/10 backdrop-blur-sm rounded-full px-1 py-0.5 flex items-center">
                      <Droplets className="w-2 h-2 text-primary" />
                      <span className="text-[0.6rem] font-medium text-primary ml-0.5">
                        {hour.chance_of_rain}%
                      </span>
                    </div>
                  )}
                </div>

                <span
                  className={`text-sm font-medium ${
                    isCurrentHour ? "text-primary" : "text-foreground"
                  }`}
                >
                  {temp}°
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
