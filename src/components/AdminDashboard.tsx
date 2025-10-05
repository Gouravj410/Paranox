import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Phone,
  Eye,
  Activity
} from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

interface Alert {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
  status: "active" | "assigned" | "resolved";
  volunteer?: string;
}

interface Volunteer {
  id: string;
  name: string;
  location: string;
  status: "available" | "busy" | "offline";
  distance: string;
  rating: number;
  certifications: string[];
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [mockAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "John Smith",
      location: "123 Main St, Downtown",
      message: "Chest pain, difficulty breathing",
      timestamp: "2 minutes ago",
      status: "assigned",
      volunteer: "Dr. Sarah Chen"
    },
    {
      id: "2",
      name: "Maria Garcia",
      location: "456 Oak Ave, Westside",
      message: "Fall injury, possible sprain",
      timestamp: "5 minutes ago",
      status: "active"
    },
    {
      id: "3",
      name: "David Wilson",
      location: "789 Pine Rd, Eastside",
      message: "Allergic reaction, swelling",
      timestamp: "15 minutes ago",
      status: "resolved",
      volunteer: "Nurse Mike Johnson"
    }
  ]);

  const [mockVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Dr. Sarah Chen",
      location: "Downtown Medical Center",
      status: "busy",
      distance: "1.2 km",
      rating: 4.9,
      certifications: ["CPR", "First Aid", "EMT"]
    },
    {
      id: "2",
      name: "Nurse Mike Johnson",
      location: "Community Health Clinic",
      status: "available",
      distance: "2.1 km",
      rating: 4.8,
      certifications: ["CPR", "First Aid"]
    },
    {
      id: "3",
      name: "EMT Lisa Brown",
      location: "Fire Station 12",
      status: "available",
      distance: "1.8 km",
      rating: 4.9,
      certifications: ["CPR", "First Aid", "EMT", "Paramedic"]
    },
    {
      id: "4",
      name: "Dr. James Kim",
      location: "University Hospital",
      status: "offline",
      distance: "3.5 km",
      rating: 4.7,
      certifications: ["CPR", "First Aid", "EMT"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-100 text-red-800";
      case "assigned": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <AlertTriangle className="h-4 w-4" />;
      case "assigned": return <Clock className="h-4 w-4" />;
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mr-3 text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl text-blue-600">Admin Dashboard</h1>
              <p className="text-gray-600">ASHA Emergency Response Grid</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl">2</p>
                <p className="text-sm text-gray-600">Active Alerts</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl">3</p>
                <p className="text-sm text-gray-600">Available Volunteers</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl">1</p>
                <p className="text-sm text-gray-600">Resolved Today</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl">3.2m</p>
                <p className="text-sm text-gray-600">Avg Response</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="alerts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-lg mb-4">Emergency Alerts</h3>
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-gray-900">{alert.name}</h4>
                            <Badge className={getStatusColor(alert.status)}>
                              {getStatusIcon(alert.status)}
                              <span className="ml-1 capitalize">{alert.status}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {alert.location}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                          {alert.volunteer && (
                            <p className="text-sm text-blue-600">Assigned to: {alert.volunteer}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-2">{alert.timestamp}</p>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-lg mb-4">Volunteer Network</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900 mb-1">{volunteer.name}</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {volunteer.location} • {volunteer.distance}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(volunteer.status)}>
                              {volunteer.status}
                            </Badge>
                            <span className="text-sm text-gray-600">★ {volunteer.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {volunteer.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-lg mb-4">Live Emergency Response Map</h3>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Interactive Map View</p>
                    <p className="text-sm text-gray-500">
                      Shows real-time locations of alerts and volunteers
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Active Emergencies</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Available Volunteers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}