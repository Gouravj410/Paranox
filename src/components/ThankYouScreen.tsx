import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Heart, Phone, Home, Star } from "lucide-react";

interface ThankYouScreenProps {
  onReturnHome: () => void;
}

export function ThankYouScreen({ onReturnHome }: ThankYouScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Heart className="h-8 w-8 text-red-500 animate-pulse" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-2xl text-green-600 mb-4">Help is on the way!</h1>
          <p className="text-lg text-gray-700 mb-2">Stay calm and follow instructions</p>
          <p className="text-sm text-gray-600">
            Your volunteer will arrive shortly with first aid assistance
          </p>
        </div>

        {/* Instructions Card */}
        <Card className="bg-white/95 backdrop-blur-sm p-6">
          <h3 className="text-green-600 mb-4 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            What to do now:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Stay in your current location</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Keep your phone nearby and charged</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Follow any first aid instructions given</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Remain calm and breathe steadily</p>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 mb-1">Emergency Services</p>
              <p className="text-sm text-red-600">If situation worsens, call immediately</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => {
                // Mock emergency call
                alert("Connecting to emergency services...");
              }}
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Volunteer Update */}
        <Card className="bg-blue-50 border-blue-200 p-4">
          <div className="text-center">
            <p className="text-blue-800 mb-2">📱 Dr. Sarah Chen is en route</p>
            <p className="text-sm text-blue-600">ETA: 3-5 minutes • Distance: 1.2 km</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              // Mock rating functionality
              alert("Thank you for your feedback! This helps us improve our service.");
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Rate Your Experience
          </Button>

          <Button
            onClick={onReturnHome}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            💙 Thank you for using ASHA. We're here when you need us.
          </p>
        </div>
      </div>
    </div>
  );
}