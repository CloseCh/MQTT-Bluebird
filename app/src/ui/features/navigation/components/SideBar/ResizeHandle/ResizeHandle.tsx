// components/ui/ResizeHandle/ResizeHandle.tsx
import { useCallback } from 'react';
import Box from '@mui/material/Box';

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
        width: isHorizontal ? '0px' : '100%',
        height: isHorizontal ? '100%' : '0px',
        flexShrink: 0,
        cursor: isHorizontal ? 'ew-resize' : 'ns-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: isHorizontal ? 0 : undefined,
          top: isHorizontal ? undefined : 0,
          backgroundColor: 'divider',
          width: isHorizontal ? '1px' : '100%',
          height: isHorizontal ? '100%' : '1px',
        },
        '&:hover::before': {
          backgroundColor: 'primary.main',
        },
        '&:hover .drag-icon': {
          color: 'primary.main',
        }
      }}
    >
    </Box>
  );
}