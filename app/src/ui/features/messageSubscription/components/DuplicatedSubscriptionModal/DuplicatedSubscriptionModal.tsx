import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

interface DuplicateSubscriptionModalProps {
  open: boolean;
  topic: string;
  coveringTopics: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function DuplicateSubscriptionModal({
  open,
  topic,
  coveringTopics,
  onConfirm,
  onCancel,
}: DuplicateSubscriptionModalProps) {
  const isExact = coveringTopics.includes(topic);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        {isExact ? 'Suscripción duplicada' : 'Topic ya cubierto'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isExact
            ? <>El topic <strong>{topic}</strong> ya existe en la lista.</>
            : <>El topic <strong>{topic}</strong> ya está cubierto por las siguientes suscripciones:</>
          }
        </DialogContentText>
        {!isExact && (
          <List dense>
            {coveringTopics.map((t) => (
              <ListItem key={t}>
                <ListItemText primary={t} />
              </ListItem>
            ))}
          </List>
        )}
        <DialogContentText sx={{ mt: 1 }}>
          ¿Deseas agregarlo de todas formas?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='inherit'>Cancelar</Button>
        <Button onClick={onConfirm} color='primary' variant='contained'>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateSubscriptionModal;