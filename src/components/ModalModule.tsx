import type {ReactNode} from "react";
import {Modal as MuiModal, Box, Button} from "@mui/material";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

function Modal({isOpen, onClose, children}: ModalProps) {
    return (
        <MuiModal open={isOpen} onClose={onClose}>
            <Box
                //(replaces .modal)
                sx={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Box
                    //replaces .modal-content
                    sx={{
                        borderRadius: "20px",
                        p: "20px",
                        fontWeight: 600,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        minWidth: 280,
                        maxWidth: "90vw",
                    }}
                    onClick={(e) => e.stopPropagation()} //stop propagation means just dont let this lcick keep traveling upward, so in the browswer when you click something that click doesnt ony belong to that, but it bubles up
                    //without it, it would not work.
                >
                    {children}
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{mt: 2, borderRadius: 2}}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </MuiModal>
    );
}

export default Modal;