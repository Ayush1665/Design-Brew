import { useNavigate } from "react-router-dom";
import { Home, ArrowRight, } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-200 to-amber-200" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">

        {/* Left Image with decorative effects */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">

            {/* Image container */}
            <div className="relative overflow-hidden transition-all duration-500 ">
              <img
                src="/src/assets/error.png"
                alt="404 Error Illustration"
                className="h-auto w-full max-w-[150px] sm:max-w-xs md:max-w-md object-cover"
              />

            </div>

          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left lg:pl-8">

          {/* Main heading */}
          <div className="space-y-2">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                  404
                </span>
              </h1>

            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800">
              Error!
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              The page you're looking for seems to be lost in the digital void.
            </p>
            <p className="hidden md:block text-lg text-gray-600">
              Don't worry, we'll help you find your way back home.
            </p>

          </div>

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-white shadow-lg shadow-orange-300/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-400/50"
            >
              <div className="relative">
                <Home className="h-6 w-6 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 animate-ping rounded-full bg-white/30" />
              </div>
              <span className="text-lg font-bold">Back to Home</span>
              <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;