import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useMQTT } from '../../function/messageManagement.js';



export default function Main() {
  const { topics, messagesByTopic } = useMQTT(100);

  return (
    <>
      <CssBaseline />
      <Box sx={{bgcolor: 'red'}}>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            p: 2,
            borderRadius: 2,
            minHeight: '100vh', 
            minwidth: '100vh',
          }}
        >
          <List>
            {topics.map((topic : string) => (
              <ListItem key={topic}>
                <span>{topic}</span>
                <span>{JSON.stringify(messagesByTopic[topic]?.at(-1)?.data)}</span>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      </Box>
    </>
  );
}