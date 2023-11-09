import './App.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from './app/features/auth/loginPage';
import LandingPage from './app/features/landingPage/landingPage';
import Cruise from './app/pages/Cruise';
import Activity from './app/pages/Activity';
import Package from './app/pages/Package';
import SignupPage from './app/features/auth/signupPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<LandingPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route exact path="/cruise" element={<Cruise />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/package" element={<Package />} />
      </Routes>
    </>
    
  );
}

export default App;
