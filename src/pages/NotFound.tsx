import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCursor } from "@/components/CustomCursor";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <CustomCursor />

      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-primary/20 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-12 h-12 rounded-full bg-primary/15 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="text-center space-y-8 px-4 max-w-md mx-auto">
        {/* Error icon */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="w-full h-full rounded-full bg-gradient-hero p-1 animate-glow-pulse">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Error content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            Oops! The page you're looking for doesn't exist.
            <br />
            Maybe it's been archived by the Student Council.
            <br />
            <span className="text-primary font-medium">Come back later.</span>
          </p>
        </div>

        {/* Action button */}
        <Button
          size="lg"
          className="bg-gradient-hero hover:shadow-ba-glow transition-all duration-300 font-semibold"
          asChild
        >
          <Link to="/">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Blue Archive reference */}
        <p className="text-xs text-muted-foreground font-mono">// Kivotos Academy System Error</p>
      </div>
    </div>
  );
};

export default NotFound;
