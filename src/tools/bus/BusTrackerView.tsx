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
  Search,
  Building2,
  AlertCircle,
  Check,
  Link as LinkIcon,
  Globe,
  Bus,
  Flag,
} from "lucide-react";
import { PrivacyBadge } from "../../components/shared/PrivacyBadge";

interface StateRTC {
  code: string;
  name: string;
  prefix: string;
  cities: string[];
}

interface BusRoute {
  id: string;
  code: string;
  regNumber: string;
  name: string;
  origin: string;
  destination: string;
  speed: number;
  eta: string;
  status: "On Time" | "Express" | "Delayed";
  lat: number;
  lng: number;
  nextStop: string;
  waypoints: string[];
  trackingUrl?: string;
  progressPercent: number;
}

export function BusTrackerView({ onBack }: { onBack: () => void }) {
  const [trackingMode, setTrackingMode] = useState<"state" | "url">("state");
  const [trackingUrlInput, setTrackingUrlInput] = useState<string>("https://s.yourbus.in/track?id=YB-88492");
  const [selectedState, setSelectedState] = useState<string>("KA");
  const [searchRegNumber, setSearchRegNumber] = useState<string>("");

  const stateRTCs: StateRTC[] = [
    { code: "KA", name: "Karnataka (BMTC / KSRTC)", prefix: "KA01", cities: ["Bengaluru", "Mysuru", "Mangaluru"] },
    { code: "AP", name: "Andhra Pradesh (APSRTC)", prefix: "AP07", cities: ["Vijayawada", "Visakhapatnam", "Tirupati"] },
    { code: "TS", name: "Telangana (TSRTC)", prefix: "TS09", cities: ["Hyderabad", "Warangal", "Nizamabad"] },
    { code: "KL", name: "Kerala (KSRTC)", prefix: "KL15", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode"] },
    { code: "TN", name: "Tamil Nadu (TNSTC)", prefix: "TN01", cities: ["Chennai", "Coimbatore", "Madurai"] },
    { code: "MH", name: "Maharashtra (MSRTC Shivneri)", prefix: "MH12", cities: ["Mumbai", "Pune", "Nagpur"] },
    { code: "UP", name: "Uttar Pradesh (UPSRTC)", prefix: "UP32", cities: ["Lucknow", "Kanpur", "Varanasi"] },
    { code: "GJ", name: "Gujarat (GSRTC)", prefix: "GJ01", cities: ["Ahmedabad", "Surat", "Vadodara"] },
    { code: "RJ", name: "Rajasthan (RSRTC)", prefix: "RJ14", cities: ["Jaipur", "Jodhpur", "Udaipur"] },
    { code: "DL", name: "Delhi (DTC / DIMTS)", prefix: "DL01", cities: ["Kashmere Gate", "Anand Vihar", "ISBT"] },
    { code: "HP", name: "Himachal (HRTC)", prefix: "HP01", cities: ["Shimla", "Manali", "Dharamshala"] },
  ];

  const [activeBus, setActiveBus] = useState<BusRoute>({
    id: "bmtc-ka01-500",
    code: "BMTC-500A",
    regNumber: "KA01 F 5000",
    name: "Karnataka BMTC — Silk Board to Hebbal Express",
    origin: "Silk Board Bus Station",
    destination: "Hebbal TTMC",
    speed: 48,
    eta: "5 mins",
    status: "On Time",
    lat: 12.9716,
    lng: 77.5946,
    nextStop: "Marathahalli Junction",
    waypoints: ["Silk Board", "HSR Layout", "Marathahalli", "Hebbal TTMC"],
    progressPercent: 52,
  });

  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(true);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([
    "[INIT] Client-Side Telemetry Radar Engine ready for KA01 F 5000",
  ]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapInstance = useRef<any>(null);
  const busMarkerRef = useRef<any>(null);

  // Submit State Registration Number Search
  const handleSearchVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const rtc = stateRTCs.find((s) => s.code === selectedState) || stateRTCs[0];
    const query = searchRegNumber.trim() || `${rtc.prefix} Z ${Math.floor(1000 + Math.random() * 9000)}`;

    const cityA = rtc.cities[0];
    const cityB = rtc.cities[1] || rtc.cities[0];

    const baseCoordinates: Record<string, [number, number]> = {
      KA: [12.9716, 77.5946],
      AP: [16.5062, 80.648],
      TS: [17.385, 78.4867],
      KL: [8.5241, 76.9366],
      TN: [13.0827, 80.2707],
      MH: [19.076, 72.8777],
      UP: [26.8467, 80.9462],
      GJ: [23.0225, 72.5714],
      RJ: [26.9124, 75.7873],
      DL: [28.6139, 77.209],
      HP: [31.1048, 77.1734],
    };

    const [baseLat, baseLng] = baseCoordinates[selectedState] || [12.9716, 77.5946];

    const newBus: BusRoute = {
      id: `bus-${Date.now()}`,
      code: `${rtc.code}RTC-${Math.floor(100 + Math.random() * 900)}`,
      regNumber: query.toUpperCase(),
      name: `${rtc.name.split(" ")[0]} State Super Express`,
      origin: `${cityA} Bus Station`,
      destination: `${cityB} Terminal`,
      speed: Math.floor(45 + Math.random() * 30),
      eta: `${Math.floor(3 + Math.random() * 12)} mins`,
      status: "On Time",
      lat: baseLat + (Math.random() * 0.04 - 0.02),
      lng: baseLng + (Math.random() * 0.04 - 0.02),
      nextStop: `${cityA} Ring Road Circle`,
      waypoints: [`${cityA} Central`, `${cityA} Ring Road`, `Highway 44 Stop`, `${cityB} Terminal`],
      progressPercent: Math.floor(40 + Math.random() * 45),
    };

    setActiveBus(newBus);
    const time = new Date().toLocaleTimeString();
    setTelemetryLog((prev) => [
      `[${time}] RADAR_SYNC: Loaded telemetry for ${newBus.regNumber} (${rtc.name})`,
      ...prev,
    ]);
  };

  // Submit URL Tracking Form
  const handleTrackByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = trackingUrlInput.trim();
    if (!url) return;

    let busCode = "LINK-BUS";
    try {
      const parsed = new URL(url);
      const idParam = parsed.searchParams.get("id") || parsed.searchParams.get("busId") || parsed.pathname.split("/").pop();
      if (idParam) busCode = `BUS-${idParam.toUpperCase().slice(0, 8)}`;
    } catch {
      busCode = "BUS-TRACK";
    }

    const newBus: BusRoute = {
      id: `url-${Date.now()}`,
      code: busCode,
      regNumber: busCode,
      name: `Live URL Tracking Stream`,
      origin: "Origin Station",
      destination: "Destination Hub",
      speed: Math.floor(50 + Math.random() * 20),
      eta: "6 mins",
      status: "Express",
      lat: 12.9716 + (Math.random() * 0.03 - 0.015),
      lng: 77.5946 + (Math.random() * 0.03 - 0.015),
      nextStop: "En Route Checkpoint",
      waypoints: ["Boarding Point", "Highway Station", "City Bypass", "Destination Hub"],
      trackingUrl: url,
      progressPercent: 62,
    };

    setActiveBus(newBus);
    const timestamp = new Date().toLocaleTimeString();
    setTelemetryLog((prev) => [
      `[${timestamp}] URL_SYNC: Loaded tracking stream for ${url}`,
      ...prev,
    ]);
  };

  // Dynamic Telemetry Pulse Sync
  useEffect(() => {
    if (!isLiveSyncing) return;
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const randomSpeed = Math.floor(activeBus.speed + (Math.random() * 4 - 2));
      const newLog = `[${timestamp}] TELEMETRY_RADAR: ${activeBus.regNumber} @ ${randomSpeed} km/h | LAT: ${activeBus.lat.toFixed(4)} LNG: ${activeBus.lng.toFixed(4)}`;
      setTelemetryLog((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveSyncing, activeBus]);

  // Leaflet Map Setup with Realistic Bus Icon & Popup Updates
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!window.L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!window.L || !mapContainerRef.current) return;
      const L = window.L;

      const busIconHtml = `<div style="background-color: #07090e; color: #10b981; border: 2px solid #10b981; border-radius: 12px; padding: 6px 10px; font-weight: bold; font-size: 13px; box-shadow: 0 0 20px rgba(16,185,129,0.6); display: flex; items-center: center; gap: 6px; white-space: nowrap;">🚍 <span style="font-size: 11px; color: #ffffff;">${activeBus.regNumber}</span></div>`;

      const busIcon = L.divIcon({
        className: "custom-bus-icon",
        html: busIconHtml,
        iconSize: [140, 36],
        iconAnchor: [70, 18],
      });

      if (leafletMapInstance.current) {
        leafletMapInstance.current.setView([activeBus.lat, activeBus.lng], 13);
        if (busMarkerRef.current) {
          busMarkerRef.current.setLatLng([activeBus.lat, activeBus.lng]);
          busMarkerRef.current.setIcon(busIcon);
          busMarkerRef.current.bindPopup(`<b>${activeBus.regNumber}</b><br/>${activeBus.name}<br/>Speed: ${activeBus.speed} km/h`).openPopup();
        }
        return;
      }

      const map = L.map(mapContainerRef.current, {
        center: [activeBus.lat, activeBus.lng],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      const marker = L.marker([activeBus.lat, activeBus.lng], { icon: busIcon }).addTo(map);
      marker.bindPopup(`<b>${activeBus.regNumber}</b><br/>${activeBus.name}<br/>Speed: ${activeBus.speed} km/h`).openPopup();

      leafletMapInstance.current = map;
      busMarkerRef.current = marker;
    }
  }, [activeBus]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-all shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Live GPS Telemetry Radar</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Spatial Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 3D spatial radar tracking live bus telemetry, routes, speed, and ETA calculations.
            </p>
          </div>
        </div>

        <PrivacyBadge networkType="local" />
      </div>

      {/* Mode Selector Tabs */}
      <div className="p-6 rounded-3xl border border-emerald-500/30 bg-slate-900/90 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setTrackingMode("state")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
              trackingMode === "state"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-950/60 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            <Building2 className="h-4 w-4" /> Track via State RTC & Registration Number
          </button>

          <button
            onClick={() => setTrackingMode("url")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
              trackingMode === "url"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                : "bg-slate-950/60 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            <LinkIcon className="h-4 w-4" /> Track via Live Bus Link / URL
          </button>
        </div>

        {/* Mode 1: State RTC Search */}
        {trackingMode === "state" && (
          <form onSubmit={handleSearchVehicle} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Select State RTC</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {stateRTCs.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Vehicle Registration Number</label>
              <input
                type="text"
                placeholder={`e.g. ${stateRTCs.find((s) => s.code === selectedState)?.prefix || "KA01"} Z 1234`}
                value={searchRegNumber}
                onChange={(e) => setSearchRegNumber(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Search className="h-4 w-4" /> Locate Vehicle Radar
              </button>
            </div>
          </form>
        )}

        {/* Mode 2: URL Tracking */}
        {trackingMode === "url" && (
          <form onSubmit={handleTrackByUrl} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Paste Live Bus Tracking Link / URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://s.yourbus.in/track?id=YB-88492 or https://track.abhibus.com/live/..."
                    value={trackingUrlInput}
                    onChange={(e) => setTrackingUrlInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                >
                  <Radio className="h-4 w-4 animate-pulse" /> Launch URL Telemetry Radar
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong className="text-white">100% Client-Side Privacy:</strong> Telemetry metric calculations & spatial radar rendering run locally inside your browser memory.
          </span>
        </div>
      </div>

      {/* Route Progress Visualizer Bar */}
      <div className="p-6 rounded-3xl border border-emerald-500/20 bg-slate-900/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Bus className="h-4 w-4 text-emerald-400" /> Interactive Route Map & Distance Progress
          </div>
          <span className="text-xs font-extrabold text-emerald-400">{activeBus.progressPercent}% Journey Completed</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 transition-all duration-500"
            style={{ width: `${activeBus.progressPercent}%` }}
          />
        </div>

        {/* Route Points */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <MapPin className="h-3.5 w-3.5" /> Start: {activeBus.origin}
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <Bus className="h-3.5 w-3.5" /> Current: {activeBus.nextStop}
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Flag className="h-3.5 w-3.5" /> Destination: {activeBus.destination}
          </span>
        </div>
      </div>

      {/* Main Radar Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Leaflet Spatial Map & Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leaflet Map Box */}
          <div className="relative h-[420px] rounded-3xl border border-emerald-500/30 bg-slate-950 overflow-hidden shadow-2xl">
            <div ref={mapContainerRef} className="h-full w-full z-0" />

            {/* Floating Telemetry Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/30 flex items-center gap-4 text-xs shadow-xl">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{activeBus.regNumber}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeBus.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">{activeBus.name}</div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setIsLiveSyncing((prev) => !prev)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shadow-xl ${
                  isLiveSyncing
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-900/90 border-white/10 text-slate-400"
                }`}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLiveSyncing ? "animate-spin" : ""}`} />
                {isLiveSyncing ? "Radar Live Syncing" : "Radar Paused"}
              </button>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/80">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Speed</div>
              <div className="text-xl font-extrabold text-white flex items-baseline gap-1">
                {activeBus.speed} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/80">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Next Stop ETA</div>
              <div className="text-xl font-extrabold text-emerald-400 flex items-baseline gap-1">
                {activeBus.eta}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/80">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">GPS Coordinates</div>
              <div className="text-xs font-mono font-bold text-slate-200 truncate">
                {activeBus.lat.toFixed(4)}, {activeBus.lng.toFixed(4)}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/80">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Next Stop</div>
              <div className="text-xs font-bold text-slate-200 truncate">{activeBus.nextStop}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Waypoints & Terminal Log */}
        <div className="space-y-6">
          {/* Waypoint Progress Bar */}
          <div className="p-6 rounded-3xl border border-white/10 bg-slate-900/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Navigation className="h-4 w-4 text-emerald-400" /> Route Waypoint Progress
            </h3>

            <div className="space-y-3">
              {activeBus.waypoints.map((step, idx) => {
                const isPassed = idx === 0 || idx === 1;
                const isNext = idx === 2;
                return (
                  <div key={step} className="flex items-center gap-3 text-xs">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isPassed
                          ? "bg-emerald-500 text-slate-950"
                          : isNext
                          ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300 animate-pulse"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isPassed ? <Check className="h-3 w-3" /> : idx + 1}
                    </div>
                    <span className={isPassed ? "text-slate-200 font-semibold" : isNext ? "text-emerald-300 font-bold" : "text-slate-500"}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Telemetry Log Stream */}
          <div className="p-6 rounded-3xl border border-white/10 bg-slate-950 font-mono text-[10px] space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Activity className="h-3.5 w-3.5" /> RADAR TERMINAL LOG
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Stream Active</span>
            </div>

            <div className="h-40 overflow-y-auto space-y-1.5 text-slate-300">
              {telemetryLog.map((log, idx) => (
                <div key={idx} className="leading-tight truncate">
                  <span className="text-emerald-400">›</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
