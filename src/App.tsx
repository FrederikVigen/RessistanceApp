import './App.css';
import { Box, Container, Stack} from '@mui/material';
import TextPresenter from './components/TextPresenter';
import ReaderControls from './components/ReaderControls';
import ExpansionControls from './components/ExpansionControls';
import ReaderService from './Services/ReaderService';





function App() {
  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Stack border={3} borderColor={"primary.main"} sx={{ p: 2, borderRadius: 2 }} spacing={2}>
          <TextPresenter />
          <ReaderService>
            <ReaderControls />
          </ReaderService>
          <ExpansionControls />
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
