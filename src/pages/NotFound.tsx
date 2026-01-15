import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-h1-mobile md:text-h1 font-bold">404</h1>
        <p className="mb-4 text-body-mobile md:text-body text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-accent underline hover:text-accent/80">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
