import { useDispatch, useSelector } from 'react-redux'
import { onOpenDateModal, onCloseDateModal } from '../store';

export const useUiStore = () => {
    const dispacht = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispacht(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispacht(onCloseDateModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? onOpenDateModal()
            : onCloseDateModal()
    }

    return {
        // propiedades
        isDateModalOpen,
        // metodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}
