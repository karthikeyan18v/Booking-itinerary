import React, { useState } from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function FlightsEditor(){
  const { state, dispatch } = useItinerary();
  const [form, setForm] = useState({ date: "", code: "", from: "", to: "", notes: "" });

  function onAdd(){
    if(!form.date || !form.code) return alert("date and code required");
    dispatch({ type: "ADD_FLIGHT", payload: { ...form } });
    setForm({ date: "", code: "", from: "", to: "", notes: "" });
  }

  return (
    <div style={{ marginTop:12 }}>
      <h3>Flights & Transfers</h3>
      <div className="field">
        <label>Date</label>
        <input type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} />
      </div>
      <div className="field">
        <label>Flight / Transfer Code & Details</label>
        <input type="text" placeholder="e.g. AI-123 (Mumbai → Singapore)" value={form.code} onChange={(e)=>setForm({...form, code:e.target.value})} />
      </div>
      <div className="row" style={{ marginTop:6 }}>
        <input type="text" placeholder="From" value={form.from} onChange={(e)=>setForm({...form, from:e.target.value})} />
        <input type="text" placeholder="To" value={form.to} onChange={(e)=>setForm({...form, to:e.target.value})} />
      </div>
      <div className="field">
        <label>Notes</label>
        <input type="text" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} />
      </div>
      <div className="row">
        <button className="btn btn-primary" onClick={onAdd}>+ Add Flight</button>
        <div style={{ flex:1 }}></div>
      </div>

      <div style={{ marginTop:10 }}>
        <table className="table">
          <thead><tr><th>Date</th><th>Code</th><th>From</th><th>To</th><th></th></tr></thead>
          <tbody>
            {state.flights.map(f=>(
              <tr key={f.id}>
                <td>{f.date}</td>
                <td>{f.code}</td>
                <td>{f.from}</td>
                <td>{f.to}</td>
                <td><button className="btn btn-ghost" onClick={()=>dispatch({type:"REMOVE_FLIGHT", payload:f.id})}>remove</button></td>
              </tr>
            ))}
            {state.flights.length===0 && <tr><td colSpan={5} className="small">No flights added.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
