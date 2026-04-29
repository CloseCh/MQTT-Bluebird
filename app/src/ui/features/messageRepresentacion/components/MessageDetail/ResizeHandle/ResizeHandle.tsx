import Box from "@mui/material/Box";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  onMouseDown: (e: React.MouseEvent) => void;
}

function ResizeHandle({ 
  onMouseDown 
}: Props) {
  return (
    <Box
      onMouseDown={onMouseDown}
      sx={{
        position: 'absolute',
        left: '-10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '44px',
        cursor: 'ew-resize',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        '&:hover': {
          backgroundColor: 'primary.main',
          borderColor: 'primary.main',
          '& .drag-icon': {
            color: 'white',
          }
        }
      }}
    >
      <DragIndicatorIcon />
    </Box>
  );
}

export default ResizeHandle;