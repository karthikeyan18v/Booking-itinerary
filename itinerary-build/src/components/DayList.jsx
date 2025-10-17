import React from "react";
import { useItinerary } from "../hooks/useItinerary.js";
import DayCard from "./DayCard";

export default function DayList() {
  const { state, dispatch } = useItinerary();

  return (
    <div>
      <h3>Days & Activities</h3>
      <div style={{ marginBottom: 8 }}>
        <button className="btn btn-primary" onClick={() => dispatch({ type: "ADD_DAY" })}>+ Add Day</button>
        <button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={() => {
          // remove last day guard
          if (state.days.length <= 1) return;
          const id = state.days[state.days.length - 1].id;
          dispatch({ type: "REMOVE_DAY", payload: id });
        }}>Remove Last Day</button>
      </div>

      <div>
        {state.days.map((d) => <DayCard key={d.id} day={d} />)}
      </div>
    </div>
  );
}
