import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())

        console.log({ email, password });

        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime(), data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    // TODO: Start Register

    const startRegister = async ({ email, password, name }) => {

        dispatch(onChecking())

        console.log({ email, password });

        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime(), data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {

            dispatch(onLogout(error.response.data?.msg || '---'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime(), data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            localStorage.clear();
            return dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        // PROPIEDADES
        status,
        user,
        errorMessage,

        // METODOS
        checkAuthToken,
        startRegister,
        startLogin,
        startLogout
    }
}