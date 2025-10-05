import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageSquare, MapPin, Clock, Star, Phone, Shield } from "lucide-react";

interface VolunteerFoundScreenProps {
  onContactSms: () => void;
  onBackToSearch: () => void;
}

export function VolunteerFoundScreen({ onContactSms, onBackToSearch }: VolunteerFoundScreenProps) {
  // Mock volunteer data
  const volunteer = {
    name: "Dr. Sarah Chen",
    distance: "1.2 km away",
    rating: 4.9,
    responseTime: "3-5 minutes",
    certifications: ["CPR Certified", "First Aid", "EMT"],
    completedRescues: 47,
    avatar: "/api/placeholder/100/100"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl text-green-600 mb-2">Volunteer Found!</h1>
          <p className="text-gray-600">A certified responder is ready to help you</p>
        </div>

        {/* Volunteer Card */}
        <Card className="bg-white/95 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {volunteer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-lg text-gray-900 mb-1">{volunteer.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{volunteer.distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span className="text-sm">{volunteer.rating}</span>
                <span className="text-xs text-gray-500">({volunteer.completedRescues} rescues)</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {volunteer.certifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">Estimated arrival</span>
            </div>
            <span className="text-green-600">{volunteer.responseTime}</span>
          </div>

          {/* Contact Button */}
          <Button
            onClick={onContactSms}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            size="lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Contact via SMS
          </Button>
        </Card>

        {/* Additional Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => {
              // Mock phone call functionality
              alert("Connecting you directly to volunteer...");
            }}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Volunteer Directly
          </Button>

          <Button
            variant="ghost"
            className="w-full text-gray-600"
            onClick={onBackToSearch}
          >
            Find Different Volunteer
          </Button>
        </div>

        {/* Safety Notice */}
        <Card className="mt-6 bg-blue-50 border-blue-200 p-4">
          <div className="text-center">
            <p className="text-sm text-blue-800 mb-2">
              🛡️ All volunteers are verified and background-checked
            </p>
            <p className="text-xs text-blue-600">
              Your safety is our priority. Emergency services have been notified.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}