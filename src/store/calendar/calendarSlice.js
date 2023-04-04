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
        }
    }
});

export const { onSaveActiveEvent } = calendarSlice.actions

