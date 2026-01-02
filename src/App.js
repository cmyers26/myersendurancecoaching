import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/AppLayout';
import RequireIntake from './components/RequireIntake';
import Home from './components/Home';
import CoachingAndPricing from './components/CoachingAndPricing';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Contact from './components/Contact';
import IntakeForm from './components/IntakeForm';
import GetStarted from './components/GetStarted';
import Checkout from './components/Checkout';
import OnboardingIntake from './components/OnboardingIntake';
import AthleteDashboard from './components/AthleteDashboard';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coaching" element={<CoachingAndPricing />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/intake" element={<IntakeForm />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/pricing" element={<CoachingAndPricing />} />
            <Route path="/checkout/:planName" element={<Checkout />} />
            <Route path="/onboarding/intake" element={<OnboardingIntake />} />
            <Route
              path="/dashboard"
              element={
                <RequireIntake>
                  <AthleteDashboard />
                </RequireIntake>
              }
            />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
