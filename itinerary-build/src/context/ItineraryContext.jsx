import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

/* context */
export const ItineraryContext = createContext();

/* initial state */
const initialState = {
  overview: {
    title: "Singapore Itinerary",
    name: "Rahul",
    startDate: "",
    endDate: "",
    travelers: 2,
    departureFrom: "Mumbai",
    destination: "Singapore"
  },
  days: [
    {
      id: uuidv4(),
      dayNumber: 1,
      date: "",
      title: "Arrival & City Exploration",
      activities: { morning: [], afternoon: [], evening: [] },
      transports: [] // e.g., flight/transfer objects for that day
    }
  ],
  flights: [],
  hotels: [],
  payments: [],
  inclusions: [],
  exclusions: []
};

/* reducer */
function reducer(state, action) {
  switch (action.type) {
    case "SET_OVERVIEW":
      return { ...state, overview: { ...state.overview, ...action.payload } };

    case "ADD_DAY": {
      const newDay = {
        id: uuidv4(),
        dayNumber: state.days.length + 1,
        date: "",
        title: `Day ${state.days.length + 1}`,
        activities: { morning: [], afternoon: [], evening: [] },
        transports: []
      };
      return { ...state, days: [...state.days, newDay] };
    }

    case "REMOVE_DAY": {
      const filtered = state.days.filter((d) => d.id !== action.payload);
      // reindex day numbers
      const renum = filtered.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
      return { ...state, days: renum };
    }

    case "UPDATE_DAY": {
      const { id, patch } = action.payload;
      return {
        ...state,
        days: state.days.map((d) => (d.id === id ? { ...d, ...patch } : d))
      };
    }

    case "ADD_ACTIVITY": {
      const { id, period, text } = action.payload;
      return {
        ...state,
        days: state.days.map((d) =>
          d.id === id ? { ...d, activities: { ...d.activities, [period]: [...d.activities[period], text] } } : d
        )
      };
    }

    case "REMOVE_ACTIVITY": {
      const { id, period, index } = action.payload;
      return {
        ...state,
        days: state.days.map((d) =>
          d.id === id
            ? { ...d, activities: { ...d.activities, [period]: d.activities[period].filter((_, i) => i !== index) } }
            : d
        )
      };
    }

    case "ADD_FLIGHT":
      return { ...state, flights: [...state.flights, { id: uuidv4(), ...action.payload }] };

    case "REMOVE_FLIGHT":
      return { ...state, flights: state.flights.filter((f) => f.id !== action.payload) };

    case "ADD_HOTEL":
      return { ...state, hotels: [...state.hotels, { id: uuidv4(), ...action.payload }] };

    case "REMOVE_HOTEL":
      return { ...state, hotels: state.hotels.filter((h) => h.id !== action.payload) };

    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, { id: uuidv4(), ...action.payload }] };

    case "REMOVE_PAYMENT":
      return { ...state, payments: state.payments.filter((p) => p.id !== action.payload) };

    case "ADD_INCLUSION":
      return { ...state, inclusions: [...state.inclusions, action.payload] };

    case "ADD_EXCLUSION":
      return { ...state, exclusions: [...state.exclusions, action.payload] };

    default:
      return state;
  }
}

/* context & provider */
export function ItineraryProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ItineraryContext.Provider value={{ state, dispatch }}>{children}</ItineraryContext.Provider>;
}

