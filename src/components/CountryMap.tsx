/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

interface CountryMapProps {
  countries: { name: string; lat: number; lon: number }[];
  onSelectCountry: (countryName: string) => void;
}

// Fix default marker icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CountryMap = ({ countries, onSelectCountry }: CountryMapProps) => {
  const countriesGeoJson = {
    type: "FeatureCollection",
    features: countries.map((country) => ({
      type: "Feature",
      properties: { name: country.name },
      geometry: {
        type: "Point",
        coordinates: [country.lon, country.lat],
      },
    })),
  };
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountryClick = (e: L.LeafletMouseEvent) => {
    const countryName = e.target.feature.properties.name;
    setSelectedCountry(countryName);
    onSelectCountry(countryName);
  };

  const onEachCountry = (feature: any, layer: L.Layer) => {
    layer.on({
      click: handleCountryClick,
    });
  };

  const getCountryStyle = (feature: any) => ({
    color: selectedCountry === feature.properties.name ? "#ff7800" : "#3388ff",
    weight: selectedCountry === feature.properties.name ? 2 : 1,
    fillOpacity: selectedCountry === feature.properties.name ? 0.4 : 0.2,
  });

  // Default center and zoom
  const defaultCenter = countries.length
    ? [countries[0].lat, countries[0].lon]
    : [20, 0];
  const defaultZoom = countries.length ? 4 : 2;

  return (
    <MapContainer
      center={defaultCenter as L.LatLngExpression}
      zoom={defaultZoom}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countries.map((country, index) => (
        <Marker
          key={`${country.name}-${index}`} // Unique key for each marker
          position={[country.lat, country.lon]}
          eventHandlers={{
            click: () => onSelectCountry(country.name),
          }}
        >
          <Popup>{country.name}</Popup>
        </Marker>
      ))}
      {/* Add GeoJSON layer for country borders */}
      <GeoJSON
        data={countriesGeoJson}
        style={getCountryStyle}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
};

export default CountryMap;
