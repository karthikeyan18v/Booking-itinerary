import React, { useState } from "react";
import { useItinerary } from "../hooks/useItinerary.js";

export default function PaymentsEditor(){
  const { state, dispatch } = useItinerary();
  const [form, setForm] = useState({ installment:1, amount:"", dueDate:"" });

  function onAdd(){
    if(!form.amount || !form.dueDate) return alert("amount & due date required");
    dispatch({ type: "ADD_PAYMENT", payload: { ...form } });
    setForm({ installment: form.installment + 1, amount:"", dueDate:"" });
  }

  return (
    <div style={{ marginTop:12 }}>
      <h3>Payment Plan</h3>
      <div className="row">
        <input type="number" min="1" value={form.installment} onChange={e=>setForm({...form, installment: e.target.value})} />
        <input placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
        <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} />
        <button className="btn btn-primary" onClick={onAdd}>+ Add</button>
      </div>

      <div style={{ marginTop:10 }}>
        {state.payments.length===0 && <div className="small">No installments added</div>}
        {state.payments.map(p=>(
          <div key={p.id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
            <div>Inst. {p.installment} • {p.amount}</div>
            <div>{p.dueDate} <button className="btn btn-ghost" onClick={()=>dispatch({type:"REMOVE_PAYMENT", payload:p.id})}>remove</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
