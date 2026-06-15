import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface DeleteSuscriptionDialogProp {
  deleteTopic: string | null;
  confirmDelete: () => void;
  setDeleteTopic: React.Dispatch<React.SetStateAction<string | null>>
}

export default function DeleteSuscriptionDialog({deleteTopic, confirmDelete, setDeleteTopic}: DeleteSuscriptionDialogProp) {
  return (
    <Dialog open={deleteTopic !== null} onClose={() => setDeleteTopic(null)}>
        <DialogTitle>Eliminar suscripción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`¿Seguro que quieres eliminar la suscripción "${deleteTopic ?? ''}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTopic(null)}>Cancelar</Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  );
}