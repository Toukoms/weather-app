const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full py-4 text-center text-sm text-foreground/70">
      <p className="flex items-center gap-2">
        <span>
          ©️ 2025 - Designed by{" "}
          <a
            target="_blank"
            href="https://github.com/toukoms"
            className="text-primary hover:underline"
          >
            Tokiniaina
          </a>
        </span>

        <span>
          | Source code on{" "}
          <a
            target="_blank"
            href="https://github.com/toukoms/weather-app"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
