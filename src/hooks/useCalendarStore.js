
import { useSelector, useDispatch } from 'react-redux';
import { onSaveActiveEvent } from '../store';

export const useCalendarStore = () => {
    const dispacht = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

        const setActiveEvent = (calendarEvent) => {
            dispacht( onSaveActiveEvent( calendarEvent ) )
        }

    return {
        // propiedades
        events,
        activeEvent,
        // metodos
        setActiveEvent,
    }

}
