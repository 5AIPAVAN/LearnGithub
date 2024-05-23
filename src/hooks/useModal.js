import { Box, Modal, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const forBelow1080px = useMediaQuery('(max-width:1280px)');

    const style = {
        height: 464,
        bgcolor: 'background.paper',
        p: 5.8,
        borderRadius: 1
    };

    const ModalComponent = ({ children }) => {
        return isOpen && children ? (
            <Modal open={isOpen} onClose={closeModal}>
                <Box sx={style} className={`position-absolute top-50 start-50 translate-middle ${forBelow1080px ? 'col-lg-5' : 'col-lg-4'} col-md-6 col-sm-7 col-11`}>
                    {children}
                </Box>
            </Modal>
        ) : null;
    };

    return { openModal, closeModal, ModalComponent };
};

export default useModal;
