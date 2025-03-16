const OPEN_CAGE_API_KEY = import.meta.env.VITE_OPEN_CAGE_API_KEY as string;

export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export const getCountryByCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].components.country;
    } else {
      throw new Error("No country found for the given coordinates.");
    }
  } catch (error) {
    console.error("Error fetching country by coordinates:", error);
    throw error;
  }
};

export const getPositionFromCity = async (
  city: string
): Promise<{ latitude: number; longitude: number }> => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        city
      )}&key=${OPEN_CAGE_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return {
        latitude: lat,
        longitude: lng,
      };
    } else {
      throw new Error("No position found for the given city.");
    }
  } catch (error) {
    console.error("Error fetching position from city:", error);
    throw error;
  }
};
