
import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSaveActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { converEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispacht = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispacht(onSaveActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            /* LLEGAR AL BACKEND */
            if (calendarEvent.id) {
                /*ACTUALIZANDO*/
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispacht(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            /*CREANDO*/
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispacht(onAddNewEvent({
                ...calendarEvent, id: data.evento.id, user
            }))
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispacht(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = converEventsToDateEvents(data.eventos);
            dispacht(onLoadEvents(events))
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        // propiedades
        events,
        activeEvent,
        hasEventSeleted: !!activeEvent,

        // metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }

}
