
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon, Wind } from 'lucide-react';

export type WeatherCondition = 
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'rain'
  | 'showers'
  | 'thunderstorm'
  | 'snow'
  | 'sleet'
  | 'fog'
  | 'wind';

export interface WeatherData {
  location: {
    name: string;
    region?: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
    is_day: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          code: number;
        };
        daily_chance_of_rain: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          code: number;
        };
        chance_of_rain: number;
      }>;
    }>;
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      code: number;
    };
    daily_chance_of_rain: number;
  };
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    code: number;
  };
  chance_of_rain: number;
}

// Map the weather condition codes to icons
export const getWeatherIcon = (code: number, isDay: boolean = true) => {
  // Clear
  if (code === 1000) {
    return isDay ? Sun : Moon;
  }
  
  // Partly cloudy
  if (code === 1003) {
    return Cloud;
  }
  
  // Cloudy / Overcast
  if (code === 1006 || code === 1009) {
    return Cloud;
  }
  
  // Mist / Fog / Freezing fog
  if (code === 1030 || code === 1135 || code === 1147) {
    return CloudFog;
  }
  
  // Rain / Drizzle
  if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) {
    return CloudRain;
  }
  
  // Snow
  if ([1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
    return CloudSnow;
  }
  
  // Sleet
  if ([1204, 1207, 1249, 1252].includes(code)) {
    return CloudSnow;
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return CloudLightning;
  }
  
  // Default
  return Cloud;
};

export const getWeatherColor = (code: number, isDay: boolean = true): string => {
  // Clear day/night
  if (code === 1000) {
    return isDay ? 'from-weather-blue to-weather-blue-light' : 'from-weather-navy-dark to-weather-purple-dark';
  }
  
  // Partly cloudy
  if (code === 1003) {
    return isDay ? 'from-weather-blue-light to-weather-gray-lighter' : 'from-weather-navy to-weather-gray-darkest';
  }
  
  // Cloudy / Overcast
  if (code === 1006 || code === 1009) {
    return 'from-weather-gray-light to-weather-gray-dark';
  }
  
  // Mist / Fog / Freezing fog
  if (code === 1030 || code === 1135 || code === 1147) {
    return 'from-weather-gray-light to-weather-gray-dark';
  }
  
  // Rain / Drizzle
  if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) {
    return 'from-weather-blue-dark to-weather-gray-dark';
  }
  
  // Snow
  if ([1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
    return 'from-weather-gray-lightest to-weather-gray-light';
  }
  
  // Sleet
  if ([1204, 1207, 1249, 1252].includes(code)) {
    return 'from-weather-gray-lighter to-weather-blue-light';
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return 'from-weather-gray-darker to-weather-gray-darkest';
  }
  
  // Default
  return 'from-weather-blue to-weather-gray-light';
};

export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const getFormattedTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

export const getLocationTime = (locationTime: string): string => {
  const date = new Date(locationTime);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

export const getLocationDate = (locationTime: string): string => {
  const date = new Date(locationTime);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

export const mockWeatherData: WeatherData = {
  location: {
    name: "San Francisco",
    country: "United States",
    lat: 37.77,
    lon: -122.42,
    localtime: "2023-09-23 10:30"
  },
  current: {
    temp_c: 18,
    temp_f: 64.4,
    condition: {
      text: "Partly Cloudy",
      code: 1003
    },
    wind_kph: 15,
    wind_dir: "W",
    humidity: 65,
    feelslike_c: 17.5,
    feelslike_f: 63.5,
    uv: 4,
    is_day: 1
  },
  forecast: {
    forecastday: [
      {
        date: "2023-09-23",
        day: {
          maxtemp_c: 21,
          maxtemp_f: 69.8,
          mintemp_c: 14,
          mintemp_f: 57.2,
          avgtemp_c: 17.5,
          avgtemp_f: 63.5,
          condition: {
            text: "Partly Cloudy",
            code: 1003
          },
          daily_chance_of_rain: 0
        },
        hour: Array(24).fill(0).map((_, i) => ({
          time: `2023-09-23 ${i.toString().padStart(2, '0')}:00`,
          temp_c: 14 + (i > 6 && i < 18 ? 7 * Math.sin(((i - 6) / 11) * Math.PI) : 0),
          temp_f: 57.2 + (i > 6 && i < 18 ? 12.6 * Math.sin(((i - 6) / 11) * Math.PI) : 0),
          condition: {
            text: i > 6 && i < 18 ? "Partly Cloudy" : "Clear",
            code: i > 6 && i < 18 ? 1003 : 1000
          },
          chance_of_rain: 0
        }))
      },
      {
        date: "2023-09-24",
        day: {
          maxtemp_c: 22,
          maxtemp_f: 71.6,
          mintemp_c: 15,
          mintemp_f: 59,
          avgtemp_c: 18.5,
          avgtemp_f: 65.3,
          condition: {
            text: "Sunny",
            code: 1000
          },
          daily_chance_of_rain: 0
        },
        hour: Array(24).fill(0).map((_, i) => ({
          time: `2023-09-24 ${i.toString().padStart(2, '0')}:00`,
          temp_c: 15 + (i > 6 && i < 18 ? 7 * Math.sin(((i - 6) / 11) * Math.PI) : 0),
          temp_f: 59 + (i > 6 && i < 18 ? 12.6 * Math.sin(((i - 6) / 11) * Math.PI) : 0),
          condition: {
            text: "Sunny",
            code: 1000
          },
          chance_of_rain: 0
        }))
      },
      {
        date: "2023-09-25",
        day: {
          maxtemp_c: 23,
          maxtemp_f: 73.4,
          mintemp_c: 16,
          mintemp_f: 60.8,
          avgtemp_c: 19.5,
          avgtemp_f: 67.1,
          condition: {
            text: "Sunny",
            code: 1000
          },
          daily_chance_of_rain: 0
        },
        hour: []
      },
      {
        date: "2023-09-26",
        day: {
          maxtemp_c: 22,
          maxtemp_f: 71.6,
          mintemp_c: 16,
          mintemp_f: 60.8,
          avgtemp_c: 19,
          avgtemp_f: 66.2,
          condition: {
            text: "Partly Cloudy",
            code: 1003
          },
          daily_chance_of_rain: 10
        },
        hour: []
      },
      {
        date: "2023-09-27",
        day: {
          maxtemp_c: 20,
          maxtemp_f: 68,
          mintemp_c: 15,
          mintemp_f: 59,
          avgtemp_c: 17.5,
          avgtemp_f: 63.5,
          condition: {
            text: "Cloudy",
            code: 1006
          },
          daily_chance_of_rain: 20
        },
        hour: []
      },
      {
        date: "2023-09-28",
        day: {
          maxtemp_c: 19,
          maxtemp_f: 66.2,
          mintemp_c: 14,
          mintemp_f: 57.2,
          avgtemp_c: 16.5,
          avgtemp_f: 61.7,
          condition: {
            text: "Light Rain",
            code: 1183
          },
          daily_chance_of_rain: 60
        },
        hour: []
      },
      {
        date: "2023-09-29",
        day: {
          maxtemp_c: 18,
          maxtemp_f: 64.4,
          mintemp_c: 13,
          mintemp_f: 55.4,
          avgtemp_c: 15.5,
          avgtemp_f: 59.9,
          condition: {
            text: "Light Rain",
            code: 1183
          },
          daily_chance_of_rain: 70
        },
        hour: []
      }
    ]
  }
};
