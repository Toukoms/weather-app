
import { Cloud, CloudDrizzle, CloudLightning, CloudFog, CloudRain, CloudSnow, Sun, Moon, Droplets } from 'lucide-react';
import { ForecastDay, getWeatherIcon, getFormattedDate } from '../utils/weatherUtils';

interface WeatherCardProps {
  day: ForecastDay;
  isSelected?: boolean;
  onClick?: () => void;
}

const WeatherCard = ({ day, isSelected = false, onClick }: WeatherCardProps) => {
  const WeatherIcon = getWeatherIcon(day.day.condition.code, true);
  const formattedDate = getFormattedDate(day.date);
  const maxTemp = Math.round(day.day.maxtemp_c);
  const minTemp = Math.round(day.day.mintemp_c);
  const chanceOfRain = day.day.daily_chance_of_rain;
  
  return (
    <button
      onClick={onClick}
      className={`glass-card min-w-[120px] px-4 py-4 flex flex-col items-center justify-between gap-2 hover:scale-[1.02] active:scale-[0.98] ${
        isSelected ? 'ring-1 ring-primary' : ''
      }`}
    >
      <div className="text-sm font-medium text-foreground/90">{formattedDate}</div>
      
      <div className="my-2 relative">
        <WeatherIcon 
          className="w-8 h-8 text-foreground" 
          strokeWidth={1.5} 
        />
        
        {chanceOfRain > 0 && (
          <div className="absolute -bottom-1 -right-2 bg-primary/10 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
            <Droplets className="w-3 h-3 text-primary" />
            <span className="text-[0.65rem] font-medium text-primary">{chanceOfRain}%</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between w-full">
        <div className="text-sm font-semibold text-foreground">{maxTemp}°</div>
        <div className="text-sm text-foreground/60">{minTemp}°</div>
      </div>
    </button>
  );
};

export default WeatherCard;
