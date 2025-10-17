import React, { useState } from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function DayCard({ day }) {
  const { dispatch } = useItinerary();
  const [newAct, setNewAct] = useState({ period: "morning", text: "" });

  function updateField(patch) {
    dispatch({ type: "UPDATE_DAY", payload: { id: day.id, patch } });
  }

  function addActivity() {
    if (!newAct.text.trim()) return;
    dispatch({ type: "ADD_ACTIVITY", payload: { id: day.id, period: newAct.period, text: newAct.text } });
    setNewAct({ ...newAct, text: "" });
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="day-preview">
        <div className="day-label">Day {day.dayNumber}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <input type="text" value={day.title} onChange={(e)=>updateField({ title: e.target.value })} style={{ fontWeight:700, fontSize:16, border:'none', background:'transparent' }} />
              <div className="small">{day.date || "Date not set"}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <label className="small">Date:</label>
              <input type="date" value={day.date || ""} onChange={(e)=>updateField({ date: e.target.value })} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {["morning","afternoon","evening"].map((p)=>(
              <div key={p}>
                <div style={{ fontWeight:700, marginBottom:6, textTransform:'capitalize' }}>{p}</div>
                <ul style={{ paddingLeft:16, marginTop:0 }}>
                  {(day.activities[p] || []).map((act, idx)=>(
                    <li key={idx} style={{ marginBottom:6, display:'flex', justifyContent:'space-between' }}>
                      <span style={{ maxWidth: '85%' }}>{act}</span>
                      <button className="btn btn-ghost" onClick={()=>dispatch({type:"REMOVE_ACTIVITY", payload:{id:day.id, period:p, index:idx}})} style={{ padding:'2px 6px', fontSize:12 }}>remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop:10, display:'flex', gap:8, alignItems:'center' }}>
            <select value={newAct.period} onChange={(e)=>setNewAct({...newAct, period:e.target.value})}>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
            <input type="text" placeholder="Add activity..." value={newAct.text} onChange={(e)=>setNewAct({...newAct, text:e.target.value})} />
            <button className="btn btn-primary" onClick={addActivity}>Add</button>
          </div>

        </div>
      </div>
    </div>
  );
}
