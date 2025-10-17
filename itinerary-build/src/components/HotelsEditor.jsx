import React, { useState } from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function HotelsEditor(){
  const { state, dispatch } = useItinerary();
  const [form, setForm] = useState({ city:"", checkIn:"", checkOut:"", nights:1, name:"" });

  function onAdd(){
    if(!form.city || !form.name) return alert("city and name required");
    dispatch({ type: "ADD_HOTEL", payload: { ...form } });
    setForm({ city:"", checkIn:"", checkOut:"", nights:1, name:"" });
  }

  return (
    <div style={{ marginTop:12 }}>
      <h3>Hotels</h3>
      <div className="row">
        <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        <input type="date" placeholder="Check In" value={form.checkIn} onChange={e=>setForm({...form, checkIn:e.target.value})} />
      </div>
      <div className="row" style={{ marginTop:8 }}>
        <input type="date" placeholder="Check Out" value={form.checkOut} onChange={e=>setForm({...form, checkOut:e.target.value})} />
        <input type="number" min="1" placeholder="Nights" value={form.nights} onChange={e=>setForm({...form, nights: e.target.value})} />
      </div>
      <div className="field">
        <label>Hotel Name</label>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      </div>
      <div className="row">
        <button className="btn btn-primary" onClick={onAdd}>+ Add Hotel</button>
      </div>

      <table className="table" style={{ marginTop:10 }}>
        <thead><tr><th>City</th><th>Chk In</th><th>Chk Out</th><th>Nights</th><th>Hotel</th><th></th></tr></thead>
        <tbody>
          {state.hotels.map(h=>(
            <tr key={h.id}>
              <td>{h.city}</td>
              <td>{h.checkIn}</td>
              <td>{h.checkOut}</td>
              <td>{h.nights}</td>
              <td>{h.name}</td>
              <td><button className="btn btn-ghost" onClick={()=>dispatch({type:"REMOVE_HOTEL", payload:h.id})}>remove</button></td>
            </tr>
          ))}
          {state.hotels.length===0 && <tr><td colSpan={6} className="small">No hotels added</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
