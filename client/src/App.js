import {VStack} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/AuthPages/SignUp";
import Login from './components/AuthPages/Login';
import Home from './components/HomePages/Home';

function App() {
  const user = localStorage.getItem("token")
  return (
   
    
     
     <VStack>

    <Router>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element ={<SignUp />} />
        <Route path="/" element={<Navigate replace to="/login"/>} />
      </Routes>
    </Router>
      
      

    </VStack>
    
  );
}

export default App;
