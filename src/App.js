import { Container, Typography, Button, Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Myers Endurance Coaching
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to your new website
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default App;
