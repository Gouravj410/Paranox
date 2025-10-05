import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, Shield, Users } from "lucide-react";

interface WelcomeScreenProps {
  onStartEmergency: () => void;
  onAdminDashboard: () => void;
}

export function WelcomeScreen({ onStartEmergency, onAdminDashboard }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Icon */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="h-16 w-16 text-red-600" fill="currentColor" />
              <Shield className="h-8 w-8 text-blue-600 absolute -top-1 -right-1" />
            </div>
          </div>
          
          {/* App Name */}
          <h1 className="text-4xl md:text-5xl text-red-600 mb-2">ASHA</h1>
          
          {/* Tagline */}
          <p className="text-lg text-gray-600 mb-8">
            Saving lives in golden minutes
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-red-100">
            <div className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-red-900">Emergency Response</h3>
                <p className="text-sm text-gray-600">Connect instantly with nearby volunteers</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-blue-900">Community Network</h3>
                <p className="text-sm text-gray-600">Trained volunteers ready to help</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onStartEmergency}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            size="lg"
          >
            <Heart className="mr-2 h-5 w-5" />
            Emergency Alert
          </Button>
          
          <Button 
            onClick={onAdminDashboard}
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <Shield className="mr-2 h-5 w-5" />
            Admin Dashboard
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-xs text-gray-500">
            For emergency services, call your local emergency number
          </p>
        </div>
      </div>
    </div>
  );
}