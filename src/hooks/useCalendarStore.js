
import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSaveActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    const dispacht = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispacht(onSaveActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        /* LLEGAR AL BACKEND */

        if (calendarEvent._id) {
            /*ACTUALIZANDO*/
            dispacht(onUpdateEvent({ ...calendarEvent }))

        } else {
            /*CREANDO*/
            dispacht(onAddNewEvent({
                ...calendarEvent, id: new Date().getTime()
            }))
        }
    }

    const startDeletingEvent = () => {
        dispacht(onDeleteEvent());
    }

    return {
        // propiedades
        events,
        activeEvent,
        hasEventSeleted: !!activeEvent,

        // metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }

}
