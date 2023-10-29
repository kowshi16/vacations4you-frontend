import './App.css';
import {Routes, Route} from "react-router-dom";
import Landing from './app/features/landing/landing';
import LoginPage from './app/features/auth/loginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </>
    
  );
}

export default App;
