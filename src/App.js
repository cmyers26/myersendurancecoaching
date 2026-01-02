import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import CoachingAndPricing from './components/CoachingAndPricing';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Contact from './components/Contact';
import IntakeForm from './components/IntakeForm';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaching" element={<CoachingAndPricing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/intake" element={<IntakeForm />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
