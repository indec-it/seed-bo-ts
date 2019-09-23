import * as React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { requestedHideModal } from '~actions/modal';

interface ModalStore {
    body?: string | object;
    buttons?: object;
    show: boolean;
    title: string;
}

const AppModal = (): React.ReactNode => {
    const {
        body,
        buttons,
        show,
        title
    }: ModalStore = useSelector((state: {modal: ModalStore}) => state.modal);
    return (
        <Modal show={show}>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
                {buttons}
                <Button color="primary" onClick={(): void => useDispatch()(requestedHideModal())}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

AppModal.defaultProps = {
    body: '',
    buttons: null,
    show: false,
    title: ''
};

export default AppModal;
