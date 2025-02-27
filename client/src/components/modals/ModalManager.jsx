import Test from "./Test";
import Test2 from "./Test2";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalStore';

const modalComponents = { // MODAL LIST
    Test: Test,
    Test2: Test2,
};

const ModalManager = () => {
    const dispatch = useDispatch();
    const { isOpen, modalData, modalType } = useSelector(state => state.modal);

    const close = () => {
        dispatch(closeModal());
    }

    if (!isOpen || !modalType) return null;

    const SpecificModal = modalComponents[modalType];

    return (
        <SpecificModal
            isOpen={isOpen}
            close={close}
            {...modalData}
        />
    );
}

export default ModalManager;