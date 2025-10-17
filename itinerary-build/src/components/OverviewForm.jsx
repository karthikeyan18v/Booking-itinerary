import React from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function OverviewForm() {
  const { state, dispatch } = useItinerary();
  const { overview } = state;

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_OVERVIEW", payload: { [name]: value } });
  };

  return (
    <div>
      <h3>Tour Overview</h3>
      <div className="field">
        <label>Trip Title</label>
        <input type="text" name="title" value={overview.title} onChange={onChange} />
      </div>

      <div className="field">
        <label>Contact / Name</label>
        <input type="text" name="name" value={overview.name} onChange={onChange} />
      </div>

      <div className="field">
        <label>Departure From</label>
        <input type="text" name="departureFrom" value={overview.departureFrom} onChange={onChange} />
      </div>

      <div className="field row">
        <div style={{flex:1}}>
          <label>Start Date</label>
          <input type="date" name="startDate" value={overview.startDate} onChange={onChange} />
        </div>
        <div style={{flex:1}}>
          <label>End Date</label>
          <input type="date" name="endDate" value={overview.endDate} onChange={onChange} />
        </div>
      </div>

      <div className="field">
        <label>Travellers</label>
        <input type="number" min="1" name="travelers" value={overview.travelers} onChange={onChange} />
      </div>
    </div>
  );
}
