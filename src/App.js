import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import StudentPlatform from './Screens/StudentPlatform';
import Admission from './Screens/Admission';
import Classes from './Screens/Classes';
import Course from './Screens/Course';
import Services from './Screens/Services';
import Installments from './Screens/Installments';
import InstallmentConditions from './Screens/InstallmentConditions';
import Payment from './Screens/Payment';
import Notifications from './Screens/Notifications';
import Settings from './Screens/Settings';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import Certificates from './Screens/Certificates';
import Program from './Screens/Program';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<StudentPlatform />} /> 
          <Route path="/admission" element={<Admission />} /> 
          <Route path="/program" element={<Program />} />
          <Route path="/classes" element={<Classes />} /> 
          <Route path="/course" element={<Course />} />
          <Route path="/certificates" element={<Certificates />} /> 
          <Route path="/installments" element={<Installments />} /> 
          <Route path="/conditions" element={<InstallmentConditions />} />
          <Route path="/payment/:order_id" element={<Payment />} /> 
          <Route path="/notifications" element={<Notifications />} /> 
          <Route path="/services" element={<Services />} /> 
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/login" element={<LoginScreen />} /> 
          <Route path="/register" element={<RegistrationScreen />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
