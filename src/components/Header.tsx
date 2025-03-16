import { Cloud } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchLocation from "./SearchLocation";

interface HeaderProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const Header = ({ onLocationSelect }: HeaderProps) => {
  return (
    <header className="flex z-50 items-center justify-between py-4 px-6 glass-card mb-6">
      <div className="flex items-center gap-2">
        <Cloud className="h-6 w-6 text-primary animate-float" />
        <h1 className="text-xl font-display font-medium text-foreground">
          Weather
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <SearchLocation onLocationSelect={onLocationSelect} />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
