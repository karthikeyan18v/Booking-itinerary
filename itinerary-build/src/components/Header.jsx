import React from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function Header() {
  const { state } = useItinerary();
  const { overview } = state;

  return (
    <div>
      {/* Logo and tagline */}
      <div className="logo-section">
        <div className="logo-text">vigovia</div>
        <div className="tagline">PLAN.PACK.GO ✈️</div>
      </div>

      {/* Hero banner */}
      <div className="banner">
        <h1>Hi, {overview.name}!</h1>
        <h2>{overview.title}</h2>
        <div className="meta">
          {overview.startDate && overview.endDate ? 
            `${new Date(overview.startDate).toLocaleDateString()} - ${new Date(overview.endDate).toLocaleDateString()}` : 
            '4 Days 3 Nights'
          }
        </div>
        <div className="icon-row">
          ✈️ 🏨 ☂️ 🚗 🗺️
        </div>
      </div>

      {/* Info card */}
      <div className="info-card">
        <div>
          <div className="small">Departure From :</div>
          <div>{overview.departureFrom}</div>
        </div>
        <div>
          <div className="small">Departure :</div>
          <div>{overview.startDate || "-"}</div>
        </div>
        <div>
          <div className="small">Arrival :</div>
          <div>{overview.endDate || "-"}</div>
        </div>
        <div>
          <div className="small">Destination :</div>
          <div>{overview.destination}</div>
        </div>
        <div>
          <div className="small">No. Of Travellers :</div>
          <div>{overview.travelers}</div>
        </div>
      </div>
    </div>
  );
}
