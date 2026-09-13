import React, { useState, useEffect } from "react";

interface ViolationRecord {
  id: number;
  timestamp: number; // The exact second in the video when this violation happens
  imagePath: string;
  violationType: string;
  location: string;
  timeFrame: string;
  vehicleDesc: string;
  plateNumber: string;
  pdfPath: string;
}

const ALL_VIOLATION_RECORDS: ViolationRecord[] = [
  {
    id: 1,
    timestamp: 19, // Appears when video hits 20 seconds
    imagePath: "/images/vehicle-5.png",
    violationType: "NO HELMET",
    location: "NH 44 - Km 18",
    timeFrame: "16:48:22 - 16:48:25 IST",
    vehicleDesc: "White Honda Dio",
    plateNumber: "MH 06 HF 4712",
    pdfPath: "/challans/dl06ef9012.pdf",
  },
  {
    id: 2,
    timestamp: 21, // Appears when video hits 5 seconds
    imagePath: "/images/vehicle-1.png",
    violationType: "Over Speeding (85 km/h in 60 zone)",
    location: "NH 44 - Km 18",
    timeFrame: "14:30:15 - 14:30:18 IST",
    vehicleDesc: "WHite Tata Indigo",
    plateNumber: "MH 20 HP 0501",
    pdfPath: "/challans/mh12ab1234.pdf",
  },
  {
    id: 3,
    timestamp: 28, // Appears when video hits 12 seconds
    imagePath: "/images/vehicle-2.png",
    violationType: "NO HELMET (Rider & Pillion)",
    location: "NH 44 - Km 18",
    timeFrame: "09:15:40 - 09:15:43 IST",
    vehicleDesc: "Red Suzuki Access",
    plateNumber: "MH 20 BO 0579",
    pdfPath: "/challans/ka05cd5678.pdf",
  },
  {
    id: 4,
    timestamp: 32, // Appears when video hits 20 seconds
    imagePath: "/images/vehicle-3.png",
    violationType: "OVERSPEEDING (85 km/h in 60 zone)",
    location: "NH 44 - Km 18",
    timeFrame: "16:48:22 - 16:48:25 IST",
    vehicleDesc: "White Suzuki Brezza",
    plateNumber: "MH 16 CY 7281",
    pdfPath: "/challans/dl06ef9012.pdf",
  },
  {
    id: 5,
    timestamp: 34, // Appears when video hits 20 seconds
    imagePath: "/images/vehicle-6.png",
    violationType: "NO HELMET (Rider & Pillion)",
    location: "NH 44 - Km 18",
    timeFrame: "16:48:22 - 16:48:25 IST",
    vehicleDesc: "Red Honda Activa",
    plateNumber: "MH 31 JC 7485",
    pdfPath: "/challans/dl06ef9012.pdf",    
  },
  {
    id: 6,
    timestamp: 38, // Appears when video hits 20 seconds
    imagePath: "/images/vehicle-4.png",
    violationType: "NO HELMET",
    location: "NH 44 - Km 18",
    timeFrame: "16:48:22 - 16:48:25 IST",
    vehicleDesc: "Bajaj Pulsar 150",
    plateNumber: "MH 31 EF 9012",
    pdfPath: "/challans/dl06ef9012.pdf",
  },
];

interface ViolationCardsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const ViolationCards: React.FC<ViolationCardsProps> = ({ videoRef }) => {
  const [visibleRecords, setVisibleRecords] = useState<ViolationRecord[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // Filter records that should be visible at the current video timestamp
      const triggered = ALL_VIOLATION_RECORDS.filter(
        (record) => currentTime >= record.timestamp
      );

      setVisibleRecords(triggered);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  return (
    <div className="mt-10 w-full max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-100">Live Detected Violations Feed</h3>
        <p className="text-sm text-slate-400">Cards appear in real-time as violations occur in the video stream.</p>
      </div>

      {visibleRecords.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
          Play the video above to watch violations trigger in real-time...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleRecords.map((record) => (
            <div
              key={record.id}
              className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 animate-fadeIn"
            >
              {/* Vehicle Image at Top */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={record.imagePath}
                  alt={record.plateNumber}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/your-default-image.jpg";
                  }}
                />
                <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow">
                  Live Alert
                </span>
              </div>

              {/* Details Section */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-red-400 tracking-wide uppercase">
                    Violation Detected @ {record.timestamp}s
                  </div>
                  <h4 className="font-bold text-slate-100 text-sm mt-0.5">
                    {record.violationType}
                  </h4>

                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-medium text-slate-200">{record.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Frame:</span>
                      <span className="font-medium text-slate-200">{record.timeFrame}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="font-medium text-slate-200">{record.vehicleDesc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plate:</span>
                      <span className="font-bold text-sky-400">{record.plateNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="mt-5 pt-2">
                  <a
                    href={record.pdfPath}
                    download
                    className="w-full block text-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-xl text-xs uppercase tracking-wider shadow transition-colors"
                  >
                    Download E-Challan PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};