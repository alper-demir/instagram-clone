import UpdatePostModal from "./post/UpdatePostModal";
import DeletePostModal from "./post/DeletePostModal";
import UserListModal from "./common/UserListModal";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalStore';

const modalComponents = { // MODAL LIST
    UpdatePostModal: UpdatePostModal,
    DeletePostModal: DeletePostModal,
    UserListModal: UserListModal
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
            modalData={modalData}
        />
    );
}

export default ModalManager;