import './App.css';
import {Routes, Route} from "react-router-dom";
import Landing from './app/features/landing/landing';
import Login from './app/features/auth/login';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
    
  );
}

export default App;
