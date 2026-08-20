import React, { useState, useEffect, useRef } from "react";
import {
  Navigation,
  ArrowLeft,
  Radio,
  Clock,
  ShieldCheck,
  Zap,
  MapPin,
  Activity,
  Layers,
  Compass,
  CheckCircle2,
  RefreshCw,
  Maximize2,
} from "lucide-react";

interface BusRoute {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  speed: number;
  eta: string;
  status: "On Time" | "Delayed" | "Express";
  lat: number;
  lng: number;
  nextStop: string;
  waypoints: string[];
}

export function BusTrackerView({ onBack }: { onBack: () => void }) {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("route-101");
  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(true);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapInstance = useRef<any>(null);
  const busMarkerRef = useRef<any>(null);

  const routes: BusRoute[] = [
    {
      id: "route-101",
      code: "BUS-101",
      name: "City Center Express",
      origin: "Central Station",
      destination: "Tech Park Terminal",
      speed: 48,
      eta: "4 mins",
      status: "On Time",
      lat: 17.385044,
      lng: 78.486671,
      nextStop: "Cyber Towers Junction",
      waypoints: ["Central Station", "Financial District", "Cyber Towers", "Tech Park"],
    },
    {
      id: "route-204",
      code: "BUS-204",
      name: "Metro Airport Shuttle",
      origin: "Metro Hub",
      destination: "International Terminal 2",
      speed: 62,
      eta: "11 mins",
      status: "Express",
      lat: 17.406498,
      lng: 78.477243,
      nextStop: "Highway Interchange 4",
      waypoints: ["Metro Hub", "Outer Ring Road", "Highway 4", "Terminal 2"],
    },
    {
      id: "route-305",
      code: "BUS-305",
      name: "University Campus Loop",
      origin: "East Gate",
      destination: "Science Block B",
      speed: 32,
      eta: "2 mins",
      status: "On Time",
      lat: 17.398321,
      lng: 78.492102,
      nextStop: "Library Circle",
      waypoints: ["East Gate", "Student Union", "Library Circle", "Science Block B"],
    },
  ];

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Dynamic Live Telemetry simulation
  useEffect(() => {
    if (!isLiveSyncing) return;
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const randomSpeed = Math.floor(activeRoute.speed + (Math.random() * 6 - 3));
      const newLog = `[${timestamp}] TELEMETRY_SYNC: ${activeRoute.code} @ ${randomSpeed} km/h | LAT: ${activeRoute.lat.toFixed(4)} LNG: ${activeRoute.lng.toFixed(4)}`;
      setTelemetryLog((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveSyncing, activeRoute]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Load Leaflet CSS & JS dynamically if not loaded
    const loadLeaflet = async () => {
      if (!(window as any).L) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      const L = (window as any).L;
      if (!L) return;

      if (!leafletMapInstance.current) {
        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([activeRoute.lat, activeRoute.lng], 14);

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          { maxZoom: 19 }
        ).addTo(map);

        leafletMapInstance.current = map;
      } else {
        leafletMapInstance.current.setView([activeRoute.lat, activeRoute.lng], 14);
      }

      // Add/Update custom animated bus marker
      if (busMarkerRef.current) {
        busMarkerRef.current.remove();
      }

      const customIcon = L.divIcon({
        className: "custom-bus-marker",
        html: `
          <div style="position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
            <div style="position:absolute; inset:0; border-radius:50%; background:rgba(168,85,247,0.3); animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="width:36px; height:36px; border-radius:12px; background:linear-gradient(135deg, #a855f7, #3b82f6); border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(168,85,247,0.6); color:white; font-size:16px;">
              📡
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      busMarkerRef.current = L.marker([activeRoute.lat, activeRoute.lng], {
        icon: customIcon,
      })
        .addTo(leafletMapInstance.current)
        .bindPopup(`<b>${activeRoute.code}</b><br/>Next: ${activeRoute.nextStop}`);
    };

    loadLeaflet();
  }, [activeRoute]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white mb-3 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Tools Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/30 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Live GPS Bus Radar & Telemetry
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Sync
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Spatial 3D telemetry tracking, live bus positions, route ETA, and local GPS data feed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveSyncing(!isLiveSyncing)}
            className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${
              isLiveSyncing
                ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10"
                : "bg-slate-900/40 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLiveSyncing ? "animate-spin" : ""}`} />
            {isLiveSyncing ? "Telemetry Live" : "Paused"}
          </button>
        </div>
      </div>

      {/* Main Grid: Spatial Weightless Glassmorphism Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Route Selection & Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Route Selector */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl shadow-purple-950/20">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Active GPS Routes</span>
              <span className="text-[10px] text-purple-400">{routes.length} Active</span>
            </h2>

            <div className="space-y-3">
              {routes.map((route) => {
                const isSelected = route.id === selectedRouteId;
                return (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`group relative rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-purple-500/50 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 shadow-lg shadow-purple-500/10"
                        : "border-white/5 bg-slate-950/40 hover:border-white/20 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm tracking-wide">{route.code}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                          {route.status}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {route.eta}
                      </span>
                    </div>

                    <h3 className="text-xs font-medium text-slate-300 mb-1">{route.name}</h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {route.origin} → {route.destination}
                    </p>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Current Speed</span>
                        <span className="font-bold text-purple-300">{route.speed} km/h</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <span className="text-[10px] uppercase font-medium text-slate-400">Live Speed</span>
              <div className="text-xl font-bold text-white mt-1 flex items-baseline gap-1">
                {activeRoute.speed} <span className="text-xs text-slate-400 font-normal">km/h</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <span className="text-[10px] uppercase font-medium text-slate-400">Signal Accuracy</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">99.8%</div>
            </div>
          </div>

          {/* Station Waypoints */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="h-4 w-4 text-purple-400" />
              Route Stations & Progress
            </h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-indigo-500">
              {activeRoute.waypoints.map((station, index) => (
                <div key={index} className="relative flex items-center justify-between text-xs">
                  <div className="absolute -left-6 h-3 w-3 rounded-full bg-purple-500 border-2 border-slate-950 shadow-md shadow-purple-500/50" />
                  <span className="font-medium text-slate-200">{station}</span>
                  {index === 1 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Next Stop
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Map & Live Terminal (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Spatial Glassmorphic Map Container */}
          <div className="relative rounded-3xl border border-white/15 bg-slate-950 overflow-hidden shadow-2xl shadow-purple-950/40 min-h-[460px] flex flex-col">
            {/* Overlay Banner */}
            <div className="absolute top-4 left-4 z-20 bg-slate-950/80 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="text-xs font-bold text-white">{activeRoute.code} Radar Stream</div>
                <div className="text-[10px] text-slate-400">Target: {activeRoute.nextStop}</div>
              </div>
            </div>

            {/* Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-[460px] z-10" />

            {/* Bottom Floating Telemetry Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/85 border border-white/10 p-3 rounded-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  Lat: {activeRoute.lat.toFixed(4)}
                </span>
                <span className="text-slate-400">Lng: {activeRoute.lng.toFixed(4)}</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
                <ShieldCheck className="h-4 w-4" />
                100% Client-Side Telemetry Memory Engine
              </div>
            </div>
          </div>

          {/* Live Telemetry Terminal Stream */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-5 font-mono text-xs">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-slate-400 flex items-center gap-2 font-sans font-semibold text-xs">
                <Activity className="h-4 w-4 text-purple-400" />
                Live Telemetry Log Stream
              </span>
              <span className="text-[10px] text-slate-500">Auto-scroll Active</span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px]">
              {telemetryLog.length > 0 ? (
                telemetryLog.map((log, i) => (
                  <div key={i} className="text-purple-300/90 leading-relaxed">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic">Initializing GPS telemetry stream...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
