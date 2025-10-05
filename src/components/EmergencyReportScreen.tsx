import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, MapPin, Send, AlertTriangle } from "lucide-react";

interface EmergencyReportScreenProps {
  onBack: () => void;
  onSubmit: (data: EmergencyData) => void;
}

export interface EmergencyData {
  name: string;
  location: string;
  message: string;
}

export function EmergencyReportScreen({ onBack, onSubmit }: EmergencyReportScreenProps) {
  const [formData, setFormData] = useState<EmergencyData>({
    name: "",
    location: "",
    message: ""
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationHelpText, setLocationHelpText] = useState("");

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationHelpText("");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding with mock address based on coordinates
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          const mockAddress = `Current Location (${lat}, ${lng})`;
          setFormData(prev => ({ ...prev, location: mockAddress }));
          setLocationHelpText("Location detected successfully");
          setIsLocating(false);
        },
        () => {
          // Silently handle geolocation errors by providing helpful user feedback
          if (!formData.location) {
            setFormData(prev => ({ ...prev, location: "" }));
          }
          setLocationHelpText("Unable to detect location. Please enter manually.");
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setLocationHelpText("Location services not available. Please enter manually.");
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.message) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.name && formData.location && formData.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-3 text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-red-600">Emergency Report</h1>
        </div>

        {/* Alert Banner */}
        <Card className="mb-6 bg-red-50 border-red-200">
          <div className="p-4 flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-red-900">Describe your emergency</h3>
              <p className="text-sm text-red-700">
                Provide clear details to help volunteers assist you quickly
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white"
                required
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your location or address"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-white flex-1"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="px-3"
                >
                  {isLocating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {locationHelpText && (
                <p className={`text-sm ${
                  locationHelpText.includes("successfully") 
                    ? "text-green-600" 
                    : "text-gray-600"
                }`}>
                  {locationHelpText}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">Emergency Details</Label>
              <Textarea
                id="message"
                placeholder="Describe the emergency situation, injuries, or assistance needed..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white min-h-24"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
              size="lg"
              disabled={!isFormValid}
            >
              <Send className="mr-2 h-5 w-5" />
              Send Emergency Alert
            </Button>
          </form>
        </Card>

        {/* Emergency Number Reminder */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            For life-threatening emergencies, call your local emergency services immediately
          </p>
        </div>
      </div>
    </div>
  );
}