import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

export function PublisherTable() {
  return (
    <Box > 
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell align='right'>Contend</TableCell>
              <TableCell align='right'>QoS</TableCell>
              <TableCell align='right'>Retention</TableCell>
              <TableCell align='right'>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}