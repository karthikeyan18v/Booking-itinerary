import React, { useState } from "react";
import { ItineraryProvider } from "./context/ItineraryContext.jsx";
import OverviewForm from "./components/OverviewForm";
import DayList from "./components/DayList";
import FlightsEditor from "./components/FlightsEditor";
import HotelsEditor from "./components/HotelsEditor";
import PaymentsEditor from "./components/PaymentsEditor";
import InclusionsEditor from "./components/InclusionsEditor";
import Preview from "./components/Preview";
import { captureElementToPdf } from "./utils/pdfGenerator";

function AppContent(){
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Floating action buttons */}
      <div className="floating-actions">
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>
          ✏️ Edit Itinerary
        </button>
        <button className="btn btn-primary" onClick={async ()=>{
          const el = document.getElementById("itinerary-root");
          if(!el) return alert("Preview not rendered yet");
          await captureElementToPdf(el, `itinerary-${Date.now()}.pdf`);
        }}>📄 Download PDF</button>
      </div>

      {/* Full-screen preview */}
      <div className="fullscreen-preview">
        <Preview />
      </div>

      {/* Modal for editing */}
      {showModal && (
        <div className="modal-overlay" onClick={()=>setShowModal(false)}>
          <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Itinerary</h2>
              <button className="btn-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <OverviewForm />
              <hr style={{ margin:'12px 0', borderColor:'var(--border)' }} />
              <DayList />
              <hr style={{ margin:'12px 0', borderColor:'var(--border)' }} />
              <FlightsEditor />
              <hr style={{ margin:'12px 0', borderColor:'var(--border)' }} />
              <HotelsEditor />
              <hr style={{ margin:'12px 0', borderColor:'var(--border)' }} />
              <PaymentsEditor />
              <hr style={{ margin:'12px 0', borderColor:'var(--border)' }} />
              <InclusionsEditor />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function App(){
  return (
    <ItineraryProvider>
      <AppContent />
    </ItineraryProvider>
  );
}
