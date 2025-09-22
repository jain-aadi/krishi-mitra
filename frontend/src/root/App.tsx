import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { AppChrome } from "@/components/app-chrome";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import HomeLanding from "@/app/page";
import HomePage from "@/app/home/page";
import ChatPage from "@/app/chat/page";
import CropsPage from "@/app/crops/page";
import SoilPropertiesPage from "@/app/soil-properties/page";
import WeatherPage from "@/app/weather/page";

export function App() {
  return (
    <div>
      <AppChrome>
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/crops" element={<CropsPage />} />
          <Route path="/soil-properties" element={<SoilPropertiesPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppChrome>
      <ServiceWorkerRegistration />
    </div>
  );
}

export default App;


