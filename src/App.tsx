import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { EmergencyReportScreen, EmergencyData } from "./components/EmergencyReportScreen";
import { SearchingScreen } from "./components/SearchingScreen";
import { VolunteerFoundScreen } from "./components/VolunteerFoundScreen";
import { ThankYouScreen } from "./components/ThankYouScreen";
import { AdminDashboard } from "./components/AdminDashboard";

type Screen = 
  | "welcome" 
  | "emergency-report" 
  | "searching" 
  | "volunteer-found" 
  | "thank-you" 
  | "admin-dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  const handleEmergencySubmit = (_data: EmergencyData) => {
    setCurrentScreen("searching");
  };

  const slideVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  };

  const fadeVariants = {
    enter: {
      opacity: 0,
      scale: 0.95
    },
    center: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 1.05
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onStartEmergency={() => setCurrentScreen("emergency-report")}
            onAdminDashboard={() => setCurrentScreen("admin-dashboard")}
          />
        );
      case "emergency-report":
        return (
          <EmergencyReportScreen
            onBack={() => setCurrentScreen("welcome")}
            onSubmit={handleEmergencySubmit}
          />
        );
      case "searching":
        return (
          <SearchingScreen
            onVolunteerFound={() => setCurrentScreen("volunteer-found")}
          />
        );
      case "volunteer-found":
        return (
          <VolunteerFoundScreen
            onContactSms={() => setCurrentScreen("thank-you")}
            onBackToSearch={() => setCurrentScreen("searching")}
          />
        );
      case "thank-you":
        return (
          <ThankYouScreen
            onReturnHome={() => setCurrentScreen("welcome")}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboard
            onBack={() => setCurrentScreen("welcome")}
          />
        );
      default:
        return <WelcomeScreen onStartEmergency={() => setCurrentScreen("emergency-report")} onAdminDashboard={() => setCurrentScreen("admin-dashboard")} />;
    }
  };

  // Determine animation type based on screen transition
  const isAdminDashboard = currentScreen === "admin-dashboard";
  const variants = isAdminDashboard ? fadeVariants : slideVariants;
  
  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}