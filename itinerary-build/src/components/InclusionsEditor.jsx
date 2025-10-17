import React, { useState } from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function InclusionsEditor(){
  const { state, dispatch } = useItinerary();
  const [inc, setInc] = useState("");
  const [exc, setExc] = useState("");

  return (
    <div style={{ marginTop:12 }}>
      <h3>Inclusions / Exclusions</h3>
      <div style={{ display:'flex', gap:8 }}>
        <div style={{ flex:1 }}>
          <div className="field">
            <label>Add Inclusion</label>
            <input value={inc} onChange={e=>setInc(e.target.value)} />
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={()=>{ if(inc.trim()){ dispatch({type:"ADD_INCLUSION", payload:inc}); setInc("") }}}>+ Add Inclusion</button>
          </div>
          <ul style={{ marginTop:8 }}>
            {state.inclusions.map((t,i)=><li key={i}>{t}</li>)}
            {state.inclusions.length===0 && <li className="small">No inclusions</li>}
          </ul>
        </div>

        <div style={{ flex:1 }}>
          <div className="field">
            <label>Add Exclusion</label>
            <input value={exc} onChange={e=>setExc(e.target.value)} />
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={()=>{ if(exc.trim()){ dispatch({type:"ADD_EXCLUSION", payload:exc}); setExc("") }}}>+ Add Exclusion</button>
          </div>
          <ul style={{ marginTop:8 }}>
            {state.exclusions.map((t,i)=><li key={i}>{t}</li>)}
            {state.exclusions.length===0 && <li className="small">No exclusions</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
