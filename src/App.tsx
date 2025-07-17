import YoutubeThumbnailFetcher from './components/YoutubeThumbnailFetcher';
import { Container, Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15vh', // 從頂部推開 15% 的可視高度
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <YoutubeThumbnailFetcher />
      </Container>
    </Box>
  );
}

export default App;