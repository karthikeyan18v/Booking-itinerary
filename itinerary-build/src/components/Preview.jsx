import React from "react";
import Header from "./Header";
import { useItinerary } from "../hooks/useItinerary.js";

function TimelineDot(){
  return <span className="timeline-dot" />;
}

export default function Preview(){
  const { state } = useItinerary();
  const { overview, days, flights, hotels, payments, inclusions, exclusions } = state;

  return (
    <div id="itinerary-root" className="itinerary-root">
      {/* Hero/header */}
      <Header />

      {/* Days / timeline */}
      <section className="days-section">
        {days.map(d=> (
          <article className="day-card" key={d.id}>
            <div className="day-left">
              <div className="day-oval">Day {d.dayNumber}</div>
            </div>
            <div className="day-center">
              <div className="day-image" />
              <div className="day-date">{d.date || '27th November'}</div>
              <div className="day-title">{d.title}</div>
            </div>
            <div className="day-right">
              <div className="timeline">
                <div className="timeline-item"><TimelineDot /><div><strong>Morning</strong><div className="desc">{(d.activities.morning||[]).length ? <ul>{d.activities.morning.map((a,i)=><li key={i}>{a}</li>)}</ul> : <div className="small">—</div>}</div></div></div>
                <div className="timeline-item"><TimelineDot /><div><strong>Afternoon</strong><div className="desc">{(d.activities.afternoon||[]).length ? <ul>{d.activities.afternoon.map((a,i)=><li key={i}>{a}</li>)}</ul> : <div className="small">—</div>}</div></div></div>
                <div className="timeline-item"><TimelineDot /><div><strong>Evening</strong><div className="desc">{(d.activities.evening||[]).length ? <ul>{d.activities.evening.map((a,i)=><li key={i}>{a}</li>)}</ul> : <div className="small">—</div>}</div></div></div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Flights */}
      <section className="flight-section">
        <h3>Flight Summary</h3>
        <div className="flight-list">
          {flights.length===0 && <div className="flight-empty">No flights</div>}
          {flights.map(f=>(
            <div className="flight-item" key={f.id}>
              <div className="flight-date">{f.date || 'Thu 10 Jan\'24'}</div>
              <div className="flight-desc">Fly {f.airline || 'Air India'} ({f.code || 'AX-123'}) From {f.from || 'DEL'} To {f.to || 'SIN'}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="hotel-section">
        <h3>Hotel Bookings</h3>
        <table className="hotel-table">
          <thead><tr><th>City</th><th>Check In</th><th>Check Out</th><th>Nights</th><th>Hotel Name</th></tr></thead>
          <tbody>
            {hotels.length===0 && <tr><td colSpan={5} className="small">No hotels</td></tr>}
            {hotels.map(h=>(<tr key={h.id}><td>{h.city||'Singapore'}</td><td>{h.checkIn||'24/02/2024'}</td><td>{h.checkOut||'24/02/2024'}</td><td>{h.nights||2}</td><td>{h.name||'Super Townhouse Oak'}</td></tr>))}
          </tbody>
        </table>
      </section>

      {/* Notes / Scope */}
      <section className="notes-section">
        <div className="notes-grid">
          <div className="notes-card">
            <h4>Important Notes</h4>
            <table className="notes-table"><tbody>
              <tr><td>Airlines Standard Policy</td><td>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</td></tr>
            </tbody></table>
          </div>

          <div className="scope-card">
            <h4>Scope Of Service</h4>
            <table className="notes-table"><tbody>
              <tr><td>Flight Tickets And Hotel Vouchers</td><td>Delivered 3 Days Post Full Payment</td></tr>
            </tbody></table>
          </div>
        </div>
      </section>

      {/* Inclusion */}
      <section className="inclusion-section">
        <h3>Inclusion Summary — {overview?.destination || 'Destination'}</h3>
        <table className="inclusion-table">
          <thead><tr><th>Category</th><th>Count</th><th>Details</th><th>Status / Comments</th></tr></thead>
          <tbody>
            {inclusions.length===0 && <tr><td colSpan={4} className="small">—</td></tr>}
            {inclusions.map((inc,i)=>(<tr key={i}><td>{inc||'Flight'}</td><td>2</td><td>All Flights Mentioned</td><td>{exclusions[i] || 'Awaiting Confirmation'}</td></tr>))}
          </tbody>
        </table>
      </section>

      {/* Activity Table */}
      <section className="activity-section">
        <h3>Activity Table</h3>
        <table className="activity-table">
          <thead><tr><th>City</th><th>Activity</th><th>Type</th><th>Time Required</th></tr></thead>
          <tbody>
            <tr><td>Rio De Janeiro</td><td>Sydney Harbour Cruise & Taronga Zoo</td><td>Nature/Sightseeing</td><td>2-3 Hours</td></tr>
            <tr><td>Rio De Janeiro</td><td>Sydney Harbour Cruise & Taronga Zoo</td><td>Airlines Standard</td><td>2-3 Hours</td></tr>
            <tr><td>Rio De Janeiro</td><td>Sydney Harbour Cruise & Taronga Zoo</td><td>Airlines Standard</td><td>2-3 Hours</td></tr>
            <tr><td>Rio De Janeiro</td><td>Sydney Harbour Cruise & Taronga Zoo</td><td>Airlines Standard</td><td>2-3 Hours</td></tr>
          </tbody>
        </table>
      </section>

      {/* Payment */}
      <section className="payment-section">
        <h3>Payment Plan</h3>
        <div className="payment-grid">
          {payments.length===0 && <div className="small">No payment plan</div>}
          {payments.map(p=>(
            <div className="payment-card" key={p.id}>
              <div className="payment-title">Installment {p.installment}</div>
              <div className="payment-amount">₹{p.amount}</div>
              <div className="payment-due">Due: {p.dueDate}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visa */}
      <section className="visa-section">
        <h3>Visa Details</h3>
        <div className="visa-box">Visa Type : 123456 &nbsp; | &nbsp; Validity: 123456 &nbsp; | &nbsp; Processing Date : 123456</div>
      </section>

      {/* Call to action */}
      <div className="cta-section">
        <div className="cta-text">PLAN.PACK.GO!</div>
        <button className="book-now-btn">Book Now</button>
      </div>

      <footer className="preview-footer">
        <div className="footer-grid">
          <div className="footer-col contact-col">
            <div className="footer-logo">vigovia</div>
            <p className="muted">Vigovia Tech Pvt. Ltd</p>
            <p className="small">Phone: <a href="tel:+919504061112">+91-9504061112</a></p>
            <p className="small">Email: <a href="mailto:info@vigovia.com">info@vigovia.com</a></p>
          </div>

          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#itinerary-root">Itinerary</a></li>
              <li><a href="#flights">Flights</a></li>
              <li><a href="#hotels">Hotels</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col social-col">
            <h4>Connect</h4>
            <div className="socials">
              <a href="#" aria-label="facebook" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.09 5.52 21.25 10.3 22v-7.04H8.02v-2.91h2.28V9.8c0-2.26 1.35-3.51 3.41-3.51.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.69-1.47 1.4v1.69h2.5l-.4 2.91h-2.1V22c4.78-.77 8.44-4.93 8.44-9.93z"/></svg>
              </a>

              <a href="#" aria-label="instagram" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zM18.5 6a1 1 0 11-1 1 1 1 0 011-1z"/></svg>
              </a>

              <a href="#" aria-label="linkedin" className="social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 102 6a2.5 2.5 0 002.98-2.5zM3 8h4v12H3zM9 8h4v1.7c.6-1 2-1.9 3.9-1.9 4.2 0 5 2.8 5 6.4V20h-4v-5c0-1.3 0-3-1.8-3-1.8 0-2.1 1.5-2.1 2.9V20H9z"/></svg>
              </a>
            </div>

            <button className="back-to-top" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Back to top</button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">© {new Date().getFullYear()} Vigovia Tech Pvt. Ltd. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
