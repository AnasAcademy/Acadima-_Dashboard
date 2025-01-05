import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
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
import MainPageContainer from './Components/Main/MainPageContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <MainPageContainer>
        <Routes>
          <Route index element={<ProtectedRoute><StudentPlatform /></ProtectedRoute>} /> 
          <Route path="/admission" element={<ProtectedRoute><Admission /></ProtectedRoute>} /> 
          <Route path="/finances/program" element={<ProtectedRoute><Program /></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} /> 
          <Route path="/classes/:id" element={<ProtectedRoute><Classes /></ProtectedRoute>} /> 
          <Route path="/classes/:classId/course/:courseId" element={<ProtectedRoute><Course /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} /> 
          <Route path="/finances/installments" element={<ProtectedRoute><Installments /></ProtectedRoute>} /> 
          <Route path="/conditions" element={<ProtectedRoute><InstallmentConditions /></ProtectedRoute>} />
          <Route path="/payment/:order_id" element={<ProtectedRoute><Payment /></ProtectedRoute>} /> 
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} /> 
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} /> 
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} /> 
          <Route path="/register" element={<PublicRoute><RegistrationScreen /></PublicRoute>} />  
        </Routes>
        </MainPageContainer>
      </div>
    </Router>
  );
}

export default App;
