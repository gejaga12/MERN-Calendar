import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent =
{
    _id: new Date().getTime(),
    title: "Programar en JavaScript",
    notes: "Siempre con TypeScript",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        _id: "1",
        name: "Gerardo",
    },
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null

    },
    reducers: {
        onSaveActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);   /* Incertamos mediante el push el payload */
            state.activeEvent = null      /* Limpio la nota activa */
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null;
            }
        }
    }
});

export const { onSaveActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions

