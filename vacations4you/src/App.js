import './App.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from './app/features/auth/loginPage';
import LandingPage from './app/features/landingPage/landingPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<LandingPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </>
    
  );
}

export default App;
