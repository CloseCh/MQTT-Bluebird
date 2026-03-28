// components/ui/ResizeHandle/ResizeHandle.tsx
import { useCallback } from "react";
import Box from "@mui/material/Box";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  onResize: (newSize: number) => void;
  initialSize: number;
  min?: number;
  max?: number;
  direction?: 'horizontal' | 'vertical';
}

export function ResizeHandle({ onResize, initialSize, min = 100, max = 500, direction = 'horizontal' }: Props) {
  const isHorizontal = direction === 'horizontal';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startPos = isHorizontal ? e.clientX : e.clientY;
    const startSize = initialSize;

    const onMouseMove = (e: MouseEvent) => {
      const delta = (isHorizontal ? e.clientX : e.clientY) - startPos;
      const newSize = Math.min(Math.max(startSize + delta, min), max);
      onResize(newSize);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [initialSize, min, max, isHorizontal, onResize]);

  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={{
        position: 'relative',
        width: isHorizontal ? '10px' : '100%',
        height: isHorizontal ? '100%' : '10px',
        flexShrink: 0,
        cursor: isHorizontal ? 'ew-resize' : 'ns-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          backgroundColor: 'divider',
          width: isHorizontal ? '2px' : '100%',
          height: isHorizontal ? '100%' : '2px',
        },
        '&:hover::before': {
          backgroundColor: 'primary.main',
        },
        '&:hover .drag-icon': {
          color: 'primary.main',
        }
      }}
    >
      <Box
        className="drag-icon"
        sx={{
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '4px',
          width: isHorizontal ? '20px' : '44px',
          height: isHorizontal ? '44px' : '20px',
          color: 'text.secondary',
        }}
      >
        <DragIndicatorIcon sx={{ fontSize: 16, transform: isHorizontal ? 'none' : 'rotate(90deg)' }} />
      </Box>
    </Box>
  );
}