import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Search, MapPin, Clock, Users } from "lucide-react";

interface SearchingScreenProps {
  onVolunteerFound: () => void;
}

export function SearchingScreen({ onVolunteerFound }: SearchingScreenProps) {
  const [searchStage, setSearchStage] = useState(0);
  
  const searchStages = [
    "Analyzing your location...",
    "Finding nearby volunteers...",
    "Checking volunteer availability...",
    "Connecting to nearest responder..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchStage(prev => {
        if (prev < searchStages.length - 1) {
          return prev + 1;
        } else {
          // Simulate finding a volunteer after all stages
          setTimeout(() => onVolunteerFound(), 1000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onVolunteerFound]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Main Search Animation */}
        <div className="text-center">
          <div className="relative mb-8">
            {/* Pulsing circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-red-100 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-red-200 rounded-full animate-ping opacity-40 animation-delay-150"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-300 rounded-full animate-ping opacity-60 animation-delay-300"></div>
            </div>
            
            {/* Center icon */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl text-red-600 mb-2">Finding nearby volunteer...</h1>
          <p className="text-gray-600 mb-8">Please stay calm while we connect you with help</p>
        </div>

        {/* Search Progress */}
        <Card className="bg-white/90 backdrop-blur-sm p-6">
          <div className="space-y-4">
            {searchStages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 transition-all duration-500 ${
                  index <= searchStage ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                  index < searchStage ? 'bg-green-500' : 
                  index === searchStage ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`} />
                <span className={`text-sm transition-colors duration-500 ${
                  index <= searchStage ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {stage}
                </span>
                {index === searchStage && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Scanning</p>
            <p className="text-xs text-blue-600">2.5 km radius</p>
          </Card>
          
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-xs text-green-600">12 volunteers</p>
          </Card>
          
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm">
            <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Est. Time</p>
            <p className="text-xs text-orange-600">3-5 minutes</p>
          </Card>
        </div>

        {/* Reassurance Message */}
        <Card className="bg-blue-50 border-blue-200 p-4">
          <div className="text-center">
            <p className="text-sm text-blue-800">
              💙 Help is on the way. Stay where you are and keep your phone nearby.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}