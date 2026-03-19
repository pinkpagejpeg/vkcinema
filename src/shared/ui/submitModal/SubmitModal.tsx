import type { FC } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material"

interface SubmitModalProps {
    title: string
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export const SubmitModal: FC<SubmitModalProps> = ({ title, open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="submit-dialog-title"
        >
            <DialogTitle id="submit-dialog-title">
                Подтвердите действие
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Отмена
                </Button>
                <Button onClick={onConfirm} variant="contained" autoFocus>
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    )
}