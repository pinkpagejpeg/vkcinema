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
    filmName: string
    isFavorite: boolean
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export const SubmitModal: FC<SubmitModalProps> = ({ filmName, isFavorite, open, onClose, onConfirm }) => {
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
                    {isFavorite
                        ? `Вы хотите удалить фильм ${filmName} из избранного?`
                        : `Вы хотите добавить фильм ${filmName} в избранное?`}
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